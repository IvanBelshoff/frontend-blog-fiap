import { AxiosError } from 'axios';
import {
    LoaderFunctionArgs,
    json
} from 'react-router-dom';

import { Environment } from '../../../shared/environment';
import { PostsService } from '../../../shared/services';
import { IBlogLoader, ILoaderBlog } from '../interfaces/interfaces';

export async function LoaderBlog({ request }: LoaderFunctionArgs) {

    // Verificação se o usuário está logado
    const logado = Boolean(JSON.parse(localStorage.getItem('token') || '""'));

    // Obtendo parâmetros da URL da requisição
    const url = new URL(request.url);
    const busca = url.searchParams.get('busca') || '';
    const page = url.searchParams.get('pagina') || '';

    // Chamando serviço para obter lista de usuários
    const posts = await PostsService.getAll(
        page ? page : '1',
        busca && busca,
        Environment.LIMITE_DE_LINHAS_TABLE_FUNCIONARIOS
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