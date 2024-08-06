import React, {
    useEffect,
    useState
} from 'react';
import {
    Avatar,
    Box,
    Divider,
    Icon,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    useTheme
} from '@mui/material';
import {
    useFetcher,
    useRouteLoaderData
} from 'react-router-dom';

import {
    IAccountUserProps,
    IDetalhesDeUsuarios
} from '../../../interfaces';

export const AccountUser: React.FC<IAccountUserProps> = ({ account_circle, about }) => {

    // Hook personalizado para realizar chamadas a APIs
    const fetcher = useFetcher();

    // Hook para obter dados da rota atual
    const theme = useTheme();

    // Hook para obter o tema atual do Material-UI
    const isLoggingOut = fetcher.formData != null;

    // Verifica se o usuário está realizando o logout
    const [logout, setLogout] = useState<boolean>(false);

    // Estado para controlar a abertura/fechamento do menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Estado para controlar o logout
    const loaderData = useRouteLoaderData('root') as IDetalhesDeUsuarios;

    // Função para realizar a ação de logout quando necessário
    const actionLogout = (logout: boolean) => {
        if (logout == true) {
            fetcher.submit(
                { idle: true },
                { method: 'post', action: '/logout' }
            );
        }
    };

    // Manipulador de evento para abrir o menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Manipulador de evento para fechar o menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Efeito colateral para realizar a ação de logout quando o estado de logout muda
    useEffect(() => {
        actionLogout(logout);
    }, [logout]);

    return (
        <Box>
            <Avatar
                alt="User Avatar"
                src={loaderData.data.foto.url}
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

                {account_circle && (
                    account_circle
                )}

                {about && (
                    about
                )}

                <Divider />

                <MenuItem disabled={isLoggingOut} onClick={() => setLogout(true)}>

                    <ListItemIcon >
                        <Icon>logout</Icon>
                    </ListItemIcon>
                    <ListItemText primary='Sair' />

                </MenuItem>

            </Menu>

        </Box >
    );
};
