import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
    return (
        <Box width='100%' height='100%' display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress size={130} />
        </Box>
    );
};
