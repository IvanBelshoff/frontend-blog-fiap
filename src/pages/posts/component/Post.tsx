import { LayoutBaseDePagina } from '../../../shared/layouts'
import { CardPost, CustomPagination, FerramentasDaListagem } from '../../../shared/components'
import { useLoaderData, useNavigate, useNavigation, useSearchParams } from 'react-router-dom'
import { IPostLoader } from '../interfaces/interfaces';
import { useEffect, useMemo } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { Environment } from '../../../shared/environment';
import { useDebouncedCallback } from 'use-debounce';

export const Post = () => {

    //const { permissoes, regras } = useAuth();

    const loaderData = useLoaderData() as IPostLoader;
    const navigate = useNavigate();

    const navigation = useNavigation();
    const isLoading = navigation.state !== 'idle';

    const [searchParams, setSearchParams] = useSearchParams();

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const handleSearch = useDebouncedCallback((
        paramBusca: string = busca,
    ) => {
        setSearchParams({
            busca: paramBusca,
        }, { replace: true });
    }, Environment.TIME_DEBOUNCE);

    const handleSearchParams = (
        paramBusca: string = busca,
        paramPagina: string = pagina.toString(),
    ) => {
        setSearchParams({
            busca: paramBusca,
            pagina: paramPagina,
        }, { replace: true });
    };

    useEffect(() => {
        console.log(loaderData)
    }, [])

    return (
        <LayoutBaseDePagina
            titulo={'Gerenciar Posts'}
            barraDeFerramentas={
                <FerramentasDaListagem
                    textoBotaoNovo="novo"
                    mostrarInputBusca={true}
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => handleSearch(texto)}
                    disabledBotaoNovo={false} />
            }
        >

            {/*
             {(
                Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_PROFESSOR], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_CRIAR_POSTAGEM])
            ) ? (

                componentVerdadeiro
            ) : (
                componenteFalso
            )}
            */}


            {isLoading ? (
                <Box sx={{ marginLeft: 0.5, justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%' }}>
                    <CircularProgress size={130} />
                </Box>
            ) : (
                <Box width='100%' height='auto' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>

                    {loaderData?.data && loaderData?.totalCount > 0 ? (

                        <Grid container width='100%' spacing={2}  >

                            {loaderData.data.map(post => (
                                <Grid key={post.id} item xs={2} sm={3} md={4} lg={6} xl={12} >
                                    <CardPost
                                        key={post.id}
                                        conteudo={post.conteudo}
                                        data_atualizacao={post.data_atualizacao}
                                        data_criacao={post.data_criacao}
                                        capa={post.foto}
                                        titulo={post.titulo}
                                        usuario_atualizador={post.usuario_atualizador}
                                        usuario_cadastrador={post.usuario_cadastrador}
                                        aoCliclarNoCard={() => navigate(`/detalhes/${pagina}/${post.id}`)}
                                    />
                                </Grid>

                            ))
                            }
                        </Grid>
                    ) : (
                        <Typography variant="h5" component="div" color="textSecondary" align="center" style={{ width: '100%', marginTop: 20 }}>
                            Não existe posts
                        </Typography>
                    )}

                    <Box paddingLeft={1} marginTop={0.5} display='flex' justifyContent='center' alignItems='center' width='100%' >

                        {loaderData?.data && loaderData?.totalCount > 3 && (
                            <CustomPagination
                                totalExibido={loaderData.data.length}
                                totalPages={Math.ceil(loaderData.totalCount / Number(Environment.LIMITE_DE_POSTS))}
                                totalCount={loaderData.totalCount}
                                pagina={pagina}
                                aoSelecionarPagina={pagina => handleSearchParams(undefined, pagina)}
                                aoClicarEmKeyBoardArrowUp={() => handleSearchParams(undefined, `${pagina - 1}`)}
                                aoClicarEmKeyboardArrowDown={() => handleSearchParams(undefined, `${pagina + 1}`)}
                                aoClicarEmKeyboardDoubleArrowDown={() => handleSearchParams(undefined, `${Math.ceil(loaderData.totalCount / Number(Environment.LIMITE_DE_POSTS))}`)}
                                aoClicarEmKeyboardDoubleArrowUp={() => handleSearchParams(undefined, '1')}
                            />
                        )}
                    </Box>
                </Box>
            )}




        </LayoutBaseDePagina>
    )
}
