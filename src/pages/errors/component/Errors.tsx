import { useState } from 'react';
import {
    isRouteErrorResponse,
    useFetcher,
    useNavigate,
    useRouteError
} from 'react-router-dom';
import {
    Typography,
    Paper,
    Box,
    Icon,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { VscTypeHierarchySub } from 'react-icons/vsc';

import './styles.css';
import { useAuth } from '../../../shared/contexts';

// Componente funcional para renderizar a página de erro
export const Errors: React.FC = () => {

    // Utiliza um hook para realizar chamadas à API
    const fetcher = useFetcher();

    // Função de navegação
    const navigate = useNavigate();

    // Obtém o erro da rota, se houver
    const error = useRouteError();

    // Verifica se está ocorrendo o processo de logout
    const isLoading = fetcher.formData != null;

    const theme = useTheme();

    const xsOnly = useMediaQuery(theme.breakpoints.only('xs'));
    const smOnly = useMediaQuery(theme.breakpoints.only('sm'));
    const mdOnly = useMediaQuery(theme.breakpoints.only('md'));
    const lgOnly = useMediaQuery(theme.breakpoints.only('lg'));

    // Estado para controlar a abertura/fechamento do painel de detalhes
    const [open, setOpen] = useState<boolean>(false);

    // Obtém informações de autenticação
    const { isAuthenticated } = useAuth();

    // Manipula o estado de abertura/fechamento do painel de detalhes
    const handleOpenAccordion = () => {
        setOpen(!open);
    };

    return (
        <div className="account-user-error-container">
            <Paper elevation={3} sx={{ borderRadius: '16px', padding: 3 }} >
                <Box width='100%' display='flex' alignItems='center' justifyContent='center'>
                    {(isRouteErrorResponse(error) && error.status == 401) ? (
                        <Typography variant="h4" component="div" gutterBottom>
                            Oops! Parece que sua sessão expirou
                        </Typography>
                    ) : (isRouteErrorResponse(error) && error.status == 404) ? (
                        <Typography variant="h4" component="div" gutterBottom>
                            Oops! Parece que esta pagina não existe
                        </Typography>
                    ) : (
                        <Typography variant="h4" component="div" gutterBottom>
                            Oops! Ocorreu um erro inesperado
                        </Typography>
                    )}
                </Box>

                <Box paddingTop={2} display='flex' width='100%' flexDirection='column' justifyContent='center' alignItems='center' gap={2}>

                    <img src={'/assets/ilustrations/lupi-pensativo.png'} height='auto' width='30%' />

                </Box>

                {(isRouteErrorResponse(error) && error.status == 401) ? (
                    <Box paddingTop={3} width='100%' display='flex' flexDirection={xsOnly || smOnly || mdOnly || lgOnly ? 'row' : 'column'} justifyContent='center' alignItems='center' gap={2}>

                        <fetcher.Form method="post" action="/logout">
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={isLoading}
                                type='submit'
                                startIcon={<Icon>logout</Icon>}
                            >
                                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                    Sair da Aplicação
                                </Typography>
                            </Button>
                        </fetcher.Form>

                        <Box width={xsOnly || smOnly || mdOnly || lgOnly ? 'auto' : '100%'} height={xsOnly || smOnly || mdOnly || lgOnly ? '4rem' : 'auto'}   >
                            <Divider variant='middle' orientation={xsOnly || smOnly || mdOnly || lgOnly ? 'vertical' : 'horizontal'} />
                        </Box>

                        <Box width='100%' >

                            <Accordion elevation={3} expanded={open} onChange={handleOpenAccordion}>
                                <AccordionSummary
                                    expandIcon={<Icon>expand_more</Icon>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"

                                >
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Visualizar detalhes:
                                    </Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box width='100%' display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={{ border: `2px solid ${theme.palette.primary.main}`, borderRadius: '16px' }}>

                                        {error.data?.message && (
                                            <Typography variant="h6" gutterBottom>
                                                Mensagem de erro: {error.data.message}
                                            </Typography>
                                        )}
                                        <Typography variant="h6" gutterBottom>
                                            Status: {error.status}
                                        </Typography>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Box>
                ) : (isRouteErrorResponse(error) && error.status == 404) ? (

                    <Box paddingTop={3} width='100%' display='flex' flexDirection={xsOnly || smOnly || mdOnly || lgOnly ? 'row' : 'column'} justifyContent='center' alignItems='center' gap={2}>

                        <Box width='auto' display='flex' justifyContent='center' alignItems='center' gap={3}>

                            {isAuthenticated ? (
                                <Box width='100%' gap={2} display='flex' flexDirection={xsOnly || smOnly || mdOnly || lgOnly ? 'column' : 'row'} justifyContent='center' alignItems='center' >

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disabled={isLoading}
                                        onClick={() => navigate('/blog')}
                                        startIcon={<Icon>home</Icon>}
                                    >
                                        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                            Voltar para home
                                        </Typography>
                                    </Button>

                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        disabled={isLoading}
                                        onClick={() => navigate('/')}
                                        startIcon={<Icon><VscTypeHierarchySub /></Icon>}
                                    >
                                        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                            Ir para blog
                                        </Typography>
                                    </Button>

                                    <fetcher.Form method="post" action="/logout">
                                        <Button
                                            variant={isAuthenticated ? 'outlined' : 'contained'}
                                            color='primary'
                                            disabled={isLoading}
                                            type='submit'
                                            startIcon={<Icon>logout</Icon>}
                                        >
                                            <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                                Sair da Aplicação
                                            </Typography>
                                        </Button>
                                    </fetcher.Form>

                                </Box>

                            ) : (

                                <Box width='100%' gap={2} display='flex' flexDirection={xsOnly || smOnly || mdOnly || lgOnly ? 'column' : 'row'} justifyContent='center' alignItems='center' >

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disabled={isLoading}
                                        onClick={() => navigate('/')}
                                        startIcon={<Icon><VscTypeHierarchySub /></Icon>}
                                    >
                                        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                            Voltar para blog
                                        </Typography>
                                    </Button>

                                    <Button
                                        variant={'outlined'}
                                        color='primary'
                                        disabled={isLoading}
                                        onClick={() => navigate('/login')}
                                        startIcon={<Icon>meeting_room</Icon>}
                                    >
                                        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                           Ir para tela de login
                                        </Typography>
                                    </Button>
                                </Box>
                            )}
                        </Box>

                        <Box width={xsOnly || smOnly || mdOnly || lgOnly ? 'auto' : '100%'} height={xsOnly || smOnly || mdOnly || lgOnly ? '6rem' : 'auto'}   >
                            <Divider variant='middle' orientation={xsOnly || smOnly || mdOnly || lgOnly ? 'vertical' : 'horizontal'} />
                        </Box>

                        <Box width='100%' display='flex' flexDirection='column' justifyContent='center'>

                            <Accordion elevation={3} expanded={open} onChange={handleOpenAccordion}>
                                <AccordionSummary
                                    expandIcon={<Icon>expand_more</Icon>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Visualizar detalhes:
                                    </Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box width='100%' display='flex' padding={1} justifyContent='center' alignItems='center' flexDirection='column' sx={{ border: `2px solid ${theme.palette.primary.main}`, borderRadius: '15px' }}>

                                        <Typography variant="h6" gutterBottom textAlign={'center'}>
                                            Mensagem de erro: Não encontrado
                                        </Typography>

                                        <Typography variant="h6" gutterBottom>
                                            Status: {error.status}
                                        </Typography>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                        </Box>

                    </Box>
                ) : (
                    <Box paddingTop={3} width='100%' display='flex' flexDirection={xsOnly || smOnly || mdOnly || lgOnly ? 'row' : 'column'} justifyContent='center' alignItems='center' gap={2}>

                        <Box width='auto' display='flex' flexDirection={xsOnly || smOnly || mdOnly || lgOnly ? 'column' : 'row'} justifyContent='center' alignItems='center' gap={2}>

                            {isAuthenticated ? (
                                <Box width='100%' gap={2} display='flex' flexDirection={xsOnly || smOnly || mdOnly || lgOnly ? 'column' : 'row'} justifyContent='center' alignItems='center' >

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disabled={isLoading}
                                        onClick={() => navigate('/blog')}
                                        startIcon={<Icon>home</Icon>}
                                    >
                                        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                            Ir para home
                                        </Typography>
                                    </Button>

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disabled={isLoading}
                                        onClick={() => navigate('/')}
                                        startIcon={<Icon><VscTypeHierarchySub /></Icon>}
                                    >
                                        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                            Ir para blog
                                        </Typography>
                                    </Button>

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disabled={isLoading}
                                        onClick={() => window.location.reload()}
                                        startIcon={<Icon>refresh</Icon>}
                                    >
                                        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                            Tentar Novamente
                                        </Typography>
                                    </Button>

                                    <fetcher.Form method="post" action="/logout">
                                        <Button
                                            variant={'outlined'}
                                            color='primary'
                                            disabled={isLoading}
                                            type='submit'
                                            startIcon={<Icon>logout</Icon>}
                                        >
                                            <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                                Sair da Aplicação
                                            </Typography>
                                        </Button>
                                    </fetcher.Form>

                                </Box>
                            ) : (
                                <Box width='100%' gap={2} display='flex' flexDirection={xsOnly || smOnly || mdOnly || lgOnly ? 'column' : 'row'} justifyContent='center' alignItems='center' >

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disabled={isLoading}
                                        onClick={() => window.location.reload()}
                                        startIcon={<Icon>refresh</Icon>}
                                    >
                                        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                            Tentar Novamente
                                        </Typography>
                                    </Button>

                                </Box>
                            )}


                        </Box>

                        <Box width={xsOnly || smOnly || mdOnly || lgOnly ? 'auto' : '100%'} height={xsOnly || smOnly || mdOnly || lgOnly ? '6rem' : 'auto'}   >
                            <Divider variant='middle' orientation={xsOnly || smOnly || mdOnly || lgOnly ? 'vertical' : 'horizontal'} />
                        </Box>

                        <Box width='100%' display='flex' flexDirection='column' justifyContent='center'>

                            <Accordion elevation={3} expanded={open} onChange={handleOpenAccordion}>
                                <AccordionSummary
                                    expandIcon={<Icon>expand_more</Icon>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"

                                >
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Visualizar detalhes:
                                    </Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    {isRouteErrorResponse(error) ? (
                                        <Box width='100%' display='flex' padding={1} justifyContent='center' alignItems='center' flexDirection='column' sx={{ border: `2px solid ${theme.palette.primary.main}`, borderRadius: '16px' }}>

                                            {error.data?.message ? (
                                                <Typography variant="h6" gutterBottom>
                                                    Mensagem: {error.data.message}
                                                </Typography>
                                            ) : (
                                                <Typography variant="h6" gutterBottom>
                                                    Mensagem: Erro Interno do Servidor
                                                </Typography>
                                            )}

                                            <Typography variant="h6" gutterBottom>
                                                Status: {error.status}
                                            </Typography>

                                        </Box>
                                    ) : (
                                        <Box width='100%' display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={{ border: `2px solid ${theme.palette.primary.main}`, borderRadius: '16px' }}>

                                            <Typography variant="h6" gutterBottom>
                                                Mensagem: Não encontrado
                                            </Typography>

                                            <Typography variant="h6" gutterBottom>
                                                Status: 500
                                            </Typography>

                                        </Box>
                                    )}

                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Box>
                )}
            </Paper>
        </div >
    );
};
