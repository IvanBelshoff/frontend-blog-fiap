import { AxiosError } from 'axios';
import {
    LoaderFunctionArgs,
    json
} from 'react-router-dom';

import { UsuariosService } from '../../../shared/services';
import { IActionNovoUsuario, INovoUsuarioAction } from '../interfaces/interfaces';

export async function NovoUsuarioAction({ request }: LoaderFunctionArgs) {

    // Verifica se o método da requisição é POST
    if (request.method === 'POST') {

        // Obtém os dados do formulário da requisição
        const formData = await request.formData();

        // Extrai os campos do formulário
        const nome = formData.get('nome') as string;
        const sobrenome = formData.get('sobrenome') as string;
        const email = formData.get('email') as string;
        const foto = formData.get('foto') as File;
        const senha = formData.get('senha') as string;
        
        // Chama a função createUsuario para criar um novo usuário
        const usuario = await UsuariosService.create(
            nome,
            sobrenome,
            email,
            'false',
            senha,
            foto || undefined
        );

        // Verifica se ocorreu um erro durante a criação do usuário
        if (usuario instanceof AxiosError) {

            // Extrai os erros da resposta, se disponíveis
            const errors = (usuario as IActionNovoUsuario).response?.data.errors;

            // Manipulação de erros específicos
            if (usuario.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: usuario.response?.status || 500 }
                );

            }

            const response: INovoUsuarioAction = {
                errors: errors
            };

            // Retorna um objeto contendo os erros
            return response;

        }

        const response: INovoUsuarioAction = {
            success: {
                message: 'Cadastro foi criado',
            }
        };


        // Se a criação do usuário foi bem-sucedida, retorna um objeto indicando sucesso
        return response;
    }
}