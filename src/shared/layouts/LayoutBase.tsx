import { AppBar, Box, Icon, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Navbar } from '../components';

interface ILayoutBaseProps {
    children: React.ReactNode;
    pagination?: React.ReactNode;
    aoMudarTextoDeBusca: (novoTexto: string) => void;
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({ children, pagination, aoMudarTextoDeBusca }) => {
    return (
        <Box height="100vh" width="100%">
            <Navbar textoDaBusca={'Buscar...'} aoMudarTextoDeBusca={aoMudarTextoDeBusca}            
            />

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
                pt={7} // Adiciona espaço abaixo da AppBar
                sx={{ scrollBehavior: 'smooth' }}
            >
                {/* Conteúdo principal */}
                <Box flex={1} overflow="auto">
                    {children}
                </Box>

                {/* Paginação */}
                {pagination && (
                    <Box>
                        {pagination}
                    </Box>
                )}

            </Box>
        </Box>
    );
};
