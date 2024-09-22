import {
    Box,
    Button,
    Divider,
    Icon,
    Modal,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { IModalSobreProps } from '../../../interfaces';

export const ModalSobre: React.FC<IModalSobreProps> = ({
    openModalSobre,
    aoClicarEmFecharModal }) => {
        const theme = useTheme();
        const smDown = useMediaQuery(theme.breakpoints.down("sm"));
        const mdDown = useMediaQuery(theme.breakpoints.down("md"));
        const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
        const xsDown = useMediaQuery(theme.breakpoints.down("xs"));
      
    return (
        <Modal
            open={openModalSobre}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box width='100%' height='100%' display="flex" alignItems='center' justifyContent='center' >

                <Box  flexDirection={"column"} alignContent='center' textAlign={'center'} width={smDown? "80vw" : mdDown ? "60vw" : xlDown ? "40vw" : "30vw" } height={smDown? "25vh" : "20vh" } justifyContent="space-between" component={Paper} elevation={2}  >



                    <Box width='100%' height='auto' display="flex" flexDirection="column" alignItems='center' justifyContent='center' gap={2} padding={2}>

                        <Typography variant='h5'>Sistema de Blog Fiap</Typography>

                        <Typography variant='h7'>Versão: 1.0 BETA - 2024</Typography>

                    </Box>

                    <Divider variant='middle' />

                    <Box paddingTop={2} width='100%' display='flex' justifyContent='center'>
                        <Button
                            variant='text'
                            color='primary'
                            disableElevation
                            startIcon={<Icon>close</Icon>}
                            onClick={aoClicarEmFecharModal}
                        >
                            <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                Fechar
                            </Typography>
                        </Button>

                    </Box>


                </Box>
            </Box >

        </Modal >
    );
};

