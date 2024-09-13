import {
    Box,
    Button,
    Divider,
    Icon,
    Paper,
    TextField,
    Typography,
    useTheme
} from '@mui/material';

import { Environment } from '../../../environment';
import { IFerramentasDaListagemProps } from '../interfaces/interfaces';


export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    aoMudarTextoDeBusca,
    mostrarInputBusca = false,
    textoDaBusca = '',
    mostrarFavoritos = false,
    aoClicarEmNovo,
    aoClicarEmVoltar,
    mostrarBotaoNovo = true,
    disabledBotaoNovo,
    mostrarBotaoLogin = false,
    aoClicarEmLogin,
    mostrarBotaoVoltar = false,
    textoBotaoNovo = 'Novo'
}) => {

    // Hook para obter o tema atual do Material-UI
    const theme = useTheme();

    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            overflow={'auto'}
            display='flex'
            alignItems='center'
            height={theme.spacing(7)}
            component={Paper}
        >
            {mostrarInputBusca && (

                <>
                    {mostrarBotaoVoltar && (
                        <>
                            <Button
                                variant='outlined'
                                color='primary'
                                disableElevation
                                onClick={aoClicarEmVoltar}
                                endIcon={<Icon>arrow_back</Icon>}
                            >
                                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                    Voltar
                                </Typography>
                            </Button>
                            <Divider variant='middle' orientation='vertical' />
                        </>
                    )}

                    <TextField
                        size='small'
                        id="outlined-search"
                        type="search"
                        defaultValue={textoDaBusca}
                        onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                        placeholder={Environment.INPUT_DE_BUSCA}
                    />

                </>
            )}

            <Box flex={1} display='flex' justifyContent='end'>

                {mostrarFavoritos && (
                    mostrarFavoritos
                )}

                {mostrarBotaoNovo && (
                    <Button
                        variant='contained'
                        color='primary'
                        disableElevation
                        disabled={disabledBotaoNovo}
                        onClick={aoClicarEmNovo}
                        endIcon={<Icon>add</Icon>}
                    >
                        {textoBotaoNovo}</Button>
                )}


                {mostrarBotaoLogin && (
                    <Button
                        variant='contained'
                        color='primary'
                        disableElevation
                        onClick={aoClicarEmLogin}
                        startIcon={<Icon>meeting_room</Icon>}
                    >
                        Entrar</Button>
                )}
            </Box>

        </Box>
    );
};