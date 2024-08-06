import { AppBar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Toolbar, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { IBlogLoader } from '../interfaces/interfaces';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IFoto } from '../../../shared/interfaces';

interface IPostProps {
    capa: IFoto;
    titulo: string;
    conteudo: string;
    usuario_cadastrador: string;
    usuario_atualizador: string;
    data_criacao: Date;
    data_atualizacao: Date;
    mode?: 'default' | 'large';
  }
  
  export const Post: React.FC<IPostProps> = ({
    conteudo,
    data_atualizacao,
    data_criacao,
    capa,
    titulo,
    usuario_atualizador,
    usuario_cadastrador,
    mode = 'default',
  }) => {

    const [viewMode, setViewMode] = useState<'default' | 'large'>(mode);
  
    const handlePostClick = () => {
      console.log('Post clicado');
    };
  
    const toggleViewMode = () => {
      setViewMode((prevMode) => (prevMode === 'default' ? 'large' : 'default'));
    };
  
    return (
      <Card sx={{ maxWidth: viewMode === 'large' ? '100%' : 345, margin: 'auto', mt: 4, display: 'flex', flexDirection: viewMode === 'large' ? 'row' : 'column' }}>
        <CardActionArea sx={{ display: 'flex', flexDirection: viewMode === 'large' ? 'row' : 'column' }}>
          <CardMedia
            component="img"
            height={viewMode === 'large' ? '100%' : capa.height}
            image={capa.url}
            sx={{ width: viewMode === 'large' ? '30%' : '100%', objectFit: 'cover' }}
            alt={titulo}
          />
          <CardContent sx={{ flex: '1' }}>
            <Typography gutterBottom variant="h5" component="div">
              {titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {conteudo.substring(0, 100)}...
            </Typography>
            <Box mt={2}>
              <Typography variant="caption" color="text.secondary">
                Criado por: {usuario_cadastrador} em {format(new Date(data_criacao), 'yyyy-MM-dd')}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Atualizado por: {usuario_atualizador} em {format(new Date(data_atualizacao), 'yyyy-MM-dd')}
              </Typography>
            </Box>
            <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={handlePostClick}>
                Ver Detalhes
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" color="secondary" onClick={toggleViewMode}>
            Alternar Visualização
          </Button>
        </Box>
      </Card>
    );
  };
  

export const Blog = () => {
    const loaderData = useLoaderData() as IBlogLoader;

    useEffect(() => {
        console.log(loaderData);
    }, []);



    return (
        <Box>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                {loaderData.data && loaderData.data.map((post) => (
                    <Post
                        key={post.id}
                        conteudo={post.conteudo}
                        data_atualizacao={post.data_atualizacao}
                        data_criacao={post.data_criacao}
                        capa={post.foto}
                        titulo={post.titulo}
                        usuario_atualizador={post.usuario_atualizador}
                        usuario_cadastrador={post.usuario_cadastrador}
                    />
                ))}
            </Box>


        </Box>

    );
}

