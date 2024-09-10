import { AxiosError } from 'axios';
import { LoaderFunctionArgs, json } from 'react-router-dom';
import { PostsService } from '../../../shared/services';
import { IActionNovoPost, INovoPostAction } from '../interfaces/interfaces';

export async function NovoPostAction({ request }: LoaderFunctionArgs) {

    // Verifica se o método da requisição é POST
    if (request.method === 'POST') {

        // Obtém os dados do formulário
        const formData = await request.formData();

        const titulo = formData.get('titulo') as string;
        const conteudo = formData.get('conteudo') as string;
        const visivel = formData.get('visivel') as string;
        const foto = formData.get('foto') as File;

        console.log(titulo);
        console.log(conteudo);
        console.log(visivel);
        console.log(foto);

        // Chama a função de criação do funcionário, passando os dados obtidos
        const post = await PostsService.create(
            titulo || undefined,
            conteudo || undefined,
            visivel || undefined,
            foto || undefined
        );

        // Verifica se ocorreu um erro durante a criação do funcionário
        if (post instanceof AxiosError) {

            // Obtém os erros retornados pela resposta da API
            const errors = (post as IActionNovoPost).response?.data.errors;

            // Manipulação de erros específicos
            if (post.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: post.response?.status || 500 }
                );

            }

            console.log(errors);

            const response: INovoPostAction = {
                errors: errors
            };

            // Retorna um objeto contendo os erros
            return response;

        }

        const response: INovoPostAction = {
            success: {
                message: 'Cadastro foi criado',
            }
        };

        // Se a criação do usuário foi bem-sucedida, retorna um objeto indicando sucesso
        return response;
        
    }
}