import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import { IBlogLoader } from '../interfaces/interfaces';
import { useEffect, useMemo } from 'react';
import { CardPost, CustomPagination, useNavbar } from '../../../shared/components';
import { LayoutBase } from '../../../shared/layouts';
import { Environment } from '../../../shared/environment';

export const Blog = () => {
  const { busca: BuscaNav, data, totalCount } = useNavbar();

  const loaderData: IBlogLoader = { data: data, totalCount: totalCount };

  const navigation = useNavigation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const isLoading = navigation.state !== 'idle';

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

    if (BuscaNav) {
      handleSearchParams(BuscaNav);
    }
    if (!BuscaNav) {
      handleSearchParams('');
    }
  }, [BuscaNav]);

  return (
    <LayoutBase
      pagination={
        <Box marginTop={0.5} display='flex' justifyContent='center' alignItems='center' width='100%' >

          {loaderData?.data && loaderData?.totalCount > 2 && (
            <CustomPagination
              totalExibido={loaderData.data.length}
              totalPages={Math.ceil(loaderData.totalCount / Number(Environment.LIMITE_DE_POSTS))}
              totalCount={loaderData.totalCount}
              pagina={pagina}
              aoSelecionarPagina={pagina => handleSearchParams(undefined, pagina)}
              aoClicarEmKeyBoardArrowUp={() => handleSearchParams(undefined, `${pagina - 1}`)}
              aoClicarEmKeyboardArrowDown={() => handleSearchParams(undefined, `${pagina + 1}`)}
              aoClicarEmKeyboardDoubleArrowDown={() => handleSearchParams(undefined, `${Math.ceil(loaderData.totalCount / Number(Environment.LIMITE_DE_LINHAS_TABLE_FUNCIONARIOS))}`)}
              aoClicarEmKeyboardDoubleArrowUp={() => handleSearchParams(undefined, '1')}
            />
          )}

        </Box>
      }
    >
      <Box width='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        {isLoading ? (
          <Box sx={{ marginLeft: 0.5, justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%' }}>
            <CircularProgress size={130} />
          </Box>
        ) : (
          <Box width='100%' height='auto' display='flex' justifyContent='center' alignItems='center'>
            <Box width='60%' height='auto' display='flex' justifyContent='center' alignItems='center'>

              {loaderData?.data && loaderData?.totalCount > 0 ? (

                <Grid container width='100%' marginTop={1} spacing={2}  >

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

            </Box>
          </Box>
        )}


      </Box>

    </LayoutBase>
  );
}

