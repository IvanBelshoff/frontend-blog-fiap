import React, { useState } from 'react';
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
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import {
    Outlet,
    useLocation,
    useMatch,
    useNavigate,
    useResolvedPath
} from 'react-router-dom';
import { VscTypeHierarchySub } from 'react-icons/vsc';

import {
    useAppThemeContext,
    useIndex
} from '../../../contexts';
import {
    AccountUser,
    ModalSobre,
    ModalUsuario
} from '../..';
import { AppBarProps } from '../../../interfaces';

export const DrawerAppBar = () => {

    // Obtenção de temas, contexto, e hooks de navegação
    const theme = useTheme();
    const { toggleTheme } = useAppThemeContext();
    const { selectedIndex, setSelectedIndex } = useIndex();
    const [openModalConta, setOpenModalConta] = useState<boolean>(false);
    const [openModalSobre, setOpenModalSobre] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Configuração de caminhos e correspondências de rotas
    const resolvedPathUsuarios = useResolvedPath('/organograma/usuarios');
    const matchUsuarios = useMatch({ path: resolvedPathUsuarios.pathname, end: false });
    const resolvedPathFuncionarios = useResolvedPath('/organograma/funcionarios');
    const matchFuncionarios = useMatch({ path: resolvedPathFuncionarios.pathname, end: false });
    const resolvedPathPreview = useResolvedPath('/organograma/preview');
    const matchPreview = useMatch({ path: resolvedPathPreview.pathname, end: false });

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

    // Função auxiliar para definir o índice padrão com base no caminho da rota
    const defaultIndex = (path: string) => {

        const resolvedPath = useResolvedPath(path);

        const match = useMatch({ path: resolvedPath.pathname, end: false });

        if (path == '/organograma' && !!match) {
            return 1;
        } else if (path == '/organograma/funcionarios' && !!match) {
            return 2;
        } else if (path == '/organograma/usuarios' && !!match) {
            return 3;
        }

    };

    // Índice padrão para a rota atual
    const selectedIndexHome = defaultIndex(location.pathname);

    // Manipuladores de clique e abertura/fechamento da gaveta
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
                        SISTEMA DE ORGANOGRAMA LUVEP
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
                            account_circle={

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

                            selected={selectedIndex != undefined ? selectedIndex == 1 : selectedIndexHome == 1}
                            onClick={(event) => { handleListItemClick(event, 1), navigate('/organograma'); }}
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
                            <ListItemText primary='Página inicial' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}

                            selected={selectedIndex != undefined ? selectedIndex === 2 : !!matchFuncionarios}
                            onClick={(event) => { handleListItemClick(event, 2), navigate('/organograma/funcionarios'); }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <Icon>people</Icon>
                            </ListItemIcon>
                            <ListItemText primary='Gerenciar Funcionarios' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}

                            selected={selectedIndex != undefined ? selectedIndex === 3 : !!matchPreview}
                            onClick={(event) => { handleListItemClick(event, 3), navigate('/organograma/preview'); }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <Icon><VscTypeHierarchySub /></Icon>
                            </ListItemIcon>
                            <ListItemText primary='Pré-Visualização do Organograma' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </List>
                </Box>
                <Divider />
                <Box>

                    <List component='nav'>

                        <ListItemButton sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                            selected={selectedIndex != undefined ? selectedIndex === 4 : !!matchUsuarios}
                            onClick={(event) => { handleListItemClick(event, 4), navigate('usuarios'); }}
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
                <Box>

                </Box>
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