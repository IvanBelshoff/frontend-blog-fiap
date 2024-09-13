import {
    Box,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';

import { ILayoutBaseDePaginaProps } from '../interfaces';

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramentas, group, alert }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box height='100%' display='flex' flexDirection='column' gap={1} sx={{ scrollBehavior: 'smooth' }}>
            <Box padding={1} display='flex' alignItems='center' gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}>


                <Box display='flex' width='100%' alignItems='center' justifyContent='center' marginTop={2}>
                    <Typography
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
                    >
                        {titulo}
                    </Typography>

                </Box>
                {
                    alert && (
                        <Box marginBottom={2} width='25%' alignSelf='end' position='fixed' right='0' bottom='0'>
                            {alert}
                        </Box>
                    )
                }
            </Box>

            {
                barraDeFerramentas && (
                    <Box>
                        {barraDeFerramentas}
                    </Box>
                )}

            {
                group && (
                    <Box>
                        {group}
                    </Box>
                )}

            <Box flex={1} overflow='auto' width={smDown || mdDown ? '85vw' : 'auto'}>
                {children}
            </Box>
        </Box>

    );
};