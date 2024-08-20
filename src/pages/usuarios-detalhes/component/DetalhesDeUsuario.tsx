import { ChangeEvent, SyntheticEvent } from 'react';
import {
    useEffect,
    useState
} from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    Icon,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Snackbar,
    TextField,
    ThemeProvider,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import {
    Form,
    useActionData,
    useFetcher,
    useLoaderData,
    useNavigate,
    useParams
} from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
    IDetalhesDeUsuarios,
    IResponseDetalhesDeUsuarioAction,
    IResponseListagemDeFuncionariosAction
} from '../../../shared/interfaces';
import { LayoutBaseDePagina } from '../../../shared/layouts/LayoutBaseDePagina';
import { FerramentasDeDetalhes } from '../../../shared/components';
import { useAuth } from '../../../shared/contexts';
import { LightInputsTheme } from '../../../shared/themes/LightInputs';
import { DarkInputsTheme } from '../../../shared/themes/DarkInputs';
import { Environment } from '../../../shared/environment';

export const DetalhesDeUsuario = () => {

    // Hooks para navegação, tema, autenticação e parâmetros da URL.
    const navigate = useNavigate();
    const theme = useTheme();
    const { pagina } = useParams<'pagina'>();
    const { id } = useParams<'id'>();
    const { userId } = useAuth();

    // Hooks para manipulação de dados de formulário, imagens, notificações, etc.
    const fetcher = useFetcher();
    const actionData = useActionData() as IResponseDetalhesDeUsuarioAction;
    const loaderData = useLoaderData() as IDetalhesDeUsuarios;

    const initialForm = {
        nome: loaderData?.data?.nome || '',
        sobrenome: loaderData?.data?.sobrenome || '',
        email: loaderData?.data?.email || '',
        bloqueado: loaderData?.data?.bloqueado || 'false',
        senha: ''
    };

    const [originalImage, setOriginalImage] = useState<string | ArrayBuffer | null>(loaderData?.data?.foto?.url || `${Environment.BASE_URL}/profile/profile.jpg`);

    const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(originalImage);

    const [icone, setIcone] = useState<string>('content_copy');

    const [open, setOpen] = useState<boolean>(false);

    const [messageSnackbar, setMessageSnackbar] = useState<string>('');

    const [typeSeverity, setTypeSeverity] = useState<'success' | 'error'>('success');

    const [tipo, setTipo] = useState<'Dialog' | 'Snackbar' | ''>('');

    const [actionDataDeleteFuncionario, setActionDataDeleteFuncionario] = useState<IResponseListagemDeFuncionariosAction>(fetcher.data);

    const [isModified, setIsModified] = useState<boolean>(false);

    const [form, setForm] = useState(initialForm);

    const [formMethod, setFormMethod] = useState<'GET' | 'POST' | 'PATCH' | 'DELETE'>('PATCH');

    // Função para resetar o formulário.
    const resetForm = () => {
        setForm(initialForm);
        setIsModified(false);
        setUploadedImage(originalImage);
        setOriginalImage(loaderData?.data?.foto?.url || `${Environment.BASE_URL}/profile/profile.jpg`);
    };

    // Função para lidar com o fechamento da notificação.
    const handleCloseSnackbar = (_event: SyntheticEvent | Event, reason?: string) => {

        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

        setMessageSnackbar('');

        if (typeSeverity === 'success' && actionDataDeleteFuncionario?.success) {

            navigate(`/blog/usuarios?busca=&pagina=${pagina}`);

        }

        if (typeSeverity === 'success' && actionData?.success && actionData.tipo === 'atributos') {

            setIsModified(false);
        }

        if (typeSeverity === 'success' && actionData?.success && actionData.tipo === 'senha') {
            resetForm();
        }

    };

    // Função para lidar com o fechamento do diálogo de confirmação.
    const handleCloseDialog = () => {

        setOpen(false);

    };

    // Função para manipular a alteração nos campos do formulário.
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        const name = e.target.name as keyof typeof initialForm;

        const value = e.target.value;

        setForm(prevState => ({ ...prevState, [name]: value }));

        if (initialForm[name] !== value) {

            setIsModified(true);

        }
    };

    // Função para lidar com a cópia de senhas.
    const handleCopyPassword = () => {

        setIcone('done');

    };

    // Função para lidar com a mudança na imagem.
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

    // Função para lidar com a mudança no status.
    const handleChangeStatus = (event: SelectChangeEvent) => {

        setForm(prev => ({

            ...prev,

            [event.target.name]: event.target.value

        }));

        setIsModified(true);
    };

    // Efeitos colaterais para lidar com as respostas das ações.
    useEffect(() => {

        setActionDataDeleteFuncionario(fetcher.data);

        if (actionData?.success?.message && actionData?.tipo == 'senha') {
            setMessageSnackbar(actionData.success?.message || '');
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('success');
        }

        if (actionData?.errors?.default && actionData?.tipo == 'senha') {
            setMessageSnackbar(actionData?.errors?.default || '');
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('error');
        }

        if (actionData?.success?.message && actionData.tipo == 'foto') {
            setUploadedImage(loaderData?.data?.foto?.url);
            setOriginalImage(loaderData?.data?.foto?.url);
            setMessageSnackbar(actionData?.success?.message);
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('success');
        }

        if (actionData?.errors?.default && actionData.tipo == 'foto') {
            setUploadedImage(loaderData?.data?.foto?.url);
            setOriginalImage(loaderData?.data?.foto?.url);
            setMessageSnackbar(actionData?.errors.default);
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('error');
        }

        if (actionData?.success?.message && actionData.tipo == 'atributos') {
            setUploadedImage(loaderData?.data?.foto?.url);
            setOriginalImage(loaderData?.data?.foto?.url);
            setMessageSnackbar(actionData.success.message);
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('success');
        }

        if (actionData?.errors?.default && actionData.tipo == 'atributos') {
            setMessageSnackbar(actionData.errors.default);
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('error');
        }

        if (actionDataDeleteFuncionario?.errors?.default) {
            setMessageSnackbar(actionDataDeleteFuncionario?.errors?.default);
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('error');
        }

        if (actionDataDeleteFuncionario?.success?.message) {
            setMessageSnackbar(actionDataDeleteFuncionario?.success?.message);
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('success');
        }

    }, [actionData, actionDataDeleteFuncionario, fetcher, loaderData]);

    return (
        <LayoutBaseDePagina
            titulo={`${form.nome} ${form.sobrenome}`}
            barraDeFerramentas={<FerramentasDeDetalhes
                mostrarBotaoApagar={userId == id ? false : true}
                mostrarBotaoNovo={false}
                aoClicarEmVoltar={() => navigate(`/blog/usuarios?busca=&pagina=${pagina}`)}
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
                    Deletar Usuário
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" align="center">
                        Deseja Realmente apagar este Usuário?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <fetcher.Form method="DELETE" action="/blog/usuarios" onSubmit={handleCloseDialog}>

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

            <Box display='flex' flexDirection={'column'} width='100%' height='100%'>

                <Form replace method={formMethod} encType='multipart/form-data'>

                    <input id='id' type="hidden" name="id" value={id} />
                    <input type="hidden" name="nome" value={form.nome} />
                    <input type="hidden" name="sobrenome" value={form.sobrenome} />
                    <input type="hidden" name="email" value={form.email} />

                    <Box display="flex" width='auto' height='auto' flexDirection="column" justifyContent="center" marginLeft={1} marginRight={1} marginBottom={1} component={Paper} elevation={3}  >

                        <Box width='100%' height='100%' display="flex" flexDirection="row" gap={2} padding={3}>
                            <Box width='30%' display='flex' flexDirection="column" justifyContent='center' alignItems='center' gap={2}>

                                <Typography variant='h5'>
                                    Foto do Usuário
                                </Typography>
                                <Avatar
                                    src={uploadedImage as string}
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

                                <Button
                                    type='submit'
                                    variant="outlined"
                                    color="error"
                                    onClick={() => setFormMethod('DELETE')}
                                    startIcon={<Icon>delete</Icon>}
                                >
                                    Remover Foto
                                </Button>


                            </Box>

                            <Box width='70%' display='flex' flexDirection="column" justifyContent='center' alignItems='center' gap={2}>

                                <Grid item>
                                    <Typography variant="h6">Dados do Usuário</Typography>
                                </Grid>

                                <Grid container spacing={3} justifyContent='center' >
                                    <ThemeProvider theme={theme.palette.mode == 'light' ? LightInputsTheme : DarkInputsTheme}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                error={!!actionData?.errors?.body?.nome}
                                                helperText={!!actionData?.errors?.body?.nome && ('Nome: ' + actionData?.errors?.body.nome)}
                                                color={!!actionData?.errors?.body?.nome === false ? ('primary') : 'error'}
                                                focused={!!actionData?.errors?.body?.nome === false}
                                                fullWidth
                                                disabled={form.senha != '' ? true : false}
                                                name='nome'
                                                variant="outlined"
                                                label="Nome"
                                                value={form.nome}
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
                                                disabled={form.senha != '' ? true : false}
                                                name='sobrenome'
                                                variant="outlined"
                                                label="Sobrenome"
                                                value={form.sobrenome}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                error={!!actionData?.errors?.body?.email}
                                                helperText={!!actionData?.errors?.body?.email && ('E-mail: ' + actionData?.errors?.body.email)}
                                                color={!!actionData?.errors?.body?.email === false ? ('primary') : 'error'}
                                                focused={!!actionData?.errors?.body?.email === false}
                                                fullWidth
                                                disabled={form.senha != '' ? true : false}
                                                name='email'
                                                variant="outlined"
                                                label="E-mail"
                                                value={form.email}
                                                onChange={handleInputChange}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <CopyToClipboard text={form.email} onCopy={handleCopyPassword}>
                                                                <IconButton size='small' color='primary'>
                                                                    <Tooltip title={icone === 'done' ? 'E-mail Copiado' : 'Copiar E-mail'}>
                                                                        <Icon color='primary'>
                                                                            {icone}
                                                                        </Icon>
                                                                    </Tooltip>
                                                                </IconButton>
                                                            </CopyToClipboard>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <FormControl
                                                fullWidth
                                                disabled={form.senha != '' ? true : userId == id ? true : false}
                                                focused={!!actionData?.errors?.body?.bloqueado === false}
                                                error={!!actionData?.errors?.body?.bloqueado}
                                                color={!!actionData?.errors?.body?.bloqueado === false ? ('primary') : 'error'}>
                                                <InputLabel >
                                                    Status
                                                </InputLabel>
                                                <Select
                                                    value={form.bloqueado}
                                                    label="Status"
                                                    onChange={handleChangeStatus}
                                                    name="bloqueado"
                                                >
                                                    <MenuItem value={'false'}>Desbloqueado</MenuItem>
                                                    <MenuItem value={'true'}>Bloqueado</MenuItem>
                                                </Select>
                                                {!!actionData?.errors?.body?.bloqueado && (
                                                    <FormHelperText >{actionData?.errors?.body?.bloqueado}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </ThemeProvider>
                                    {form.bloqueado == 'false' && userId != id && (
                                        <>
                                            <Grid item>
                                                <Typography variant="h6">Alterar Senha</Typography>
                                            </Grid>
                                            <ThemeProvider theme={theme.palette.mode == 'light' ? LightInputsTheme : DarkInputsTheme}>
                                                <Grid container item justifyContent='center'>
                                                    <Grid item xs={12} sm={12}>
                                                        <TextField
                                                            error={!!actionData?.errors?.body?.senha}
                                                            helperText={!!actionData?.errors?.body?.senha && ('Senha: ' + actionData?.errors?.body.senha)}
                                                            color={!!actionData?.errors?.body?.senha === false ? ('primary') : 'error'}
                                                            focused={!!actionData?.errors?.body?.senha === false}
                                                            disabled={form.nome != initialForm.nome ? true : form.email != initialForm.email ? true : form.sobrenome != initialForm.sobrenome ? true : uploadedImage != originalImage ? true : false}
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
                                            </ThemeProvider>
                                        </>
                                    )}


                                </Grid>

                                {isModified && (
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


                                        <IconButton aria-label="refresh" color="primary" onClick={resetForm}>
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

