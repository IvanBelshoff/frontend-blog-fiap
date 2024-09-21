import {
    Box,
    Button,
    Divider,
    Icon,
    Paper,
    Skeleton,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';

import { IFerramentasDeDetalhesProps } from '../../../interfaces';

export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhesProps> = ({
    textoBotaoNovo = 'Novo',

    mostrarBotaoSalvar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoNovo = true,
    mostrarBotaoResetar = true,
    mostrarBotaoSalvarEFechar = false,
    mostrarBotaoVoltar = true,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoResetarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,

    aoClicarEmApagar,
    aoClicarEmNovo,
    aoClicarEmVoltar,

    salvar,
    salvarEFechar,
    resetar,

}) => {

    // Hook para obter o tema atual do Material-UI
    const theme = useTheme();

    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
        gap={1}
        marginX={1}
        padding={1}
        paddingX={2}
            justifyContent={'center'}
            display='flex'
            alignItems='center'
            height={theme.spacing(7)}
            component={Paper}
        >
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (<Box>
                {salvar}
            </Box>)}

            {mostrarBotaoSalvarCarregando && (
                <Skeleton width={110} height={60} />
            )}

            {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (
                <Box>
                    {salvarEFechar}
                </Box>)}

            {(mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (
                <Skeleton width={180} height={60} />
            )}

            {(mostrarBotaoResetar && !mostrarBotaoResetarCarregando) && (<Box>
                {resetar}
            </Box>)}

            {mostrarBotaoResetarCarregando && (
                <Skeleton width={110} height={60} />
            )}


            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={aoClicarEmApagar}
                startIcon={<Icon>delete</Icon>}
            >

                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                    Apagar
                </Typography>

            </Button>)}

            {mostrarBotaoApagarCarregando && (
                <Skeleton width={110} height={60} />
            )}

            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && !mdDown) && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={aoClicarEmNovo}
                startIcon={<Icon>add</Icon>}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                    {textoBotaoNovo}
                </Typography>
            </Button>)}

            {(mostrarBotaoNovoCarregando && !smDown && !mdDown) && (
                <Skeleton width={110} height={60} />
            )}

            {(
                mostrarBotaoVoltar
                &&
                (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar)
                &&
                (<Divider variant='middle' orientation='vertical' />)
            )}

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                onClick={aoClicarEmVoltar}
                startIcon={<Icon>arrow_back</Icon>}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                    Voltar
                </Typography>

            </Button>)}

            {mostrarBotaoVoltarCarregando && (
                <Skeleton width={110} height={60} />
            )}
        </Box>
    );
};