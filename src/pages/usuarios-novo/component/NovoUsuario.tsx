import {
  useEffect,
  useState
} from 'react';
import {
  Form,
  useActionData,
  useNavigate
} from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  Icon,
  Paper,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
  useTheme
} from '@mui/material';

import {
  IResponseNovoUsuarioAction,
  IUsuarioNovo
} from '../../../shared/interfaces';
import { FerramentasDeDetalhes } from '../../../shared/components';
import { LayoutBaseDePagina } from '../../../shared/layouts/LayoutBaseDePagina';
import { LightInputsTheme } from '../../../shared/themes/LightInputs';
import { DarkInputsTheme } from '../../../shared/themes/DarkInputs';
import { Environment } from '../../../shared/environment';

export const NovoUsuario = () => {

  // Hook de navegação do React Router
  const navigate = useNavigate();

  // Hook para obter o tema atual do Material-UI
  const theme = useTheme();

  // Hook para obter dados de ação
  const actionData = useActionData() as IResponseNovoUsuarioAction;

  // Estados locais para controlar o estado do Snackbar
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(null);

  // Estado local para o formulário do novo usuário
  const [form, setForm] = useState<IUsuarioNovo>({
    nome: '',
    sobrenome: '',
    email: '',
    senha: ''
  });

  // Função para remover a imagem
  const handleRemoveImage = () => {
    setUploadedImage(null);
    // Resetando o valor do input para garantir que o evento onChange seja acionado novamente
    if (document.getElementById('upload-photo')) {
      (document.getElementById('upload-photo') as HTMLInputElement).value = '';
    }
  };

  // Função para fechar o Snackbar
  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setMessage('');

    if (severity == 'success') {
      navigate('/organograma/usuarios');
    }

  };

  // Manipulador de evento para a mudança de entrada no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  // Manipulador de evento para a mudança de imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Efeito colateral para lidar com os dados de ação
  useEffect(() => {

    if (actionData?.errors?.default) {
      setSeverity('error');
      setMessage(actionData?.errors?.default);
      setOpen(true);

    }

    if (actionData?.success?.message) {
      setSeverity('success');
      setMessage(actionData?.success?.message);
      setOpen(true);
    }

  }, [actionData]);

  return (
    <LayoutBaseDePagina
      titulo='Crie um novo Usuário'
      barraDeFerramentas={<FerramentasDeDetalhes
        mostrarBotaoApagar={false}
        mostrarBotaoNovo={false}
        salvar={
          <Form method="POST" replace encType='multipart/form-data'>

            <input id='nome' type="hidden" name="nome" value={form.nome} />
            <input id='sobrenome' type="hidden" name="sobrenome" value={form.sobrenome} />
            <input id='email' type="hidden" name="email" value={form.email} />
            <input id='senha' type="hidden" name="senha" value={form.senha} />
            <input
              style={{ display: 'none' }}
              id="upload-photo"
              name="foto"
              type="file"
              onChange={handleImageChange}
              accept="image/*" // Aceita apenas imagens
            />

            <Button
              variant='contained'
              color='primary'
              disableElevation
              type='submit'
              startIcon={<Icon>save</Icon>}
            >

              <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                Salvar
              </Typography>

            </Button>
          </Form>

        }
        aoClicarEmVoltar={() => navigate('/organograma/usuarios')}
      />}
    >
      <Box display="flex" width='auto' height='auto' flexDirection="column" justifyContent="center" margin={1} component={Paper} elevation={3} >

        <Box width='100%' height='100%' display="flex" flexDirection="row" gap={2} padding={3}>

          <Box width='30%' display='flex' flexDirection="column" justifyContent='center' alignItems='center' gap={2}>

            <Typography variant='h5'>
              Foto do Usuário
            </Typography>
            <Avatar
              src={uploadedImage as string || `${Environment.BASE_URL}/profile/profile.jpg`}
              alt="Foto do funcionário"
              style={{ width: '65%', height: 'auto', border: `2px solid ${theme.palette.primary.main}` }}
            />

            <input
              style={{ display: 'none' }}
              id="upload-photo"
              type="file"
              name='foto'
              onChange={handleImageChange}
              accept="image/*" // Aceita apenas imagens
            />
            <label htmlFor="upload-photo">
              <Button variant="contained" component="span" startIcon={<Icon>file_upload</Icon>}>
                Carregar Foto
              </Button>
            </label>
            {uploadedImage && (
              <Button variant="outlined" color="error" onClick={handleRemoveImage} startIcon={<Icon>delete</Icon>}>
                Remover Foto
              </Button>
            )}
          </Box>

          <Box width='70%' display='flex' flexDirection="column" justifyContent='center' alignItems='center' gap={2}>

            <ThemeProvider theme={theme.palette.mode == 'light' ? LightInputsTheme : DarkInputsTheme}>
              <Grid container spacing={3} justifyContent='center' alignItems='center'>
                <Grid item xs={12} sm={6} >
                  <TextField
                    error={!!actionData?.errors?.body?.nome}
                    helperText={!!actionData?.errors?.body?.nome && ('Nome: ' + actionData?.errors?.body.nome)}
                    color={!!actionData?.errors?.body?.nome === false ? ('primary') : 'error'}
                    focused={!!actionData?.errors?.body?.nome === false}
                    fullWidth
                    name='nome'
                    variant="outlined"
                    label="Nome"
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    error={!!actionData?.errors?.body?.sobrenome}
                    helperText={!!actionData?.errors?.body?.sobrenome && ('Sobrenome: ' + actionData?.errors?.body.sobrenome)}
                    color={!!actionData?.errors?.body?.sobrenome === false ? ('primary') : 'error'}
                    focused={!!actionData?.errors?.body?.sobrenome === false}
                    fullWidth
                    name='sobrenome'
                    variant="outlined"
                    label="Sobrenome"
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    error={!!actionData?.errors?.body?.email}
                    helperText={!!actionData?.errors?.body?.email && ('E-mail: ' + actionData?.errors?.body.email)}
                    color={!!actionData?.errors?.body?.email === false ? ('primary') : 'error'}
                    focused={!!actionData?.errors?.body?.email === false}
                    fullWidth
                    name='email'
                    variant="outlined"
                    label="E-mail"
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid container item justifyContent='center'>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      error={!!actionData?.errors?.body?.senha}
                      helperText={!!actionData?.errors?.body?.senha && ('Senha: ' + actionData?.errors?.body.senha)}
                      color={!!actionData?.errors?.body?.senha === false ? ('primary') : 'error'}
                      focused={!!actionData?.errors?.body?.senha === false}
                      fullWidth
                      type='password'
                      name='senha'
                      variant="outlined"
                      label="Nova senha"
                      value={form.senha}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>

              </Grid>
            </ThemeProvider>
          </Box>

        </Box>

        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>

      </Box>

    </LayoutBaseDePagina>
  );
};
