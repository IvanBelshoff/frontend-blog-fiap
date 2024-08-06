import {
    Box,
    Button,
    Icon,
    Paper,
    TextField,
    ThemeProvider,
    Typography,
    useTheme
} from '@mui/material';

import { Environment } from '../../../environment';
import { LightInputsTheme } from '../../../themes/LightInputs';
import { DarkInputsTheme } from '../../../themes/DarkInputs';
import { IFerramentasDaListagemProps } from '../../../interfaces';

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    aoMudarTextoDeBusca,
    mostrarInputBusca = false,
    textoDaBusca = '',
    aoClicarEmNovo,
    aoClicarEmVoltar,
    mostrarBotaoNovo = true,
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
            display='flex'
            alignItems='center'
            height={theme.spacing(7)}
            component={Paper}
        >
            {mostrarInputBusca && (
                <ThemeProvider theme={theme.palette.mode == 'light' ? LightInputsTheme : DarkInputsTheme}>
                    <TextField
                        size='small'
                        id="outlined-search"
                        type="search"
                        value={textoDaBusca}
                        onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                        placeholder={Environment.INPUT_DE_BUSCA}
                    />
                </ThemeProvider>


            )}

            {!mostrarBotaoVoltar && mostrarBotaoNovo ? (
                <Box flex={1} display='flex' justifyContent='end'>
                    {mostrarBotaoNovo && (
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                            onClick={aoClicarEmNovo}
                            endIcon={<Icon>add</Icon>}
                        >
                            {textoBotaoNovo}</Button>
                    )}

                </Box>
            ) :
                (
                    <Box flex={1} display='flex' justifyContent='end'>
                        {mostrarBotaoVoltar && (
                            <Button
                                variant='contained'
                                color='primary'
                                disableElevation
                                onClick={aoClicarEmVoltar}
                                endIcon={<Icon>arrow_back</Icon>}
                            >
                                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                    Voltar
                                </Typography></Button>
                        )}

                    </Box>
                )
            }

        </Box>
    );
};