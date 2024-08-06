import { AxiosError } from 'axios';
import { LoaderFunctionArgs, json } from 'react-router-dom';

import { IResponseActionListagemDeUsuarios } from '../../../shared/interfaces';
import { UsuariosService } from '../../../shared/services';

export async function ListagemDeUsuariosAction({ request }: LoaderFunctionArgs) {

    // Verifica se o método da requisição é DELETE
    if (request.method === 'DELETE') {

        // Obtém os dados do formulário da requisição
        const formData = await request.formData();

        // Obtém o ID do usuário a ser deletado
        const id = formData.get('id') as string;

        // Chama o serviço para deletar o usuário pelo ID
        const funcionario = await UsuariosService.deleteById(Number(id));

        // Verifica se ocorreu um erro durante a deleção
        if (funcionario instanceof AxiosError) {

            // Obtém os erros da resposta
            const errors = (funcionario as IResponseActionListagemDeUsuarios).response?.data.errors;

            // Manipulação de erros específicos
            if (funcionario.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: funcionario.response?.status || 500 }
                );

            }

            // Retorna um objeto indicando que ocorreu um erro durante a deleção
            return {
                errors: errors,
            };
            
        }

        // Retorna um objeto indicando que o usuário foi deletado com sucesso
        return {
            success: {
                message: 'Usuário deletado com sucesso'
            }
        };
    }

}