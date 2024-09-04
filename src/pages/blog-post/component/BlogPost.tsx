import {
    Box,
    Breadcrumbs,
    Card,
    CardContent,
    Typography,
    CardMedia,
    Button,
    Icon,
  } from "@mui/material";
  import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
  import { LayoutBase } from "../../../shared/layouts";
  import { PostsService } from "../../../shared/services/Posts/postsService";
import { IBlogPostLoader } from "../interfaces/interfaces";
  
  export const BlogPost = () => {
    const loaderData = useLoaderData() as IBlogPostLoader;
    const { pagina } = useParams<"pagina">();
    const { id, titulo, conteudo, usuario_cadastrador, data_atualizacao, foto } =
      loaderData.post;
    const navigate = useNavigate();

    return (
      <LayoutBase>
        <Box
          width="100%"
          height="auto"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="60%" height="auto">
            {/* Breadcrumbs */}
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{ marginBottom: 2, marginTop: 2 }}
            >
              <Link style={{ color: "inherit" }} to={`/?busca=&pagina=${pagina}`}>
                <Typography color="text.primary">Posts</Typography>
              </Link>
              <Typography color="text.primary">{titulo}</Typography>
            </Breadcrumbs>
  
            {/* Post Details */}
            <Card sx={{ marginBottom: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                {foto && (
                  <CardMedia
                    sx={{
                      width: "100%",
                      maxWidth: 400,
                      height: "auto",
                      objectFit: "cover",
                      marginTop: 5
                    }}
                    component="img"
                    height="auto"
                    image={foto.url}
                    alt={foto.nome}
                  />
                )}
              </Box>
              <CardContent sx={{ display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center" }}>
                <Typography variant="h4" component="div" gutterBottom>
                  {titulo}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {conteudo}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Autor: {usuario_cadastrador}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Última atualização:{" "}
                  {new Date(data_atualizacao).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          {loaderData.logado && (
            <Box display="flex" gap="10px">
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => {
                  navigate(`/blog/posts/edit/${pagina}/${id}`); //temporario, alterar para tela de edicao que precisa ser criada
                }}
                endIcon={<Icon>edit</Icon>}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => {
                  PostsService.deleteById(id);
                }}
                endIcon={<Icon>delete</Icon>}
              >
                Deletar
              </Button>
            </Box>
          )}
        </Box>
      </LayoutBase>
    );
  };
  