import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, TextField, Icon } from '@mui/material';

interface INavbarProps {
    textoDaBusca: string;
    aoMudarTextoDeBusca: (novoTexto: string) => void;
}

export const Navbar: React.FC<INavbarProps> = ({ textoDaBusca, aoMudarTextoDeBusca }) => {
    return (
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
                        onChange={(e) => aoMudarTextoDeBusca(e.target.value)}
                        placeholder={textoDaBusca || 'buscar...'}
                        InputProps={{
                            startAdornment: (
                                <Icon sx={{ marginRight: 1 }}>search</Icon>
                            ),
                        }}
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
    );
};
