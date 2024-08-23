import { AxiosError } from 'axios';
import { LoaderFunctionArgs, json } from 'react-router-dom';

import { UsuariosService } from '../../../shared/services';
import { IActionListagemDeUsuarios, IListagemDeUsuariosAction } from '../interfaces/interfaces';

export async function ListagemDeUsuariosAction({ request }: LoaderFunctionArgs) {

    // Verifica se o método da requisição é DELETE
    if (request.method === 'DELETE') {

        // Obtém os dados do formulário da requisição
        const formData = await request.formData();

        // Obtém o ID do usuário a ser deletado
        const id = formData.get('id') as string;

        // Chama o serviço para deletar o usuário pelo ID
        const usuario = await UsuariosService.deleteById(Number(id));

        // Verifica se ocorreu um erro durante a deleção
        if (usuario instanceof AxiosError) {

            // Obtém os erros da resposta
            const errors = (usuario as IActionListagemDeUsuarios).response?.data.errors;

            // Manipulação de erros específicos
            if (usuario.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: usuario.response?.status || 500 }
                );

            }

            const data: IListagemDeUsuariosAction = {
                errors: errors
            };
            // Retorna um objeto indicando que ocorreu um erro durante a deleção
            return data;

        }

        const data: IListagemDeUsuariosAction = {
            success: {
                message: 'Usuário deletado com sucesso'
            }
        };


        // Retorna um objeto indicando que o usuário foi deletado com sucesso
        return data;
    }

}