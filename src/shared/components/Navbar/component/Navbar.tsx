import React from 'react';
import { AppBar, Toolbar, IconButton, Box, TextField, Icon } from '@mui/material';
import { Outlet, useOutletContext } from 'react-router-dom';

/*
interface INavbarProps {
    textoDaBusca?: 'busca';
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
}
*/

type ContextType = { busca: string | null };
export const Navbar = () => {

    const [busca, setBusca] = React.useState<string | null>('');

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <IconButton edge="start" color="inherit" aria-label="logo">
                        <Icon>home</Icon> {/* Substitua pelo seu logo */}
                    </IconButton>

                    {/* Barra de pesquisa centralizada */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            size='small'
                            id="outlined-search"
                            type="search"
                            placeholder={'buscar...'}
                            InputProps={{
                                startAdornment: (
                                    <Icon sx={{ marginRight: 1 }}>search</Icon>
                                ),
                            }}
                            onChange={(e) => setBusca(e.target.value)}
                            sx={{
                                width: '50%',
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                },
                            }}
                        />
                    </Box>

                    {/* Ícone de login */}
                    <IconButton size="large" color="inherit">
                        <Icon>account_circle</Icon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box paddingTop={7} height="100vh" width='100%'>
                <Outlet context={{ busca } satisfies ContextType} />
            </Box>
        </Box>

    );
};

export function useNavbar() {
    return useOutletContext<ContextType>();
}
