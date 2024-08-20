import {
    Box,
    Button,
    Divider,
    Icon,
    Modal,
    Paper,
    ThemeProvider,
    Typography,
    useTheme,
} from '@mui/material';

import { DarkInputsTheme, LightInputsTheme } from '../../../themes';
import { IModalSobreProps } from '../../../interfaces';
import { Environment } from '../../../environment';

export const ModalSobre: React.FC<IModalSobreProps> = ({
    openModalSobre,
    aoClicarEmFecharModal }) => {

    const theme = useTheme();

    const lgpd = `${Environment.BASE_URL}/luvep/politica_de_privacidade.pdf`;

    const abrirPoliticaPrivacidade = () => {
        window.open(lgpd, '_blank');
    };

    return (
        <Modal
            open={openModalSobre}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box width='100%' height='100%' display="flex" alignItems='center' justifyContent='center'>

                <Box width='auto' justifyContent="center" component={Paper} elevation={2}  >

                    <Box padding={1} width='100%' display='flex' justifyContent='right'>
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

                    <Divider variant='middle' />

                    <Box width='100%' height='auto' display="flex" flexDirection="column" alignItems='center' justifyContent='center' gap={2} padding={2}>

                        <Typography variant='h4'>Sistema de Blog Luvep</Typography>

                        <Typography variant='h5'> Luvep - Luz Veiculos e Peças LTDA</Typography>

                        <Typography variant='h5'>Versão: 1.0 BETA - 2024</Typography>

                        <Box width='100%' alignItems='center' display='flex' flexDirection='column' gap={2} justifyContent="center" padding={1} component={Paper} variant='outlined'  >

                            <ThemeProvider theme={theme.palette.mode == 'light' ? LightInputsTheme : DarkInputsTheme}>

                                <Typography variant='subtitle1'>Software de propriedade privada, seu uso é restrito aos fins internos da organização.</Typography>

                            </ThemeProvider>

                            <Button
                                variant='outlined'
                                startIcon={<Icon>lock</Icon>}
                                onClick={abrirPoliticaPrivacidade}
                            >
                                Política de Privacidade
                            </Button>

                        </Box>

                    </Box>

                </Box>
            </Box >

        </Modal >
    );
};

