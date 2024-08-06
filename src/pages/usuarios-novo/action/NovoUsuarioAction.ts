import { AxiosError } from 'axios';
import { LoaderFunctionArgs, json } from 'react-router-dom';

import { IResponseActionNovoUsuario } from '../../../shared/interfaces';
import { UsuariosService } from '../../../shared/services';

export async function NovoUsuarioAction({ request }: LoaderFunctionArgs) {

    // Verifica se o método da requisição é POST
    if (request.method === 'POST') {

        // Obtém os dados do formulário da requisição
        const formData = await request.formData();

        // Extrai os campos do formulário
        const nome = formData.get('nome') as string;
        const sobrenome = formData.get('sobrenome') as string;
        const email = formData.get('email') as string;
        const senha = formData.get('senha') as string;
        const foto = formData.get('foto') as File;

        // Chama a função createUsuario para criar um novo usuário
        const usuario = await UsuariosService.create(
            nome && nome,
            sobrenome && sobrenome,
            email && email,
            'false',
            senha && senha,
            foto && foto
        );

        // Verifica se ocorreu um erro durante a criação do usuário
        if (usuario instanceof AxiosError) {

            // Extrai os erros da resposta, se disponíveis
            const errors = (usuario as IResponseActionNovoUsuario).response?.data.errors;

            // Manipulação de erros específicos
            if (usuario.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: usuario.response?.status || 500 }
                );

            }
            
            // Retorna um objeto contendo os erros
            return {
                errors: errors
            };

        }

        // Se a criação do usuário foi bem-sucedida, retorna um objeto indicando sucesso
        return {
            success: {
                message: 'Cadastro foi criado',
            }
        };
    }
}