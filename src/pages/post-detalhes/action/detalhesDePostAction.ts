import { json, LoaderFunctionArgs } from 'react-router-dom';
import { PostsService } from '../../../shared/services';
import { AxiosError } from 'axios';
import { IActionEditarPost, IEditarPostAction } from '../interfaces/interfaces';

export async function DetalhesDePostAction({ request, params }: LoaderFunctionArgs) {

    // Obtém o ID do usuário a partir dos parâmetros da URL.
    const idParams = params.id;

    // Se a requisição for um PATCH, significa que os dados do usuário estão sendo atualizados.
    if (request.method === 'PATCH') {

        // Obtém os dados do formulário enviado na requisição.
        const formData = await request.formData();

        const titulo = formData.get('titulo') as string;
        const conteudo = formData.get('conteudo') as string;
        const visivel = formData.get('visivel') as string;
        const foto = formData.get('foto') as File;

        // Chama a função de atualização do funcionário
        const post = await PostsService.updateById(
            Number(idParams),
            titulo || undefined,
            conteudo || undefined,
            visivel || undefined,
            foto || undefined
        );

        // Trata erros caso ocorram
        if (post instanceof AxiosError) {

            const errors = (post as IActionEditarPost).response?.data.errors;

            // Manipulação de erros específicos
            if (post.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: post.response?.status || 500 }
                );

            }

            console.log(errors);

            const response: IEditarPostAction = {
                errors: errors
            };

            return response;

        }

        const response: IEditarPostAction = {
            success: {
                message: 'Cadastro foi atualizado'
            }
        };

        // Retorna sucesso caso a atualização seja bem-sucedida
        return response;
    }

    // Se a requisição for um DELETE, significa que a foto do usuário está sendo excluída.
    if (request.method === 'DELETE') {

        // Chama o serviço de exclusão de foto do usuário.
        const capa = await PostsService.deleteCapaById(Number(idParams),);

        // Verifica se ocorreu algum erro na exclusão da foto.
        if (capa instanceof AxiosError) {

            // Obtém os erros retornados pela API.
            const errors = (capa as IActionEditarPost).response?.data.errors;

            // Manipulação de erros específicos
            if (capa.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: capa.response?.status || 500 }
                );

            }

            const response: IEditarPostAction = {
                success: {
                    message: 'Cadastro foi atualizado'
                }
            };

            // Retorna sucesso caso a atualização seja bem-sucedida
            return response;
        }


        const data: IEditarPostAction = {
            success: {
                message: 'Foto deletada com successo'
            }
        };

        // Retorna sucesso caso a atualização seja bem-sucedida
        return data;

    }

}
