import { AppBar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Toolbar, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { IBlogLoader } from '../interfaces/interfaces';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IFoto } from '../../../shared/interfaces';
import { CardPost } from '../../../shared/components';


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

      <Box width='100%' height='auto' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>

        <Box width='40%' height='auto' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>

          <Grid container width='100%' spacing={1}  >
            {loaderData.data && loaderData.data.map((post) => (

              <Grid xs={12}>
                <CardPost
                  key={post.id}
                  conteudo={post.conteudo}
                  data_atualizacao={post.data_atualizacao}
                  data_criacao={post.data_criacao}
                  capa={post.foto}
                  titulo={post.titulo}
                  usuario_atualizador={post.usuario_atualizador}
                  usuario_cadastrador={post.usuario_cadastrador}
                />

              </Grid>
            ))}


          </Grid>
        </Box>


      </Box>


    </Box>

  );
}

