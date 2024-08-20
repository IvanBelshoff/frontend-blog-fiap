import { AxiosError } from 'axios';
import { json } from 'react-router-dom';

import { UsuariosService } from '../../../services';
import { ILoaderAccountUser } from '../interfaces/interfaces';
import { IAccountUserLoader } from '../../../interfaces';

export async function AccountUserLoader() {

    // Variável para verificar se o usuário está logado
    const logado = Boolean(JSON.parse(localStorage.getItem('token') || '""'));

    // Obtém o ID do usuário armazenado localmente
    const id = localStorage.getItem('userId');

    // Chama o serviço para obter informações do usuário com base no ID
    const usuario = await UsuariosService.getById(Number(id));

    // Verifica se ocorreu um erro durante a solicitação
    if (usuario instanceof AxiosError) {

        // Extrai mensagens de erro do objeto de resposta
        const errors = (usuario as ILoaderAccountUser).response?.data.errors;

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

    const data: IAccountUserLoader = {
        data: usuario
    };
    // Retorna os dados do usuário obtidos com sucesso.
    return data;

}