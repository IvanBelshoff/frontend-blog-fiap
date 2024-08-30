import { AxiosError } from 'axios';
import {
    LoaderFunctionArgs,
    json
} from 'react-router-dom';

import { Environment } from '../../../shared/environment';
import { PostsService, UsuariosService } from '../../../shared/services';
import { IBlogLoader, ILoaderBlog } from '../interfaces/interfaces';

export async function LoaderBlog({ request }: LoaderFunctionArgs) {

    // Verificação se o usuário está logado
    const logado = Boolean(JSON.parse(localStorage.getItem('token') || '""'));

    const userId = Number(JSON.parse(localStorage.getItem('userId') || '""'));

    // Obtendo parâmetros da URL da requisição
    const url = new URL(request.url);
    const busca = url.searchParams.get('busca') || '';
    const page = url.searchParams.get('pagina') || '';

    if (logado && userId) {

        // Chama o serviço para obter informações do usuário com base no ID
        const usuario = await UsuariosService.getById(userId);

        // Verifica se ocorreu um erro durante a solicitação
        if (usuario instanceof AxiosError) {

            // Extrai mensagens de erro do objeto de resposta
            const errors = (usuario as ILoaderBlog).response?.data.errors;

            // Manipulação de erros específicos
            if ((usuario.response?.status == 401 || usuario.response?.status == 500) && logado == true) {
                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: usuario.response?.status || 500 }
                );
            }

            // Retorno dos erros
            return {
                errors: errors
            };

        }

        // Chamando serviço para obter lista de posts
        const posts = await PostsService.getAll(
            page ? page : '1',
            busca && busca,
            Environment.LIMITE_DE_POSTS
        );

        // Tratando erros de requisição
        if (posts instanceof AxiosError) {

            // Obtendo mensagem de erro da resposta
            const errors = (posts as ILoaderBlog).response?.data.errors;

            // Manipulação de erros específicos
            if ((posts.response?.status == 401 || posts.response?.status == 500) && logado == true) {
                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: posts.response?.status || 500 }
                );
            }

            // Retorno dos erros
            return {
                errors: errors
            };

        }

        // Construção do objeto de dados a ser retornado
        const data: IBlogLoader = {
            data: posts.data,
            totalCount: posts.totalCount,
            usuario: usuario
        };

        // Retorno dos dados
        return data;

    } else {

        // Chamando serviço para obter lista de posts
        const posts = await PostsService.getAll(
            page ? page : '1',
            busca && busca,
            Environment.LIMITE_DE_POSTS
        );

        // Tratando erros de requisição
        if (posts instanceof AxiosError) {

            // Obtendo mensagem de erro da resposta
            const errors = (posts as ILoaderBlog).response?.data.errors;

            // Manipulação de erros específicos
            if ((posts.response?.status == 401 || posts.response?.status == 500) && logado == true) {
                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: posts.response?.status || 500 }
                );
            }

            // Retorno dos erros
            return {
                errors: errors
            };

        }

        // Construção do objeto de dados a ser retornado
        const data: IBlogLoader = {
            data: posts.data,
            totalCount: posts.totalCount,
        };

        // Retorno dos dados
        return data;
    }


}