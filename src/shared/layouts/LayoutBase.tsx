import { Box } from '@mui/material';
import React from 'react';

interface ILayoutBaseProps {
    children: React.ReactNode;
    pagination?: React.ReactNode;
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({ children, pagination }) => {
    return (

        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
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
    );
};
