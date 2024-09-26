import React, { useEffect, useState } from 'react';
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
    Tooltip,
    Typography,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { useFetcher, useRouteLoaderData } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import { IDetalhesDeUsuarios, IModalUsuarioProps, IResponseModalUsuarioAction, IUsuarioModal } from '../../../interfaces';
import { useAuth } from '../../../contexts';
import { Environment } from '../../../environment';
import { CropperModal } from '../..';

export const ModalUsuario: React.FC<IModalUsuarioProps> = ({ openModalConta, aoClicarEmFecharModal }) => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const { userId } = useAuth();
    const fetcher = useFetcher();
    const isLoading = fetcher.state !== 'idle';
    const loaderData = useRouteLoaderData('root') as IDetalhesDeUsuarios;
    const [actionData, setActionData] = useState<IResponseModalUsuarioAction>(fetcher.data);
    const [originalImage, setOriginalImage] = useState<string | ArrayBuffer | null>(loaderData?.data?.foto?.url || `${Environment.BASE_URL}/profile/profile.jpg`);
    const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | Blob | null>(originalImage);
    const [open, setOpen] = useState<boolean>(false);
    const [messageSnackbar, setMessageSnackbar] = useState<string>('');
    const [typeSeverity, setTypeSeverity] = useState<'success' | 'error'>('success');
    const [icone, setIcone] = useState<string>('content_copy');
    const [filename, setFilename] = useState<string>('');
    const initialForm: IUsuarioModal = {
        nome: loaderData?.data?.nome || '',
        sobrenome: loaderData?.data?.sobrenome || '',
        email: loaderData?.data?.email || '',
        id: loaderData?.data?.id || 0,
        senha: ''
    };

    const reader = new FileReader();

    const [form, setForm] = useState<IUsuarioModal>(initialForm);
    const [statePhoto, setStatePhoto] = useState<'original' | 'edição' | 'preview'>('original');
    const [formMethod, setFormMethod] = useState<'GET' | 'POST' | 'PATCH' | 'DELETE'>('PATCH');
    const [isModified, setIsModified] = useState<boolean>(false);

    const resetForm = () => {
        setForm(initialForm);
        setIsModified(false);
        setIcone('content_copy');
        setOriginalImage(loaderData?.data?.foto?.url || `${Environment.BASE_URL}/profile/profile.jpg`);
        setUploadedImage(originalImage);
        setActionData({} as IResponseModalUsuarioAction);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof typeof initialForm;
        const value = e.target.value;
        setForm(prevState => ({ ...prevState, [name]: value }));
        if (initialForm[name] !== value) {
            setIsModified(true);
        }
    };

    const handleCopyPassword = () => {
        setIcone('done');
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

    const handleSaveEditedImage = (blob: Blob, state?: 'original' | 'edição' | 'preview') => {
        reader.onloadend = () => {
            setUploadedImage(blob);
            const editedFile = new File([blob], filename || 'edited_photo.jpg', { type: blob.type });
            const fileList = new DataTransfer();
            fileList.items.add(editedFile);
            const uploadedPhotoInput = document.getElementById('upload-photo-modal') as HTMLInputElement;
            uploadedPhotoInput.files = fileList.files;
            if (state) {
                setStatePhoto(state);
                setIsModified(true);
            }
        };
        reader.readAsDataURL(blob);
    };

    const handleRemoveImage = () => {
        setIsModified(false);
        if (document.getElementById('upload-photo-modal')) {
            (document.getElementById('upload-photo-modal') as HTMLInputElement).value = '';
            setUploadedImage(originalImage || `${Environment.BASE_URL}/profile/profile.jpg`);
        }
        setStatePhoto('original');
    };

    const handleCloseModal = () => {
        aoClicarEmFecharModal();
        resetForm();
    };

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

    useEffect(() => {
        if (loaderData?.data?.foto?.url) {
            setUploadedImage(loaderData.data.foto.url);
            setOriginalImage(loaderData.data.foto.url);
        }
        if (fetcher?.data) {
            setActionData(fetcher.data);
        }
        if (actionData?.success?.message && actionData?.tipo === 'foto') {
            setMessageSnackbar(actionData.success?.message || '');
            setOpen(true);
            setTypeSeverity('success');
        }
        if (actionData?.errors?.default && actionData?.tipo === 'foto') {
            setMessageSnackbar(actionData?.errors?.default || '');
            setOpen(true);
            setTypeSeverity('error');
        }
        if (actionData?.success?.message && actionData?.tipo === 'atributos') {
            setMessageSnackbar(actionData.success?.message || '');
            setOpen(true);
            setTypeSeverity('success');
        }
        if (actionData?.errors?.default && actionData?.tipo === 'atributos') {
            setMessageSnackbar(actionData?.errors?.default || '');
            setOpen(true);
            setTypeSeverity('error');
        }
        if (actionData?.success?.message && actionData?.tipo === 'senha') {
            setMessageSnackbar(actionData.success?.message || '');
            setOpen(true);
            setTypeSeverity('success');
        }
        if (actionData?.errors?.default && actionData?.tipo === 'senha') {
            setMessageSnackbar(actionData?.errors?.default || '');
            setOpen(true);
            setTypeSeverity('error');
        }
    }, [openModalConta, fetcher, loaderData]);

    return (
        <Modal
            open={openModalConta}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
        >
            <Box
                width={isMobile || isTablet ? '100%' : '80%'}
                maxWidth='900px'
                height={isMobile || isTablet ? 'auto' : '100%'}
                margin='auto'
                display="flex"
                alignItems='center'
                justifyContent='center'
                padding={2}
                sx={{
                    overflowY: 'auto',
                }}
            >
                <Paper
                    sx={{
                        width: '100%',
                        padding: theme.spacing(2),
                        display: 'flex',
                        flexDirection: 'column',
                        gap: theme.spacing(2),
                        borderRadius: 2,
                        boxShadow: theme.shadows[5],
                        maxHeight: '95vh',
                        overflowY: 'auto',
                    }}
                >
                    <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert onClose={handleCloseSnackbar} severity={typeSeverity} sx={{ width: '100%' }}>
                            {messageSnackbar}
                        </Alert>
                    </Snackbar>

                    <fetcher.Form
                        key={userId}
                        action="/blog/usuarios/detalhes/:pagina/:id"
                        method={formMethod}
                        encType='multipart/form-data'
                    >
                        <input type="hidden" name="id" value={Number(userId)} />
                        <input type="hidden" name="nome" value={form.nome} />
                        <input type="hidden" name="sobrenome" value={form.sobrenome} />
                        <input type="hidden" name="email" value={form.email} />
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo-modal"
                            type="file"
                            name='foto'
                            onChange={handleImageChange}
                            accept="image/*"
                        />

                        <Box padding={1} width='100%' display='flex' justifyContent='flex-end'>
                            <Button
                                variant='text'
                                color='primary'
                                disableElevation
                                startIcon={<Icon>close</Icon>}
                                onClick={handleCloseModal}
                            >
                                <Typography variant='button'>
                                    Fechar
                                </Typography>
                            </Button>
                        </Box>

                        <Divider variant='middle' />

                        <Box
                            width='100%'
                            display="flex"
                            flexDirection={isMobile || isTablet? 'column' : 'row'}
                            justifyItems={'center'}
                            alignItems={'center'}
                            gap={2}
                            padding={2}
                        >
                            {isLoading ? (
                                <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
                                    <CircularProgress size={130} />
                                </Box>
                            ) : (
                                <Box
                                    width={isMobile ? '100%' : isTablet ? '50%': '30%'}
                                    display='flex'
                                    flexDirection='column'
                                    justifyItems={'center'}
                                    alignItems={'center'}
                                    gap={2}
                                >
                                    <Typography variant='h5'>
                                        Foto do Usuário
                                    </Typography>
                                    {(statePhoto === 'original' || statePhoto === 'preview') ? (
                                        <>
                                            <Avatar
                                                src={typeof uploadedImage === 'string' ? uploadedImage : URL.createObjectURL(uploadedImage as Blob)}
                                                alt="Foto do usuário"
                                                style={{ width: '65%', height: 'auto', border: `2px solid ${theme.palette.primary.main}` }}
                                            />
                                            <label htmlFor="upload-photo-modal">
                                                <Button
                                                    variant="contained"
                                                    component="span"
                                                    startIcon={<Icon>file_upload</Icon>}
                                                    sx={{ width: '100%', maxWidth: '180px' }}
                                                >
                                                    Carregar Foto
                                                </Button>
                                            </label>
                                            {statePhoto !== 'original' ? (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={handleRemoveImage}
                                                    sx={{ width: '100%', maxWidth: '180px' }}
                                                >
                                                    Cancelar alteração
                                                </Button>
                                            ) : (
                                                <Button
                                                    type='submit'
                                                    variant="outlined"
                                                    color="error"
                                                    startIcon={<Icon>delete</Icon>}
                                                    disabled={loaderData?.data?.foto?.url == `${Environment.BASE_URL}/profile/profile.jpg`}
                                                    onClick={() => setFormMethod('DELETE')}
                                                    sx={{ width: '100%', maxWidth: '180px' }}
                                                >
                                                    Remover Foto
                                                </Button>
                                            )}
                                        </>
                                    ) : (
                                        <CropperModal
                                            src={uploadedImage as string}
                                            setPreview={setUploadedImage}
                                            cancelPhoto={handleRemoveImage}
                                            onSave={handleSaveEditedImage}
                                        />
                                    )}
                                </Box>
                            )}

                            <Box
                                width={isMobile || isTablet ? '100%' : '40%'}
                                display='flex'
                                flexDirection='column'
                                alignItems='center'
                                gap={2}
                            >
                                <Typography variant="h6" align="center">
                                    Dados do Usuário
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            error={!!actionData?.errors?.body?.nome}
                                            helperText={actionData?.errors?.body?.nome && ('Nome: ' + actionData?.errors?.body.nome)}
                                            color={actionData?.errors?.body?.nome ? 'error' : 'primary'}
                                            focused={!(actionData?.errors?.body?.nome)}
                                            disabled={form.senha !== ''}
                                            fullWidth
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
                                            helperText={actionData?.errors?.body?.sobrenome && ('Sobrenome: ' + actionData?.errors?.body.sobrenome)}
                                            color={actionData?.errors?.body?.sobrenome ? 'error' : 'primary'}
                                            focused={!(actionData?.errors?.body?.sobrenome)}
                                            disabled={form.senha !== ''}
                                            fullWidth
                                            name='sobrenome'
                                            variant="outlined"
                                            label="Sobrenome"
                                            value={form.sobrenome}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={!!actionData?.errors?.body?.email}
                                            helperText={actionData?.errors?.body?.email && ('E-mail: ' + actionData?.errors?.body.email)}
                                            color={actionData?.errors?.body?.email ? 'error' : 'primary'}
                                            focused={!(actionData?.errors?.body?.email)}
                                            disabled={form.senha !== ''}
                                            fullWidth
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
                                                                    <Icon color='primary'>{icone}</Icon>
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

                            <Box width={isMobile || isTablet ? '100%' : '40%'} display='flex' flexDirection='column' alignItems='center'>
                                <Typography variant="h6" align="center" paddingBottom={"10px"}>
                                    Alterar Senha
                                </Typography>
                                <TextField
                                    error={!!actionData?.errors?.body?.senha}
                                    helperText={actionData?.errors?.body?.senha && ('Senha: ' + actionData?.errors?.body.senha)}
                                    color={actionData?.errors?.body?.senha ? 'error' : 'primary'}
                                    focused={!(actionData?.errors?.body?.senha)}
                                    disabled={form.nome !== initialForm.nome || form.email !== initialForm.email || form.sobrenome !== initialForm.sobrenome || uploadedImage !== originalImage}
                                    fullWidth
                                    type='password'
                                    name='senha'
                                    variant="outlined"
                                    label="Nova senha"
                                    value={form.senha}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Box>

                        {isModified && (
                            <>
                                <Divider variant='middle' />
                                <Box width='100%' display='flex' justifyContent='center' alignItems='center' margin={2}>
                                    <Box display='flex' gap={2}>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            disableElevation
                                            type='submit'
                                            startIcon={<Icon>save</Icon>}
                                            onClick={() => setFormMethod('PATCH')}
                                        >
                                            <Typography variant='button'>
                                                Salvar alteração
                                            </Typography>
                                        </Button>
                                        <IconButton aria-label="refresh" color="primary" onClick={resetForm}>
                                            <Icon>refresh</Icon>
                                        </IconButton>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </fetcher.Form>
                </Paper>
            </Box>
        </Modal>
    );
};
