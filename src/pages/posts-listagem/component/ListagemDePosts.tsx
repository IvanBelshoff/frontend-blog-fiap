import { LayoutBaseDePagina } from "../../../shared/layouts";
import {
  CardPost,
  CustomPagination,
  FerramentasDaListagem,
} from "../../../shared/components";
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { IPostLoader } from "../interfaces/interfaces";
import { useMemo } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Environment } from "../../../shared/environment";
import { useDebouncedCallback } from "use-debounce";

export const ListagemDePosts = () => {
  const theme = useTheme();

  const loaderData = useLoaderData() as IPostLoader;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";
  const [searchParams, setSearchParams] = useSearchParams();

  const pagina = useMemo(
    () => Number(searchParams.get("pagina") || "1"),
    [searchParams]
  );
  const busca = useMemo(() => searchParams.get("busca") || "", [searchParams]);

  const handleSearch = useDebouncedCallback((paramBusca: string = busca) => {
    setSearchParams({ busca: paramBusca }, { replace: true });
  }, Environment.TIME_DEBOUNCE);

  const handleSearchParams = (
    paramBusca: string = busca,
    paramPagina: string = pagina.toString()
  ) => {
    setSearchParams(
      { busca: paramBusca, pagina: paramPagina },
      { replace: true }
    );
  };

  return (
    <LayoutBaseDePagina
      titulo={"Gerenciar Posts"}
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="novo"
          mostrarInputBusca={true}
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) => handleSearch(texto)}
          disabledBotaoNovo={false}
          aoClicarEmNovo={() => navigate("/blog/posts/novo")}
        />
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress size={130} />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowX: "hidden",
          }}
        >
          {loaderData?.data && loaderData?.totalCount > 0 ? (
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              sx={{ maxWidth: "100%", overflowX: "hidden" }}
            >
              {loaderData.data.map((post) => (
                <Grid key={post.id} item xs={12}>
                  <CardPost
                    key={post.id}
                    conteudo={post.conteudo}
                    data_atualizacao={post.data_atualizacao}
                    data_criacao={post.data_criacao}
                    capa_url={
                      post.foto?.url ||
                      `${Environment.BASE_URL}/profile/profile.jpg`
                    }
                    titulo={post.titulo}
                    usuario_atualizador={post.usuario_atualizador}
                    usuario_cadastrador={post.usuario_cadastrador}
                    aoCliclarNoCard={() =>
                      navigate(`/blog/posts/detalhes/${pagina}/${post.id}`)
                    }
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              variant="h5"
              component="div"
              color="textSecondary"
              align="center"
              sx={{ width: "100%", marginTop: 20 }}
            >
              Não existem posts
            </Typography>
          )}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: 0.5,
        }}
      >
        {loaderData?.data && loaderData?.totalCount > 3 && (
          <CustomPagination
            totalExibido={loaderData.data.length}
            totalPages={Math.ceil(
              loaderData.totalCount / Number(Environment.LIMITE_DE_POSTS)
            )}
            totalCount={loaderData.totalCount}
            pagina={pagina}
            aoSelecionarPagina={(pagina) =>
              handleSearchParams(undefined, pagina)
            }
            aoClicarEmKeyBoardArrowUp={() =>
              handleSearchParams(undefined, `${pagina - 1}`)
            }
            aoClicarEmKeyboardArrowDown={() =>
              handleSearchParams(undefined, `${pagina + 1}`)
            }
            aoClicarEmKeyboardDoubleArrowDown={() =>
              handleSearchParams(
                undefined,
                `${Math.ceil(
                  loaderData.totalCount / Number(Environment.LIMITE_DE_POSTS)
                )}`
              )
            }
            aoClicarEmKeyboardDoubleArrowUp={() =>
              handleSearchParams(undefined, "1")
            }
          />
        )}
      </Box>
    </LayoutBaseDePagina>
  );
};
