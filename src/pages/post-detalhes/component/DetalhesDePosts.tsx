import { Box, Breadcrumbs, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Link, useLoaderData, useParams, } from "react-router-dom";
import { IDetalhesDePostLoader } from "../interfaces/interfaces";
import { LayoutBase } from "../../../shared/layouts";

export const DetalhesDePosts = () => {
    const loaderData = useLoaderData() as IDetalhesDePostLoader;
    const { pagina } = useParams<'pagina'>();
    const { titulo, conteudo, usuario_cadastrador, data_atualizacao, foto } = loaderData.post;
    console.log(loaderData.logado)
    return (
        <LayoutBase>
            <Box width='100%' height='auto' display='flex' justifyContent='center' alignItems='center'>
                <Box width='60%' height='auto'>
                    {/* Breadcrumbs */}
                    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2, marginTop: 2 }}>
                        <Link style={{ color: "inherit", }} to={`/?busca=&pagina=${pagina}`}>
                            <Typography color="text.primary">Posts</Typography>
                        </Link>
                        <Typography color="text.primary">{titulo}</Typography>
                    </Breadcrumbs>

                    {/* Post Details */}
                    <Card sx={{ marginBottom: 2 }}>
                        {foto && (
                            <CardMedia
                                component="img"
                                height="auto"
                                image={foto.url}
                                alt={foto.nome} />
                        )}
                        <CardContent>
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
                                Última atualização: {new Date(data_atualizacao).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                    </Card>
                    
                </Box>
            </Box>
        </LayoutBase>
    );
};
