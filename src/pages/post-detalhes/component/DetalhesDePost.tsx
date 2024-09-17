
import { Form, useActionData, useFetcher, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { IDetalhesDePostAction, IDetalhesDePostLoader, IFormPost } from "../interfaces/interfaces";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, Icon, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import { Environment } from "../../../shared/environment";
import { useAuth } from "../../../shared/contexts";
import { format } from "date-fns";
import { FerramentasDeDetalhes } from "../../../shared/components";

export const DetalhesDePost = () => {

  const actionData = useActionData() as IDetalhesDePostAction;
  const loaderData = useLoaderData() as IDetalhesDePostLoader;
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const { pagina } = useParams<'pagina'>();
  const { regras, permissoes } = useAuth();

  const initialForm: IFormPost = {
    conteudo: loaderData?.post?.conteudo || '',
    titulo: loaderData?.post?.titulo || '',
    data_atualizacao: loaderData?.post?.data_atualizacao || new Date(),
    data_criacao: loaderData?.post?.data_criacao || new Date(),
    usuario_atualizador: loaderData?.post?.usuario_atualizador || '',
    usuario_cadastrador: loaderData?.post?.usuario_cadastrador || '',
    visivel: loaderData?.post?.visivel || false
  };

  const [originalImage, setOriginalImage] = useState<string | ArrayBuffer | null>(loaderData?.post?.foto?.url || `${Environment.BASE_URL}/profile/profile.jpg`);
  const [open, setOpen] = useState<boolean>(false);
  const [messageSnackbar, setMessageSnackbar] = useState<string>('');
  const [typeSeverity, setTypeSeverity] = useState<'success' | 'error'>('success');
  const [tipo, setTipo] = useState<'Dialog' | 'Snackbar' | ''>('');
  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(originalImage);
  const [formMethod, setFormMethod] = useState<'GET' | 'POST' | 'PATCH' | 'DELETE'>('PATCH');
  const [isModified, setIsModified] = useState<boolean>(false);
  const [form, setForm] = useState<IFormPost>(initialForm);
  const [actionDataDeletePost, setActionDataDeletePost] = useState<IDetalhesDePostAction>();

  const HandleResetForm = () => {
    setForm(initialForm);
    setIsModified(false);
    setUploadedImage(originalImage);
    setOriginalImage(loaderData?.post.foto?.url || `${Environment.BASE_URL}/profile/profile.jpg`);
  };

  const handleCloseSnackbar = (_event: SyntheticEvent | Event, reason?: string) => {

    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setMessageSnackbar('');

    if (typeSeverity === 'success' && actionData?.success) {

      setIsModified(false);
    }

    if (typeSeverity === 'success' && actionDataDeletePost?.success) {
      navigate(`/blog/posts?busca=&pagina=${pagina}`);
    }

  };

  const handleCloseDialog = () => {

    setOpen(false);

  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    const name = e.target.name as keyof typeof initialForm;

    const value = e.target.value;

    setForm(prevState => ({ ...prevState, [name]: value }));

    if (initialForm[name] !== value) {

      setIsModified(true);

    }
  };

  // Função para lidar com a mudança no status.
  const handleChangeVisibility = (event: SelectChangeEvent) => {


    setForm(prev => ({

      ...prev,

      [event.target.name]: event.target.value

    }));

    setIsModified(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setIsModified(true); // Adicione esta linha
  };

  useEffect(() => {

    if (fetcher?.data) {
      setActionDataDeletePost(fetcher.data);
    }

    if (actionData?.success?.message) {
      setUploadedImage(loaderData?.post?.foto?.url);
      setOriginalImage(loaderData?.post?.foto?.url);
      setMessageSnackbar(actionData.success.message);
      setOpen(true);
      setTipo('Snackbar');
      setTypeSeverity('success');
    }

    if (actionData?.errors?.default) {
      setMessageSnackbar(actionData.errors.default);
      setOpen(true);
      setTipo('Snackbar');
      setTypeSeverity('error');
    }

    if (actionDataDeletePost?.errors?.default) {
      setMessageSnackbar(actionDataDeletePost.errors.default);
      setOpen(true);
      setTipo('Snackbar');
      setTypeSeverity('error');
    }

    if (actionDataDeletePost?.success?.message) {
      setMessageSnackbar(actionDataDeletePost?.success.message);
      setOpen(true);
      setTipo('Snackbar');
      setTypeSeverity('success');
    }

  }, [actionData, actionDataDeletePost, fetcher, loaderData]);

  return (

    < LayoutBaseDePagina
      titulo={`${form.titulo}`}
      barraDeFerramentas={
        < FerramentasDeDetalhes
          mostrarBotaoApagar={true}
          mostrarBotaoNovo={false}
          aoClicarEmVoltar={() => navigate(`/blog/posts?busca=&pagina=${pagina}`)}
          aoClicarEmApagar={() => { setTipo('Dialog'); setOpen(true); }}
        />}
    >

      <Dialog
        open={open && tipo == 'Dialog' ? true : false}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        hidden={!open || tipo !== 'Dialog'}
      >
        <DialogTitle id="alert-dialog-title" align="center">
          Deletar Post
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            Deseja Realmente apagar esta Postagem?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <fetcher.Form method="DELETE" action="/blog/posts" onSubmit={handleCloseDialog}>

            <input type="hidden" name="id" value={id} />

            <Button
              variant='text'
              color='primary'
              disableElevation
              type='submit'
            >
              <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                Apagar
              </Typography>

            </Button>
          </fetcher.Form>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={open && tipo == 'Snackbar' ? true : false}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={typeSeverity} sx={{ width: '100%' }}>
          {messageSnackbar}
        </Alert>
      </Snackbar>

      <Box width='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>

        <Form replace method={formMethod} encType='multipart/form-data'>

          <Box display="flex" width='auto' height='auto' flexDirection="column" justifyContent="center" marginLeft={1} marginRight={1} marginBottom={1} component={Paper} elevation={3}  >

            <Box width='100%' height='100%' display="flex" flexDirection="column" gap={2} padding={1}>

              <Box width='100%' display='flex' flexDirection="column" justifyContent='center' alignItems='center' gap={2}>


                <img src={uploadedImage as string} width={'50%'} height='auto' alt="foto post" />

                <input
                  style={{ display: 'none' }}
                  id="upload-photo"
                  type="file"
                  name='foto'
                  onChange={handleImageChange}
                  accept="image/*" // Aceita apenas imagens
                />

                <Box width='100%' display='flex' flexDirection='row' justifyContent='center' alignItems='center' gap={2}>
                  <label htmlFor="upload-photo">
                    <Button
                      disabled={
                        Environment.validaRegraPermissaoComponents(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_PROFESSOR], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_POSTAGEM])
                      }
                      variant="contained"
                      startIcon={<Icon>file_upload</Icon>}
                      component="span">
                      Carregar Capa
                    </Button>
                  </label>

                  <Button
                    type='submit'
                    disabled={
                      Environment.validaRegraPermissaoComponents(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_PROFESSOR], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_POSTAGEM])
                    }
                    variant="outlined"
                    color="error"
                    startIcon={<Icon>delete</Icon>}
                    onClick={() => setFormMethod('DELETE')}
                  >
                    Remover Foto
                  </Button>
                </Box>

                <Grid container spacing={3} justifyContent='center' >
                  <Grid item xs={12}>
                    <TextField
                      error={!!actionData?.errors?.body?.titulo}
                      helperText={!!actionData?.errors?.body?.titulo && ('Titulo: ' + actionData?.errors?.body.titulo)}
                      color={!!actionData?.errors?.body?.titulo === false ? ('primary') : 'error'}
                      focused={!!actionData?.errors?.body?.titulo === false}
                      fullWidth
                      name='titulo'
                      variant="outlined"
                      label="Titulo"
                      value={form.titulo}
                      onChange={
                        Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_PROFESSOR], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_POSTAGEM]) ?
                          handleInputChange : undefined
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      error={!!actionData?.errors?.body?.conteudo}
                      helperText={!!actionData?.errors?.body?.conteudo && ('conteudo: ' + actionData?.errors?.body.conteudo)}
                      color={!!actionData?.errors?.body?.conteudo === false ? ('primary') : 'error'}
                      focused={!!actionData?.errors?.body?.conteudo === false}
                      fullWidth
                      name='conteudo'
                      variant="outlined"
                      label="conteudo"
                      multiline
                      maxRows={5}
                      value={form.conteudo}
                      onChange={
                        Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_PROFESSOR], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_POSTAGEM]) ?
                          handleInputChange : undefined
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      focused={!!actionData?.errors?.body?.visivel === false}
                      error={!!actionData?.errors?.body?.visivel}
                      color={!!actionData?.errors?.body?.visivel === false ? ('primary') : 'error'}>
                      <InputLabel >
                        Status
                      </InputLabel>
                      <Select
                        value={String(form.visivel)}
                        label="Status"
                        onChange={
                          Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_PROFESSOR], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_POSTAGEM]) ?
                            handleChangeVisibility : undefined
                        }
                        name="visivel"
                      >
                        <MenuItem value={'true'}>Visivel</MenuItem>
                        <MenuItem value={'false'}>não visivel</MenuItem>
                      </Select>
                      {!!actionData?.errors?.body?.visivel && (
                        <FormHelperText >{actionData?.errors?.body?.visivel}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      color={'primary'}
                      focused={true}
                      fullWidth
                      disabled
                      name='usuario_cadastrador'
                      variant="outlined"
                      label="Cadastrado por"
                      value={form.usuario_cadastrador}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      color={'primary'}
                      focused={true}
                      fullWidth
                      disabled
                      name='usuario_atualizador'
                      variant="outlined"
                      label="Atualizado por"
                      value={form.usuario_atualizador}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      color={'primary'}
                      focused={true}
                      fullWidth
                      disabled
                      name='data_criacao'
                      variant="outlined"
                      label="Data de Criação"
                      value={format(new Date(form.data_criacao), 'yyyy-MM-dd')}
                      type='date'
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      color={'primary'}
                      focused={true}
                      fullWidth
                      disabled
                      name='data_atualizacao'
                      variant="outlined"
                      label="Data de Atualização"
                      value={format(new Date(form.data_atualizacao), 'yyyy-MM-dd')}
                      type='date'
                    />
                  </Grid>


                </Grid>

                <input id='titulo' type="hidden" name="titulo" value={form.titulo} />
                <input id='conteudo' type="hidden" name="conteudo" value={form.conteudo} />
                <input
                  style={{ display: 'none' }}
                  id="upload-photo"
                  type="file"
                  name='foto'
                  onChange={handleImageChange}
                  accept="image/*" // Aceita apenas imagens
                />

                {isModified && Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_PROFESSOR], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_POSTAGEM]) && (
                  <Box width='100%' display='flex' justifyContent='center' alignItems='center' gap={2}>
                    <Button
                      variant='contained'
                      color='primary'
                      disableElevation
                      type='submit'
                      startIcon={<Icon>save</Icon>}
                      onClick={() => setFormMethod('PATCH')}
                    >
                      <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        Salvar alteração
                      </Typography>
                    </Button>


                    <IconButton aria-label="refresh" color="primary" onClick={HandleResetForm}>
                      <Icon>
                        refresh
                      </Icon>
                    </IconButton>
                  </Box>
                )}

              </Box>
            </Box>
          </Box>
        </Form>

      </Box >

    </LayoutBaseDePagina >

  );
};
