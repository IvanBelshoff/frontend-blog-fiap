import { AxiosError } from 'axios';
import { LoaderFunctionArgs, json } from 'react-router-dom';
import { PostsService } from '../../../shared/services';
import { IActionListagemDePosts, IListagemDePostsAction } from '../interfaces/interfaces';

export async function ListagemDePostAction({ request }: LoaderFunctionArgs) {

    // Verifica se o método da requisição é DELETE
    if (request.method === 'DELETE') {

        // Obtém os dados do formulário da requisição
        const formData = await request.formData();

        // Obtém o ID do usuário a ser deletado
        const id = formData.get('id') as string;

        // Chama o serviço para deletar o usuário pelo ID
        const post = await PostsService.deleteById(Number(id));

        console.log('post', post)
        // Verifica se ocorreu um erro durante a deleção
        if (post instanceof AxiosError) {

            // Obtém os erros da resposta
            const errors = (post as IActionListagemDePosts).response?.data.errors;

            // Manipulação de erros específicos
            if (post.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: post.response?.status || 500 }
                );

            }

            const response: IListagemDePostsAction = {
                errors: errors,
            };

            // Retorna um objeto indicando que ocorreu um erro durante a deleção
            return response;

        }

        const response: IListagemDePostsAction = {
            success: {
                message: 'Dashboard deletado com sucesso'
            }
        };

        // Retorna um objeto indicando que o usuário foi deletado com sucesso
        return response;
    }

}