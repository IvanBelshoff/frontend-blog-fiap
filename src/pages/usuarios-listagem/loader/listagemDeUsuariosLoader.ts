import { AxiosError } from 'axios';
import {
    LoaderFunctionArgs,
    json
} from 'react-router-dom';

import { Environment } from '../../../shared/environment';
import {
    IListagemDeUsuarios,
    IResponseLoaderListagemDeUsuarios
} from '../../../shared/interfaces';
import { UsuariosService } from '../../../shared/services';

export async function ListagemDeUsuariosLoader({ request }: LoaderFunctionArgs) {

    // Verificação se o usuário está logado
    const logado = Boolean(JSON.parse(localStorage.getItem('token') || '""'));
    
    // Obtendo parâmetros da URL da requisição
    const url = new URL(request.url);
    const busca = url.searchParams.get('busca') || '';
    const page = url.searchParams.get('pagina') || '';

    // Chamando serviço para obter lista de usuários
    const usuarios = await UsuariosService.getAll(
        page ? page : '1',
        busca && busca,
        Environment.LIMITE_DE_LINHAS_TABLE_FUNCIONARIOS
    );

    // Tratando erros de requisição
    if (usuarios instanceof AxiosError) {

        // Obtendo mensagem de erro da resposta
        const errors = (usuarios as IResponseLoaderListagemDeUsuarios).response?.data.errors;

        // Manipulação de erros específicos
        if ((usuarios.response?.status == 401 || usuarios.response?.status == 500) && logado == true) {
            // Lançamento de uma resposta JSON para o cliente
            throw json(
                { message: errors?.default || 'Erro Interno do Servidor' },
                { status: usuarios.response?.status || 500 }
            );
        }

        // Retorno dos erros
        return {
            errors: errors
        };

    }

    // Construção do objeto de dados a ser retornado
    const data: IListagemDeUsuarios = {
        data: usuarios.data,
        totalCount: usuarios.totalCount,
    };

    // Retorno dos dados
    return data;
}