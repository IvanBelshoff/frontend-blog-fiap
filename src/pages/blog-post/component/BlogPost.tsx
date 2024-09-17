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
import { IBlogPostLoader } from "../interfaces/interfaces";

export const BlogPost = () => {
  const loaderData = useLoaderData() as IBlogPostLoader;
  const { pagina } = useParams<"pagina">();
  const { id, titulo, conteudo, usuario_cadastrador, data_atualizacao, foto } =
    loaderData.post;

  return (
    <LayoutBase>
      <Box
        width="100%"
        height="auto"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={2}
      >
        <Box
          width="100%"
          maxWidth="900px"
          height="auto"
          sx={{
            padding: 2,
            boxSizing: 'border-box',
          }}
        >
          {/* Breadcrumbs */}
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ marginBottom: 2, marginTop: 2 }}
          >
            <Link style={{ color: "inherit" }} to={`/?busca=&pagina=${pagina}`}>
              <Typography color="text.primary" variant="body1">
                Posts
              </Typography>
            </Link>
            <Typography color="text.primary" variant="body1">
              {titulo}
            </Typography>
          </Breadcrumbs>

          {/* Post Details */}
          <Card sx={{ marginBottom: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {foto && (
                <CardMedia
                  sx={{
                    width: "100%",
                    maxWidth: '100%',
                    height: "auto",
                    maxHeight: 'auto',
                    objectFit: "cover",
                    marginTop: 2,
                    borderRadius: 1,
                  }}
                  component="img"
                  image={foto.url}
                  alt={foto.nome}
                />
              )}
            </Box>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                padding: 2,
              }}
            >
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                }}
              >
                {titulo}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                }}
              >
                {conteudo}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                }}
              >
                Autor: {usuario_cadastrador}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' },
                }}
              >
                Última atualização: {new Date(data_atualizacao).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </LayoutBase>
  );
};
