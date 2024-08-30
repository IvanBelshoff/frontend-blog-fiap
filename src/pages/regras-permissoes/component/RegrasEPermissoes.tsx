import {
    useEffect,
    useRef,
    useState
} from 'react';
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigate,
    useNavigation,
    useParams
} from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    Icon,
    Paper,
    Snackbar,
    Typography
} from '@mui/material';

import { IRegra } from '../../../shared/interfaces';
import {
    FerramentasDeDetalhes,
    RegrasAccordions,
    StatusDeRolagem
} from '../../../shared/components';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import {
    IRegrasEPermissoesAction,
    IRegrasEPermissoesLoader
} from '../interfaces/interfaces';
import { useAuth } from '../../../shared/contexts';

export const RegrasEPermissoes = () => {

    const actionData = useActionData() as IRegrasEPermissoesAction;
    const loaderData = useLoaderData() as IRegrasEPermissoesLoader;
    const navigate = useNavigate();
    const navigation = useNavigation();

    const { pagina } = useParams<'pagina'>();

    const tipos = ['professor', 'usuario'];

    const { userId } = useAuth();

    const isLoading = navigation.formData != null;

    const etapasRefProfessor = useRef<HTMLDivElement>(null);
    const etapasRefUsuario = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [messageSnackbar, setMessageSnackbar] = useState<string>('');
    const [expanded, setExpanded] = useState<string | undefined>(undefined);
    const [typeSeverity, setTypeSeverity] = useState<'success' | 'error'>('success');
    const [regras, setRegras] = useState<IRegra[]>([]);
    const [checkboxStateRegras, setCheckboxStateRegras] = useState<number[]>([]);
    const [checkboxStatePermissoes, setCheckboxStatePermissoes] = useState<number[]>([]);

    const handleCheckboxChangeRegras = (ids: number[]) => {
        setCheckboxStateRegras(ids);
    };

    const HandleRef = (tipo: 'professor' | 'usuario') => {

        if (tipo == 'professor') {
            etapasRefProfessor.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            etapasRefUsuario.current?.scrollIntoView({ behavior: 'smooth' });
        }

    };

    const HandleRegraClicada = (regra: string, tipo: 'professor' | 'usuario') => {

        if (tipo == 'professor') {
            etapasRefProfessor.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            etapasRefUsuario.current?.scrollIntoView({ behavior: 'smooth' });
        }

        setExpanded(regra);

    };

    const handleFindRuleByIdsPermissions = (regras: IRegra[], ids: number[]): number[] => {

        const regrasEncontradas: Map<number, IRegra> = new Map();

        for (const id of ids) {
            for (const regra of regras) {
                for (const permissao of regra.permissao) {
                    if (permissao.id === id) {
                        regrasEncontradas.set(regra.id, regra);
                        break;
                    }
                }
            }
        }

        return Array.from(regrasEncontradas.values()).map((regra) => regra.id);

    };

    const handleCheckboxChangePermissoes = (ids: number[]) => {

        setCheckboxStatePermissoes(() => ids);

        const regrasChecadas = handleFindRuleByIdsPermissions(regras, ids);

        if (!regrasChecadas.every(regra => checkboxStateRegras.includes(regra))) {

            const regrasFaltando = regrasChecadas.filter(regra => !checkboxStateRegras.includes(regra));

            setCheckboxStateRegras([...checkboxStateRegras, ...regrasFaltando]);

        }

    };

    const handleCloseSnackbar = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setMessageSnackbar('');

    };

    useEffect(() => {

        if (actionData?.success?.message) {
            setMessageSnackbar(actionData.success.message);
            setOpen(true);
            setTypeSeverity('success');
        }

        if (actionData?.errors?.default) {
            setMessageSnackbar(actionData.errors.default);
            setOpen(true);
            setTypeSeverity('error');
        }

        if (loaderData?.regras) {
            setRegras(loaderData.regras);
        }

        if (loaderData?.regrasUsuario) {

            // Extrai os ids das regras
            const idsRegras = loaderData.regrasUsuario.map(regra => regra.id);
            const idsPermissoes = loaderData.regrasUsuario.map(regra => regra.permissao.map(permissao => permissao.id)).flat();
            // Configura os ids em setCheckboxStateRegras
            setCheckboxStateRegras(idsRegras);
            setCheckboxStatePermissoes(idsPermissoes);
        }


    }, [actionData, loaderData]);

    return (
        <LayoutBaseDePagina
            titulo={`Permissões - ${loaderData?.usuario?.nome} ${loaderData?.usuario?.sobrenome}`}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    mostrarBotaoApagar={false}
                    mostrarBotaoNovo={false}
                    aoClicarEmVoltar={() => navigate(`/blog/usuarios?busca=&pagina=${pagina}`)}
                    salvar={
                        <Form method="PATCH" replace >

                            {checkboxStateRegras.map((regra) => (
                                <input key={regra} type="hidden" name="regras" value={regra} />
                            ))}

                            {checkboxStatePermissoes.map((permissao) => (
                                <input key={permissao} type="hidden" name="permissoes" value={permissao} />
                            ))}

                            <Button
                                variant='contained'
                                disableElevation
                                disabled={isLoading || loaderData?.usuario?.bloqueado == true || Number(userId) == loaderData?.usuario?.id}
                                type='submit'
                                startIcon={<Icon>save</Icon>}
                                color='primary'
                            >

                                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                    Salvar
                                </Typography>

                            </Button>
                        </Form>
                    } />
            }
        >

            {isLoading ? (
                <Box sx={{ marginLeft: 0.5, justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%' }}>
                    <CircularProgress size={130} />
                </Box>
            ) : (
                <Box width='100%' height='100%' gap={1} display='flex'>

                    <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert onClose={handleCloseSnackbar} severity={typeSeverity} sx={{ width: '100%' }}>
                            {messageSnackbar}
                        </Alert>
                    </Snackbar>

                    <Box
                        width='30%'
                        marginLeft={1}
                        marginBottom={1}
                        display='flex'
                        flexDirection='column'
                        position='sticky'
                        top={0}
                        overflow="auto"
                        height="auto"  // Definindo a altura como 100% da altura da viewport
                        zIndex={100}
                    >

                        <Box
                            width="100%"
                            display="flex"
                            flexDirection={'column'}
                            padding={1}
                            justifyContent="center"
                            alignItems="initial"
                            component={Paper}
                            variant="outlined">

                            <Grid container spacing={1}>

                                {tipos.map((tipo, index) => (

                                    <Grid key={index} item xs={12}>
                                        <StatusDeRolagem
                                            regras={loaderData?.regras || []}
                                            aoClicarEmTipoRegra={HandleRef}
                                            aoClicarEmTipoPermissao={HandleRegraClicada}
                                            regrasUsuario={loaderData?.regrasUsuario || []}
                                            tipo={tipo as 'professor' | 'usuario'}
                                        />

                                    </Grid>
                                ))}

                            </Grid>


                        </Box>

                    </Box>

                    <Box
                        width='70%'
                        marginRight={1}
                        marginBottom={1}
                        display='flex'
                        flexDirection='column'
                        overflow="auto"
                    >

                        <Grid container spacing={1}>

                            {tipos.map((tipo, index) => (

                                <Grid key={index} item xs={12}>

                                    <RegrasAccordions
                                        key={index}
                                        expandedRegra={expanded}
                                        refProfessor={etapasRefProfessor}
                                        refUsuario={etapasRefUsuario}
                                        regras={regras}
                                        idsRegras={checkboxStateRegras}
                                        idsPermissoes={checkboxStatePermissoes}
                                        aoMarcarRegras={handleCheckboxChangeRegras}
                                        aoMarcarPermissoes={handleCheckboxChangePermissoes}
                                        tipo={tipo as 'professor' | 'usuario'}
                                        disabledRegra={loaderData?.usuario?.bloqueado == true || Number(userId) == loaderData?.usuario?.id}
                                        disabledPermissao={loaderData?.usuario?.bloqueado == true || Number(userId) == loaderData?.usuario?.id} />

                                </Grid>
                            ))}

                        </Grid>
                    </Box>
                </Box>

            )}


        </LayoutBaseDePagina >


    );
};
