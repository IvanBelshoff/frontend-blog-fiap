import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, TextField, Icon, useTheme, Tooltip, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Outlet, useFetcher, useLoaderData, useMatch, useNavigate, useOutletContext, useParams, useResolvedPath } from 'react-router-dom';
import { useAppThemeContext } from '../../../contexts';
import { IBlogLoader } from '../../../../pages/blog/interfaces/interfaces';
import { IPosts } from '../../../interfaces';
import { Environment } from '../../../environment';


type ContextType = {
    busca: string | null
    data: IPosts[];
    totalCount: number;
};
export const Navbar = () => {
    // Hook personalizado para realizar chamadas a APIs
    const fetcher = useFetcher();
    const theme = useTheme();
    const navigate = useNavigate();
    const loaderData = useLoaderData() as IBlogLoader;
    const { toggleTheme } = useAppThemeContext();
    const [busca, setBusca] = React.useState<string | null>('');
    const { pagina } = useParams<'pagina'>();
    const { id } = useParams<'id'>();
    const resolvedPathHome = useResolvedPath(`/detalhes/${pagina}/${id}`);
    const matchHome = useMatch({ path: resolvedPathHome.pathname, end: false });
    // Estado para controlar a abertura/fechamento do menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // Hook para obter o tema atual do Material-UI
    const isLoggingOut = fetcher.formData != null;

    // Função para realizar a ação de logout quando necessário
    const actionLogout = () => {
        fetcher.submit(
            { idle: true },
            { method: 'post', action: '/logout' }
        );
    };

    // Manipulador de evento para abrir o menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Manipulador de evento para fechar o menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between', background: 'linear-gradient(to right, #f4729c, #ED145B)' }}>
                    {/* Logo */}
                    <IconButton edge="start" color="inherit" aria-label="logo">
                        <Icon>home</Icon> {/* Substitua pelo seu logo */}
                    </IconButton>


                    {!matchHome && (
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                            <TextField
                                size="small"
                                id="outlined-search"
                                type="search"
                                InputProps={{
                                    startAdornment: (
                                        <Icon sx={{ color: 'white', marginRight: 1 }}>search</Icon>
                                    ),
                                    style: { borderColor: 'white' } // Ajusta a cor da borda
                                }}
                                variant="outlined"
                                sx={{
                                    width: '40%',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white', // Cor da borda
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white', // Cor da borda ao passar o mouse
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white', // Cor da borda quando focado
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'white', // Cor do texto
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'white', // Cor do placeholder quando o campo não está focado
                                    },
                                    '& .MuiInputLabel-shrink': {
                                        color: 'white', // Cor do placeholder quando o campo está focado
                                    }
                                }}
                                defaultValue={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                placeholder={Environment.INPUT_DE_BUSCA}
                            />



                        </Box>
                    )}

                    <Box display='flex' justifyContent='center' alignItems='center' gap={2}>


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

                        {loaderData?.usuario && (
                            <Typography color={'white'} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Bem-vindo, {loaderData.usuario.nome}!
                            </Typography>
                        )}
                        
                        {loaderData?.usuario ? (
                            <Box>
                                <Avatar
                                    alt="User Avatar"
                                    src={loaderData.usuario.foto.url}
                                    onClick={handleMenuOpen}
                                    sx={{
                                        cursor: 'pointer',
                                        width: 45, // tamanho original
                                        height: 45, // tamanho original
                                        transition: 'transform 0.3s',
                                        transformOrigin: 'center',
                                        '&:hover': {
                                            transform: 'scale(1.07)', // aumenta a escala para 7% maior
                                        }
                                    }}
                                />

                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    slotProps={{
                                        paper: {
                                            elevation: 5,
                                            sx: {
                                                backgroundColor: theme.palette.background.default,
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 25,
                                                    width: 10,
                                                    height: 10,
                                                    backgroundColor: theme.palette.mode == 'dark' ? '#37383a' : theme.palette.background.paper,
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }
                                    }}
                                >

                                    <MenuItem disabled={isLoggingOut} onClick={actionLogout}>

                                        <ListItemIcon >
                                            <Icon>logout</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary='Sair' />

                                    </MenuItem>

                                </Menu>

                            </Box >
                        ) : (
                            <IconButton size="large" color="inherit" onClick={() => navigate('/login')}>
                                <Icon>login</Icon>
                            </IconButton>
                        )}

                    </Box>

                </Toolbar>
            </AppBar>
            <Box paddingTop={7} height="100vh" width='100%'>
                <Outlet context={{ busca: busca, data: loaderData?.data, totalCount: loaderData?.totalCount } satisfies ContextType} />
            </Box>
        </Box >

    );
};

export function useNavbar() {
    return useOutletContext<ContextType>();
}
