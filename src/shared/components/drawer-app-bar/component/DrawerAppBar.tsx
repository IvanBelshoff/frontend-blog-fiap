import React, { useEffect, useState } from 'react';
import {
    styled,
    useTheme,
    Theme,
    CSSObject
} from '@mui/material/styles';
import {
    AppBar as MuiAppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer as MuiDrawer,
    Icon,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Tooltip,
    Typography,
    MenuItem
} from '@mui/material';
import {
    Outlet,
    useFetcher,
    useMatch,
    useNavigate,
    useResolvedPath
} from 'react-router-dom';

import {
    useAppThemeContext,
    useAuth,
    useIndex
} from '../../../contexts';

import { AccountUser, ModalSobre, ModalUsuario } from '../..';
import { AppBarProps } from './interfaces/interfaces';
import { Environment } from '../../../environment';
import { BsFilePost } from 'react-icons/bs';

export const DrawerAppBar = () => {

    // Hook personalizado para realizar chamadas a APIs
    const fetcher = useFetcher();
    const navigate = useNavigate();

    // Obtenção de temas, contexto, e hooks de navegação
    const theme = useTheme();
    const { toggleTheme } = useAppThemeContext();
    const { selectedIndex, setSelectedIndex } = useIndex();
    const isLoading = fetcher.formData != null;
    const { regras } = useAuth();
    const [openModalConta, setOpenModalConta] = useState<boolean>(false);
    const [openModalSobre, setOpenModalSobre] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [logout, setLogout] = useState<boolean>(false);

    const resolvedPathHome = useResolvedPath('/blog');
    const matchHome = useMatch({ path: resolvedPathHome.pathname, end: false });
    const resolvedPathUsuarios = useResolvedPath('/usuarios');
    const matchUsuarios = useMatch({ path: resolvedPathUsuarios.pathname, end: false });
    const resolvedPathPosts = useResolvedPath('/posts');
    const matchPosts = useMatch({ path: resolvedPathPosts.pathname, end: false });
    // Largura da gaveta
    const drawerWidth = 280;

    // Mixins para a transição da largura da gaveta
    const openedMixin = (theme: Theme): CSSObject => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme: Theme): CSSObject => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    // Cabeçalho da gaveta
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }));

    // Barra de aplicativo estilizada com abertura/fechamento da gaveta
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    // Gaveta estilizada com abertura/fechamento
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );


    const handleListItemClick = (
        _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const HandleActionLogout = (logout: boolean) => {
        if (logout == true) {
            fetcher.submit(
                { idle: true },
                { method: 'post', action: '/logout' }
            );
        }
    };

    useEffect(() => {
        HandleActionLogout(logout);
    }, [logout]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <Icon sx={{ color: '#FFF' }} fontSize="large">menu</Icon>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#FFF' }}>
                        Blog Fiap
                    </Typography>
                    <Box display='flex' flexDirection='row' alignItems='center' gap={1}>

                        <Box >
                            {theme.palette.mode === 'light' ?
                                (

                                    <Tooltip title="Alterar para tema escuro" placement="left">
                                        <IconButton size="large" onClick={toggleTheme} >
                                            <Icon sx={{ color: '#FFF' }} fontSize="medium">dark_mode</Icon>
                                        </IconButton>
                                    </Tooltip>

                                ) :
                                <Tooltip title="Alterar para tema claro" placement="left">
                                    <IconButton size="large" onClick={toggleTheme} >
                                        <Icon sx={{ color: '#FFF' }} fontSize="medium">light_mode</Icon>
                                    </IconButton>
                                </Tooltip>

                            }
                        </Box>

                        <AccountUser
                            profile={

                                <MenuItem onClick={() => setOpenModalConta(true)}>
                                    <ListItemIcon >
                                        <Icon>account_circle</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary='Minha Conta' />
                                </MenuItem>

                            }
                            about={
                                <MenuItem onClick={() => setOpenModalSobre(true)}>
                                    <ListItemIcon >
                                        <Icon>help_outline</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary='Sobre' />
                                </MenuItem>
                            }
                            logout={
                                <MenuItem disabled={isLoading} onClick={() => setLogout(true)}>

                                    <ListItemIcon >
                                        <Icon>logout</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary='Sair' />

                                </MenuItem>
                            }
                        />

                    </Box>
                </Toolbar>

            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <Icon sx={{ color: theme.palette.mode == 'light' ? 'secondary' : '#FFF' }} fontSize="large">chevron_right</Icon> : <Icon sx={{ color: theme.palette.mode == 'light' ? 'secondary' : '#FFF' }} fontSize="large">chevron_left</Icon>}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Box flex={1}>
                    <List component='nav'>

                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}

                            selected={selectedIndex != undefined ? selectedIndex === 1 : !!matchHome}
                            onClick={(event) => { handleListItemClick(event, 1), navigate('/blog'); }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <Icon>home</Icon>
                            </ListItemIcon>
                            <ListItemText primary='Home' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>

                        {Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_PROFESSOR]) && (
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}

                                selected={selectedIndex != undefined ? selectedIndex === 2 : !!matchPosts}
                                onClick={(event) => { handleListItemClick(event, 2), navigate('posts'); }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon><BsFilePost /></Icon>
                                </ListItemIcon>
                                <ListItemText primary='Gerenciar Posts' sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        )}
                    </List>

                </Box>

                {Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO]) && (
                    <>
                        <Divider />
                        <Box>

                            <List component='nav'>

                                <ListItemButton sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                    selected={selectedIndex != undefined ? selectedIndex === 3 : !!matchUsuarios}
                                    onClick={(event) => { handleListItemClick(event, 3), navigate('usuarios'); }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Icon>manage_accounts</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary='Gerenciar Usuários' sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>

                            </List>

                        </Box>
                    </>
                )}
            </Drawer >

            {openModalConta && (
                <ModalUsuario
                    aoClicarEmFecharModal={() => (setOpenModalConta(false))}
                    openModalConta={openModalConta}
                />
            )}

            {openModalSobre && (
                <ModalSobre
                    aoClicarEmFecharModal={() => (setOpenModalSobre(false))}
                    openModalSobre={openModalSobre}
                />
            )}

            <Box paddingTop={7} height="100vh" width='100%'>
                <Outlet />
            </Box>

        </Box >
    );
};