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
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import {
    Form,
    Outlet,
    useActionData,
    useFetcher,
    useLoaderData,
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
    CropperModal,
    FerramentasDeDetalhes,
} from '../../../shared/components';
import { useAuth } from '../../../shared/contexts';
import { Environment } from '../../../shared/environment';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { format } from 'date-fns';
import { IDetalhesDeUsuarioAction, IDetalhesDeUsuarioLoader, IFormUsuario } from '../interfaces/interfaces';


export const DetalhesDeUsuario = () => {

    const actionData = useActionData() as IDetalhesDeUsuarioAction;
    const loaderData = useLoaderData() as IDetalhesDeUsuarioLoader;

    const fetcher = useFetcher();
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const { userId, regras, permissoes } = useAuth();

    const { pagina } = useParams<'pagina'>();
    const { id } = useParams<'id'>();

    const initialForm: IFormUsuario = {
        nome: loaderData?.usuario?.nome || '',
        sobrenome: loaderData?.usuario?.sobrenome || '',
        email: loaderData?.usuario?.email || '',
        bloqueado: loaderData?.usuario?.bloqueado == true ? 'true' : 'false' || 'false',
        senha: '',
        usuario_atualizador: loaderData?.usuario?.usuario_atualizador || '',
        usuario_cadastrador: loaderData?.usuario?.usuario_cadastrador || '',
        ultimo_login: loaderData?.usuario?.ultimo_login || '',
        data_atualizacao: loaderData?.usuario?.data_atualizacao || '',
        data_criacao: loaderData?.usuario?.data_criacao || '',
    };

    const [originalImage, setOriginalImage] = useState<string | ArrayBuffer | null>(loaderData?.usuario?.foto?.url || `${Environment.BASE_URL}/profile/profile.jpg`);
    const [statePhoto, setStatePhoto] = useState<'original' | 'edição' | 'preview'>('original');
    const [filename, setFilename] = useState<string>('');
    const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | Blob | null>(originalImage);
    const [icone, setIcone] = useState<string>('content_copy');
    const [open, setOpen] = useState<boolean>(false);
    const [messageSnackbar, setMessageSnackbar] = useState<string>('');
    const [typeSeverity, setTypeSeverity] = useState<'success' | 'error'>('success');
    const [tipo, setTipo] = useState<'Dialog' | 'Snackbar' | ''>('');
    const [actionDataDeleteUsuario, setActionDataDeleteUsuario] = useState<IDetalhesDeUsuarioAction>(fetcher.data);
    const [isModified, setIsModified] = useState<boolean>(false);
    const [form, setForm] = useState<IFormUsuario>(initialForm);
    const [formMethod, setFormMethod] = useState<'GET' | 'POST' | 'PATCH' | 'DELETE'>('PATCH');

    const reader = new FileReader();

    const HandleResetForm = () => {
        setStatePhoto('original');
        setForm(initialForm);
        setIsModified(false);
        setUploadedImage(originalImage);
        setOriginalImage(loaderData?.usuario?.foto?.url || `${Environment.BASE_URL}/profile/profile.jpg`);
    };

    // Função para lidar com o fechamento da notificação.
    const handleCloseSnackbar = (_event: SyntheticEvent | Event, reason?: string) => {

        if (reason === 'clickaway') {
            return;
        }

        setStatePhoto('original');
        setOpen(false);
        setMessageSnackbar('');

        setForm(prevState => ({
            ...prevState,
        }));

        if (typeSeverity === 'success' && actionDataDeleteUsuario?.success) {

            navigate(`/usuarios?busca=&pagina=${pagina}`);

        }

        if (typeSeverity === 'success' && actionData?.success && actionData.tipo === 'atributos') {

            setIsModified(false);
        }

        if (typeSeverity === 'success' && actionData?.success && actionData.tipo === 'senha') {
            HandleResetForm();
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

    // Função para lidar com a cópia de senhas.
    const handleCopyPassword = () => {

        setIcone('done');

    };

    const handleSaveEditedImage = (blob: Blob, state?: 'original' | 'edição' | 'preview') => {

        reader.onloadend = () => {

            setUploadedImage(blob);

            // Criando uma FileList simulando a seleção de arquivos pelo usuário
            const editedFile = new File([blob], filename || 'edited_photo.jpg', { type: blob.type });
            const fileList = new DataTransfer();
            fileList.items.add(editedFile);

            // Setando o valor do input para a FileList criada
            const uploadedPhotoInput = document.getElementById('upload-photo') as HTMLInputElement;
            uploadedPhotoInput.files = fileList.files;

            if (state) {
                setStatePhoto(state);
                setIsModified(true);
            }
        };
        reader.readAsDataURL(blob);
    };

    // Função para remover a imagem
    const handleRemoveImage = () => {

        setIsModified(false);
        // Resetando o valor do input para garantir que o evento onChange seja acionado novamente
        if (document.getElementById('upload-photo')) {
            (document.getElementById('upload-photo') as HTMLInputElement).value = '';
            setUploadedImage(originalImage || `${Environment.BASE_URL}/profile/profile.jpg`);
        }
        setStatePhoto('original');

    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {

            reader.onloadend = () => {
                setUploadedImage(reader.result);
                setStatePhoto('edição');
                setFilename(file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDisabledPassWord = () => {

        if (form.nome != initialForm.nome || form.email != initialForm.email || form.sobrenome != initialForm.sobrenome || uploadedImage != originalImage || Environment.validaRegraPermissaoComponents(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_USUARIO])) {
            return true;
        }

        return false;

    };

    const handleDeleteModalUsuario = () => {
        setTipo('Dialog');
        setOpen(true);
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

        if (fetcher?.data) {
            setActionDataDeleteUsuario(fetcher.data);
        }

        if (actionData?.success?.message && actionData?.tipo == 'senha') {
            setMessageSnackbar(actionData.success.message || '');
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('success');
        }

        if (actionData?.errors?.default && actionData?.tipo == 'senha') {
            setMessageSnackbar(actionData.errors.default || '');
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('error');
        }

        if (actionData?.success?.message && actionData?.tipo == 'foto') {
            setUploadedImage(loaderData?.usuario?.foto?.url);
            setOriginalImage(loaderData?.usuario?.foto?.url);
            setMessageSnackbar(actionData.success.message || '');
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('success');
        }

        if (actionData?.errors?.default && actionData?.tipo == 'foto') {
            setUploadedImage(loaderData?.usuario?.foto.url);
            setOriginalImage(loaderData?.usuario?.foto?.url);
            setMessageSnackbar(actionData.errors.default);
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('error');
        }

        if (actionData?.success?.message && actionData?.tipo == 'atributos') {
            setUploadedImage(loaderData?.usuario?.foto?.url);
            setOriginalImage(loaderData?.usuario?.foto?.url);
            setMessageSnackbar(actionData.success.message);
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('success');
        }

        if (actionData?.errors?.default && actionData?.tipo == 'atributos') {
            setMessageSnackbar(actionData.errors.default);
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('error');
        }

        if (actionDataDeleteUsuario?.errors?.default) {
            setMessageSnackbar(actionDataDeleteUsuario?.errors?.default);
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('error');
        }

        if (actionDataDeleteUsuario?.success?.message) {
            setMessageSnackbar(actionDataDeleteUsuario?.success?.message);
            setOpen(true);
            setTipo('Snackbar');
            setTypeSeverity('success');
        }

    }, [actionData, actionDataDeleteUsuario, fetcher, loaderData]);

    if (location.pathname == String(`/blog/usuarios/detalhes/${pagina}/${id}/regras/permissoes`)) {

        return <Outlet />;

    }

    return (
        < LayoutBaseDePagina
            titulo={`${form.nome} ${form.sobrenome}`}
            barraDeFerramentas={< FerramentasDeDetalhes
                mostrarBotaoApagar={true}
                mostrarBotaoNovo={false}
                aoClicarEmVoltar={() => navigate(`/blog/usuarios?busca=&pagina=${pagina}`)}
                aoClicarEmApagar={handleDeleteModalUsuario}
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
                    <fetcher.Form method="DELETE" action="/usuarios" onSubmit={handleCloseDialog}>

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

                    <Box display="flex" width='auto' height='auto' flexDirection="column" justifyContent="center" marginLeft={1} marginRight={1} marginBottom={1} component={Paper} elevation={3}  >

                        <Box width='100%' height='100%' display="flex" flexDirection="row" gap={2} padding={3}>
                            <Box width='30%' display='flex' flexDirection="column" justifyContent='center' alignItems='center' gap={2}>
                                
                                {Environment.validaRegraPermissaoComponents(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_USUARIO]) && (
                                    <Box width='100%' marginBottom={1} display='flex' justifyContent='center' alignItems='center' gap={1}>
                                        <Typography variant='h6'>modo de edição está bloqueado

                                        </Typography>
                                        <Icon color='primary'>lock</Icon>
                                    </Box>
                                )}

                                <Typography variant='h5'>
                                    Foto do Usuário
                                </Typography>

                                {(statePhoto == 'original' || statePhoto == 'preview') ? (
                                    <>
                                        <Avatar
                                            src={typeof uploadedImage == 'string' ? uploadedImage : URL.createObjectURL(uploadedImage as Blob)}
                                            alt="Foto do usuário"
                                            style={{ width: '65%', height: 'auto', border: `2px solid ${theme.palette.primary.main}` }}
                                        />

                                        <label htmlFor="upload-photo">
                                            <Button
                                                disabled={
                                                    Environment.validaRegraPermissaoComponents(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_USUARIO]) || form.bloqueado == 'true'
                                                }
                                                variant="contained"
                                                startIcon={<Icon>file_upload</Icon>}
                                                component="span">
                                                Carregar Foto
                                            </Button>
                                        </label>

                                        {statePhoto != 'original' ? (
                                            <Button variant="outlined" color="error" onClick={(e) => { e?.preventDefault(); handleRemoveImage(); }}>
                                                Cancelar alteração
                                            </Button>
                                        ) : (
                                            <Button
                                                type='submit'
                                                disabled={
                                                    Environment.validaRegraPermissaoComponents(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_USUARIO]) || form.bloqueado == 'true'
                                                }
                                                variant="outlined"
                                                color="error"
                                                startIcon={<Icon>delete</Icon>}
                                                onClick={() => setFormMethod('DELETE')}
                                            >
                                                Remover Foto
                                            </Button>
                                        )}

                                    </>) : (
                                    <CropperModal
                                        src={uploadedImage as string}
                                        setPreview={setUploadedImage}
                                        cancelPhoto={handleRemoveImage}
                                        onSave={handleSaveEditedImage}
                                    />)}

                            </Box>

                            <Box width='70%' display='flex' flexDirection="column" justifyContent='center' alignItems='center' gap={2}>

                                <Grid container spacing={3} justifyContent='center' >
                                    <Grid item xs={12} sm={4}>
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
                                            onChange={
                                                Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_USUARIO]) ?
                                                    handleInputChange : undefined
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
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
                                            onChange={
                                                Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_USUARIO]) ?
                                                    handleInputChange : undefined
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
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
                                            onChange={
                                                Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_USUARIO]) ?
                                                    handleInputChange : undefined
                                            }
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

                                    <Grid item xs={12} sm={4}>
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
                                                value={String(form.bloqueado)}
                                                label="Status"
                                                onChange={
                                                    Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_USUARIO]) ?
                                                        handleChangeStatus : undefined
                                                }
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

                                    <Grid item xs={12} sm={4}>
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

                                    <Grid item xs={12} sm={4}>
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

                                    <Grid item xs={12} sm={6}>
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

                                    <Grid item xs={12} sm={6}>
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

                                    {form.bloqueado == 'false' && userId != id && (
                                        <>
                                            <Grid item>
                                                <Typography variant="h6">Nova Senha</Typography>
                                            </Grid>

                                            <Grid container item justifyContent='center'>
                                                <Grid item xs={12} sm={12}>
                                                    <TextField
                                                        error={!!actionData?.errors?.body?.senha}
                                                        helperText={!!actionData?.errors?.body?.senha && ('Senha: ' + actionData?.errors?.body.senha)}
                                                        color={!!actionData?.errors?.body?.senha === false ? ('primary') : 'error'}
                                                        focused={!!actionData?.errors?.body?.senha === false}
                                                        disabled={handleDisabledPassWord()}
                                                        fullWidth
                                                        type='password'
                                                        name='senha'
                                                        variant="outlined"
                                                        label="Nova senha"
                                                        value={form.senha}
                                                        onChange={
                                                            Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_USUARIO]) ?
                                                                handleInputChange : undefined
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>

                                        </>
                                    )}

                                </Grid>

                                <input id='nome' type="hidden" name="nome" value={form.nome} />
                                <input id='sobrenome' type="hidden" name="sobrenome" value={form.sobrenome} />
                                <input id='email' type="hidden" name="email" value={form.email} />
                                <input
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    type="file"
                                    name='foto'
                                    onChange={handleImageChange}
                                    accept="image/*" // Aceita apenas imagens
                                />

                                {isModified && Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_USUARIO]) && (
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

