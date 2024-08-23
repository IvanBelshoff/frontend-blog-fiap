import { AxiosError } from 'axios';
import {
    Params,
    json
} from 'react-router-dom';

import { UsuariosService } from '../../../shared/services';
import { IDetalhesDeUsuarioLoader, ILoaderDetalhesDeUsuario } from '../interfaces/interfaces';

export async function DetalhesDeUsuarioLoader(params: Params) {

    // Verificação se o usuário está logado
    const logado = Boolean(JSON.parse(localStorage.getItem('token') || '""'));

    // Obtém o ID do usuário a partir dos parâmetros da URL.
    const id = params.id as unknown as number;

    // Chama o serviço para obter os detalhes do usuário pelo ID.
    const usuario = await UsuariosService.getById(Number(id));

    // Verifica se ocorreu um erro durante a solicitação.
    if (usuario instanceof AxiosError) {

        // Extrai informações de erro da resposta.
        const errors = (usuario as ILoaderDetalhesDeUsuario).response?.data.errors;

        // Manipulação de erros específicos

        if ((usuario.response?.status == 401) && logado == true) {

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

    const data: IDetalhesDeUsuarioLoader = {
        usuario: usuario
    };
    // Retorna os dados do usuário obtidos com sucesso.
    return data;

}