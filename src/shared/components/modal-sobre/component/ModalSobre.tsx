import {
    Box,
    Button,
    Divider,
    Icon,
    Modal,
    Paper,
    Typography,
} from '@mui/material';

import { IModalSobreProps } from '../../../interfaces';

export const ModalSobre: React.FC<IModalSobreProps> = ({
    openModalSobre,
    aoClicarEmFecharModal }) => {

    return (
        <Modal
            open={openModalSobre}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box width='100%' height='100%' display="flex" alignItems='center' justifyContent='center'>

                <Box width='auto' justifyContent="center" component={Paper} elevation={2}  >



                    <Box width='100%' height='auto' display="flex" flexDirection="column" alignItems='center' justifyContent='center' gap={2} padding={2}>

                        <Typography variant='h4'>Sistema de Blog Fiap</Typography>

                        <Typography variant='h6'>Versão: 1.0 BETA - 2024</Typography>

                    </Box>

                    <Divider variant='middle' />

                    <Box padding={1} width='100%' display='flex' justifyContent='center'>
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

