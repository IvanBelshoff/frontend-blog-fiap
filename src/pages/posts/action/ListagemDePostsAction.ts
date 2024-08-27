import { AxiosError } from 'axios';
import { LoaderFunctionArgs, json } from 'react-router-dom';

import { IResponseActionPosts } from '../../../shared/interfaces';
import { PostsService } from '../../../shared/services';

export async function ListagemDePostsAction({ request }: LoaderFunctionArgs) {

    // Verifica se o método da requisição é DELETE
    if (request.method === 'DELETE') {

        // Obtém os dados do formulário da requisição
        const formData = await request.formData();

        // Obtém o ID do usuário a ser deletado
        const id = formData.get('id') as string;

        // Chama o serviço para deletar o usuário pelo ID
        const posts = await PostsService.deleteById(Number(id));

        // Verifica se ocorreu um erro durante a deleção
        if (posts instanceof AxiosError) {

            // Obtém os erros da resposta
            const errors = (posts as IResponseActionPosts).response?.data.errors;

            // Manipulação de erros específicos
            if (posts.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: posts.response?.status || 500 }
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
                message: 'Post deletado com sucesso'
            }
        };
    }

}