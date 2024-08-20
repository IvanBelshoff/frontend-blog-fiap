import {
    useEffect,
    useState
} from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    Icon,
    IconButton,
    InputAdornment,
    Modal,
    Paper,
    Snackbar,
    TextField,
    ThemeProvider,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import {
    useFetcher,
    useRouteLoaderData
} from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
    IDetalhesDeUsuarios,
    IModalUsuarioProps,
    IResponseModalUsuarioAction,
    IUsuarioModal
} from '../../../interfaces';
import { useAuth } from '../../../contexts';
import { Environment } from '../../../environment';

export const ModalUsuario: React.FC<IModalUsuarioProps> = ({ openModalConta, aoClicarEmFecharModal }) => {

    // Hooks e variáveis de estado
    const theme = useTheme();
    const { userId } = useAuth();
    const fetcher = useFetcher();
    const isLoading = fetcher.state != 'idle';
    const loaderData = useRouteLoaderData('root') as IDetalhesDeUsuarios;
    const [actionData, setActionData] = useState<IResponseModalUsuarioAction>(fetcher.data);
    const [originalImage, setOriginalImage] = useState<string | ArrayBuffer | null>(loaderData?.data?.foto?.url || `${Environment.BASE_URL}/profile/profile.jpg`);
    const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(originalImage);
    const [open, setOpen] = useState<boolean>(false);
    const [messageSnackbar, setMessageSnackbar] = useState<string>('');
    const [typeSeverity, setTypeSeverity] = useState<'success' | 'error'>('success');
    const [icone, setIcone] = useState<string>('content_copy');
    const initialForm: IUsuarioModal = {
        nome: loaderData?.data?.nome || '',
        sobrenome: loaderData?.data?.sobrenome || '',
        email: loaderData?.data?.email || '',
        id: loaderData?.data?.id || 0,
        senha: ''
    };
    const [form, setForm] = useState<IUsuarioModal>(initialForm);
    const [formMethod, setFormMethod] = useState<'GET' | 'POST' | 'PATCH' | 'DELETE'>('PATCH');
    const [isModified, setIsModified] = useState<boolean>(false);

    // Função para resetar o formulário
    const resetForm = () => {
        setForm(initialForm);
        setIsModified(false);
        setIcone('content_copy');
        setOriginalImage(loaderData?.data?.foto?.url || `${Environment.BASE_URL}/profile/profile.jpg`);
        setUploadedImage(originalImage);
        setActionData({} as IResponseModalUsuarioAction);
    };

    // Manipulação de input do formulário
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const name = e.target.name as keyof typeof initialForm;

        const value = e.target.value;

        setForm(prevState => ({ ...prevState, [name]: value }));

        if (initialForm[name] !== value) {

            setIsModified(true);

        }
    };

    // Manipulação de cópia de senha
    const handleCopyPassword = () => {

        setIcone('done');

    };

    // Manipulação de mudança de imagem
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Manipulação de fechamento do modal
    const handleCloseModal = () => {
        aoClicarEmFecharModal();
        resetForm(); // Adicione a chamada para resetar o formulário
    };

    // Manipulação de fechamento do Snackbar
    const handleCloseSnackbar = (_event: React.SyntheticEvent | Event, reason?: string) => {

        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setMessageSnackbar('');


        if (typeSeverity === 'success' && actionData?.success && actionData.tipo === 'foto') {

            setIsModified(false);
        }

        if (typeSeverity === 'success' && actionData?.success && actionData.tipo === 'atributos') {

            setIsModified(false);
        }

        if (typeSeverity === 'success' && actionData?.success && actionData.tipo === 'senha') {

            fetcher.submit(
                { idle: true },
                { method: 'post', action: '/logout' }
            );

        }

    };

    // Efeito para atualizar dados quando há mudanças
    useEffect(() => {

        setUploadedImage(loaderData?.data?.foto?.url);
        setOriginalImage(loaderData?.data?.foto?.url);

        setForm({ nome: loaderData.data.nome, email: loaderData.data.email, id: loaderData.data.id, sobrenome: loaderData.data.sobrenome, senha: form.senha || '' });

        if (actionData?.success?.message && actionData?.tipo == 'foto') {

            setMessageSnackbar(actionData.success?.message || '');
            setOpen(true);
            setTypeSeverity('success');
        }

        if (actionData?.errors?.default && actionData?.tipo == 'foto') {
            setMessageSnackbar(actionData?.errors?.default || '');
            setOpen(true);
            setTypeSeverity('error');
        }

        if (actionData?.success?.message && actionData?.tipo == 'atributos') {
            setMessageSnackbar(actionData.success?.message || '');
            setOpen(true);
            setTypeSeverity('success');
        }

        if (actionData?.errors?.default && actionData?.tipo == 'atributos') {
            setMessageSnackbar(actionData?.errors?.default || '');
            setOpen(true);
            setTypeSeverity('error');
        }

        if (actionData?.success?.message && actionData?.tipo == 'senha') {
            setMessageSnackbar(actionData.success?.message || '');
            setOpen(true);
            setTypeSeverity('success');
        }

        if (actionData?.errors?.default && actionData?.tipo == 'senha') {
            setMessageSnackbar(actionData?.errors?.default || '');
            setOpen(true);
            setTypeSeverity('error');
        }

        setActionData(fetcher.data);

    }, [openModalConta, fetcher, loaderData]);

    return (
        <Modal
            open={openModalConta}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box width='100%' height='100%' display="flex" alignItems='center' justifyContent='center'>

                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity={typeSeverity} sx={{ width: '100%' }}>
                        {messageSnackbar}
                    </Alert>
                </Snackbar>

                <Box width='80%' justifyContent="center" component={Paper} elevation={2}  >
                    <fetcher.Form key={userId} action="/blog/usuarios/detalhes/:pagina/:id" method={formMethod} encType='multipart/form-data'>

                        <input type="hidden" name="id" value={Number(userId)} />
                        <input type="hidden" name="nome" value={form.nome} />
                        <input type="hidden" name="sobrenome" value={form.sobrenome} />
                        <input type="hidden" name="email" value={form.email} />


                        <Box padding={1} width='100%' display='flex' justifyContent='right'>
                            <Button
                                variant='text'
                                color='primary'
                                disableElevation
                                startIcon={<Icon>close</Icon>}
                                onClick={handleCloseModal}
                            >
                                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                    Fechar
                                </Typography>
                            </Button>

                        </Box>

                        <Divider variant='middle' />

                        <Box width='100%' height='70%' display="flex" flexDirection="row" gap={2} padding={2}>

                            {isLoading ? (
                                <Box width='30%' display='flex' flexDirection="column" justifyContent='center' alignItems='center' >
                                    <CircularProgress size={130} />
                                </Box>
                            ) : (
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
                                        id="upload-photo-modal"
                                        type="file"
                                        name='foto'
                                        onChange={handleImageChange}
                                        accept="image/*" // Aceita apenas imagens
                                    />
                                    <label htmlFor="upload-photo-modal">
                                        <Button variant="contained" component="span" startIcon={<Icon>file_upload</Icon>} disabled={form.senha != ''}>
                                            Carregar Foto
                                        </Button>
                                    </label>

                                    <Button
                                        type='submit'
                                        variant="outlined"
                                        color="error"
                                        startIcon={<Icon>delete</Icon>}
                                        disabled={form.senha != ''}
                                        onClick={() => setFormMethod('DELETE')}
                                    >
                                        Remover Foto
                                    </Button>
                                </Box>

                            )}

                            <Box width='40%' display='flex' flexDirection="column" justifyContent='center' alignItems='center' gap={2}>

                                <Grid container spacing={3} justifyContent='center' alignItems='center'> {/* Defina alignItems para 'center' */}
                                    <Grid item xs={12} sm={12} md={11} lg={10} xl={8}>
                                        <Typography variant="h6" align="center">Dados do Usuário</Typography> {/* Centralize o texto */}
                                    </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                error={!!actionData?.errors?.body?.nome}
                                                helperText={!!actionData?.errors?.body?.nome && ('Nome: ' + actionData?.errors?.body.nome)}
                                                color={!!actionData?.errors?.body?.nome === false ? ('primary') : 'error'}
                                                focused={!!actionData?.errors?.body?.nome === false}
                                                disabled={form.senha != '' ? true : false}
                                                fullWidth
                                                name='nome'
                                                variant="outlined"
                                                label="Nome"
                                                value={form.nome}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                error={!!actionData?.errors?.body?.sobrenome}
                                                helperText={!!actionData?.errors?.body?.sobrenome && ('Sobrenome: ' + actionData?.errors?.body.sobrenome)}
                                                color={!!actionData?.errors?.body?.sobrenome === false ? ('primary') : 'error'}
                                                focused={!!actionData?.errors?.body?.sobrenome === false}
                                                disabled={form.senha != '' ? true : false}
                                                fullWidth
                                                name='sobrenome'
                                                variant="outlined"
                                                label="Sobrenome"
                                                value={form.sobrenome}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                error={!!actionData?.errors?.body?.email}
                                                helperText={!!actionData?.errors?.body?.email && ('E-mail: ' + actionData?.errors?.body.email)}
                                                color={!!actionData?.errors?.body?.email === false ? ('primary') : 'error'}
                                                focused={!!actionData?.errors?.body?.email === false}
                                                disabled={form.senha != '' ? true : false}
                                                fullWidth
                                                name='email'
                                                variant="outlined"
                                                label="E-mail"
                                                value={form.email}
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
                                </Grid>

                            </Box>

                            <Box>
                                <Divider orientation='vertical' />
                            </Box>
                            <Box width='40%' display='flex' flexDirection="column" justifyContent='center' alignItems='center' gap={2}>
                                <Grid container spacing={3} justifyContent='center' >
                                    <Grid item>
                                        <Typography variant="h6">Alterar Senha</Typography>
                                    </Grid>
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
                                </Grid>

                            </Box>

                        </Box>

                        {isModified && (
                            <>
                                <Divider variant='middle' />

                                <Box width='100%' display='flex' justifyContent='center' alignItems='center' margin={2}>

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
                                </Box>
                            </>
                        )}

                    </fetcher.Form>
                </Box>
            </Box >

        </Modal >
    );
};

