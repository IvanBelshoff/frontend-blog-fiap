import {
    useEffect,
    useState
} from 'react';
import {
    Form,
    useActionData,
    useNavigate,
    useNavigation
} from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
    Paper,
    Icon,
    Typography,
    Divider,
    IconButton,
    Tooltip,
    ThemeProvider,
    useTheme
} from '@mui/material';
import { VscTypeHierarchySub } from 'react-icons/vsc';

import { useAuth } from '../../../shared/contexts/AuthContext';
import { LightInputsTheme } from '../../../shared/themes/LightInputs';
import { useAppThemeContext } from '../../../shared/contexts';
import { DarkInputsTheme } from '../../../shared/themes/DarkInputs';
import { IResponseLoginAction } from '../../../shared/interfaces';

export const Login = () => {

    // Hooks do React para o gerenciamento de estados
    const { setAuthenticated } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isLoading = navigation.formData != null;
    const actionData = useActionData() as IResponseLoginAction;
    const { toggleTheme } = useAppThemeContext();
    const [open, setOpen] = useState<boolean>(false);
    const [messageSnackbar, setMessageSnackbar] = useState<string>('');
    const [typeSeverity, setTypeSeverity] = useState<'success' | 'error'>('success');
    const [recuperaSenha, setRecuperaSenha] = useState<boolean>(false);

    // Função para alternar entre os modos de recuperar senha ou não
    const hantleToggleRecuperarSenha = () => {
        if (recuperaSenha == false) {
            setRecuperaSenha(true);
        } else {
            setRecuperaSenha(false);
        }
    };

    // Função para fechar a Snackbar (mensagem de feedback)
    const handleCloseSnackbar = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setMessageSnackbar('');
        if (actionData?.success?.recover) {
            setRecuperaSenha(false);
        }

    };

    // Efeito colateral que observa mudanças em actionData e realiza ações correspondentes
    useEffect(() => {

        // Fecha a Snackbar se houver erros no corpo da resposta
        if (actionData?.errors?.body) {
            setOpen(false);
        }

        // Exibe Snackbar de erro padrão se houver um erro padrão na resposta
        if (actionData?.errors?.default) {
            setTypeSeverity('error');
            setMessageSnackbar(actionData?.errors?.default);
            setOpen(true);
        }

        // Atualiza o estado de autenticação e recarrega a página se o login for bem-sucedido
        if (actionData?.success?.login) {
            setAuthenticated(true);
            window.location.reload();
        }

        // Exibe Snackbar de sucesso se a recuperação de senha for bem-sucedida
        if (actionData?.success?.recover) {
            setTypeSeverity('success');
            setMessageSnackbar(actionData?.success.recover.message);
            setOpen(true);
        }
    }, [actionData]);

    return (

        <Box width='100%' height='100%' display='flex' flexDirection='row' justifyContent='center' alignItems='center'>


            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={typeSeverity} sx={{ width: '100%' }}>
                    {messageSnackbar}
                </Alert>
            </Snackbar>

            <Box sx={{ background: 'nome' }} width='50%' height={'auto'} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>

                <img src={theme.palette.mode == 'light' ? '/assets/logos/logo-sol-light.png' : '/assets/logos/logo-sol-dark.png'} width={'80%'} height={'100%'} />

            </Box>

            <Box width='50%' height={'auto'} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>

                <Box component={Paper} elevation={24} variant='elevation' padding={3} width='70%'  >
                    
                    <Form method="post" replace>

                        <input type="hidden" name="tipo" value={'login'} />
                        <Box width='100%' display='flex' height='100%' >
                            <Box paddingLeft={2} width='0%' display='flex' justifyContent='center' alignItems='center'>
                                {theme.palette.mode === 'light' ?
                                    (

                                        <Tooltip title="Alterar para tema escuro" placement="top">
                                            <IconButton size="large" onClick={toggleTheme} >
                                                <Icon sx={{ color: theme.palette.primary.main }} fontSize="medium">dark_mode</Icon>
                                            </IconButton>
                                        </Tooltip>

                                    ) :
                                    <Tooltip title="Alterar para tema claro" placement="top">
                                        <IconButton size="large" onClick={toggleTheme} >
                                            <Icon sx={{ color: theme.palette.primary.main }} fontSize="medium">light_mode</Icon>
                                        </IconButton>
                                    </Tooltip>

                                }
                            </Box>
                            <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
                                <Typography textAlign='center' color='primary' variant="h4" >
                                    Seja Bem-Vindo!
                                </Typography>
                            </Box>
                            <Box paddingRight={2} width='0%' display='flex' justifyContent='center' alignItems='center'>
                                <Tooltip title="Ir para Organograma" placement="top">
                                    <IconButton size="large" onClick={() => navigate('/')} >
                                        <Icon sx={{ color: theme.palette.primary.main }} fontSize="medium"><VscTypeHierarchySub /></Icon>
                                    </IconButton>
                                </Tooltip>
                            </Box>

                        </Box>

                        <ThemeProvider theme={theme.palette.mode == 'light' ? LightInputsTheme : DarkInputsTheme}>

                            <TextField
                                sx={{ marginBottom: 2, marginTop: 2, }}
                                error={!!actionData?.errors?.body?.email}
                                helperText={!!actionData?.errors?.body?.email && ('E-mail: ' + actionData?.errors?.body?.email)}
                                fullWidth
                                style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFF' }}
                                InputProps={{
                                    style: {
                                        color: !actionData?.errors?.body?.email ? theme.palette.primary.main : theme.palette.error.main,
                                    },
                                }}
                                color={!!actionData?.errors?.body?.email === false ? ('primary') : 'error'}
                                focused={!!actionData?.errors?.body?.email === false}
                                name="email"
                                disabled={recuperaSenha}
                                id="email"
                                label="E-mail"
                                variant="outlined"
                                placeholder='E-mail'
                            />


                            <TextField
                                sx={{ marginBottom: 2 }}
                                error={!!actionData?.errors?.body?.senha}
                                helperText={!!actionData?.errors?.body?.senha && ('Senha: ' + actionData?.errors?.body?.senha)}
                                fullWidth
                                style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFF' }}
                                color={!!actionData?.errors?.body?.senha === false ? ('primary') : 'error'}
                                focused={!!actionData?.errors?.body?.senha === false}
                                name="senha"
                                disabled={recuperaSenha}
                                id="senha"
                                label="Senha"
                                placeholder='Senha'
                                variant="outlined"
                                type="password"
                                InputProps={{
                                    style: {
                                        color: !actionData?.errors?.body?.senha ? theme.palette.primary.main : theme.palette.error.main,
                                    },
                                }}
                            />
                        </ThemeProvider>

                        <Box textAlign="center">
                            {!recuperaSenha ? (
                                <Button type="submit" variant="contained" color={'primary'} disabled={isLoading} startIcon={<Icon>meeting_room</Icon>} >
                                    {isLoading ? 'Entrando...' : 'Entrar'}
                                </Button>
                            ) : (
                                <Button variant="contained" color={'primary'} disabled startIcon={<Icon>meeting_room</Icon>} >
                                    Entrar
                                </Button>
                            )}

                        </Box>

                    </Form>
                    {
                        recuperaSenha == false ? (
                            <Box marginTop={1} textAlign="center">

                                <Button onClick={hantleToggleRecuperarSenha} variant="text" color="primary" >
                                    ESQUECEU A SENHA ?
                                </Button>
                            </Box>
                        ) : (
                            <Form method="post" replace >
                                <input type="hidden" name="tipo" value={'recover'} />

                                <Box width='100%' marginTop={2} marginBottom={1}>
                                    <Box width='100%'>
                                        <Divider orientation='horizontal' variant="middle" flexItem ></Divider>

                                    </Box>
                                    <Box width='100%' textAlign="center" marginTop={1.5}>
                                        <Typography textAlign='center' color='primary' variant="button" >
                                            Informe o e-mail para recuperação de senha
                                        </Typography>
                                    </Box>
                                    <ThemeProvider theme={theme.palette.mode == 'light' ? LightInputsTheme : DarkInputsTheme}>
                                        <TextField
                                            sx={{ marginBottom: 2, marginTop: 1.5 }}
                                            error={!!actionData?.errors?.body?.emailRecuperacao}
                                            helperText={!!actionData?.errors?.body?.emailRecuperacao && ('E-mail: ' + actionData?.errors?.body?.emailRecuperacao)}
                                            fullWidth
                                            style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFF' }}
                                            InputProps={{
                                                style: {
                                                    color: !actionData?.errors?.body?.emailRecuperacao ? theme.palette.primary.main : theme.palette.error.main,
                                                },
                                                endAdornment: (
                                                    <Tooltip title="Fechar Recuperação de Senha">
                                                        <IconButton size="medium" onClick={hantleToggleRecuperarSenha}>
                                                            <Icon color={'primary'} >close</Icon>
                                                        </IconButton>
                                                    </Tooltip>

                                                )
                                            }}
                                            color={!!actionData?.errors?.body?.emailRecuperacao === false ? ('primary') : 'error'}
                                            focused={!!actionData?.errors?.body?.emailRecuperacao === false}
                                            name="emailRecuperacao"
                                            id="emailRecuperacao"
                                            label="E-mail"
                                            variant="outlined"
                                            placeholder='E-mail'
                                        />
                                    </ThemeProvider>

                                    <Box textAlign="center">
                                        <Button
                                            type='submit'
                                            variant='outlined'
                                            color={'primary'}
                                            disabled={isLoading}
                                            startIcon={<Icon color={'primary'}>send</Icon>}
                                        >
                                            {isLoading ? 'Enviando...' : 'Enviar'}
                                        </Button>
                                    </Box>
                                </Box>
                            </Form>
                        )
                    }


                </Box>
            </Box>


        </Box>

    );
};
