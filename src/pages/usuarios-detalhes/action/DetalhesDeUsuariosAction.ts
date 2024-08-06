import { AxiosError } from 'axios';
import { LoaderFunctionArgs, json } from 'react-router-dom';

import { IResponseActionDetalhesDeUsuarios } from '../../../shared/interfaces';
import { UsuariosService } from '../../../shared/services';

export async function DetalhesDeUsuariosAction({ request }: LoaderFunctionArgs) {

    // Se a requisição for um PATCH, significa que os dados do usuário estão sendo atualizados.
    if (request.method === 'PATCH') {

        // Obtém os dados do formulário enviado na requisição.
        const formData = await request.formData();
        const id = formData.get('id') as string;
        const nome = formData.get('nome') as string;
        const sobrenome = formData.get('sobrenome') as string;
        const email = formData.get('email') as string;
        const bloqueado = formData.get('bloqueado') as string;
        const foto = formData.get('foto') as File;
        const senha = formData.get('senha') as string;

        // Chama o serviço de atualização de usuário com os dados fornecidos.
        const usuario = await UsuariosService.updateById(
            Number(id),
            nome && nome,
            sobrenome && sobrenome,
            email && email,
            foto && foto,
            bloqueado ? bloqueado : 'false',
            senha ? senha : undefined
        );

        // Verifica se ocorreu algum erro na atualização.
        if (usuario instanceof AxiosError) {

            // Obtém os erros retornados pela API.
            const errors = (usuario as IResponseActionDetalhesDeUsuarios).response?.data.errors;

            // Manipulação de erros específicos
            if (usuario.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: usuario.response?.status || 500 }
                );

            }

            // Se a atualização envolvia a senha, retorna os erros relacionados à senha.
            if (senha) {
                return {
                    errors: errors,
                    tipo: 'senha'
                };
            }

            // Caso contrário, retorna os erros relacionados aos outros atributos.
            return {
                errors: errors,
                tipo: 'atributos'
            };
        }

        // Se a atualização envolvia a senha, retorna uma mensagem de successo relacionada à senha.
        if (senha) {
            return {
                success: {
                    message: 'Senha foi atualizada',
                },
                tipo: 'senha'
            };
        }

        // Caso contrário, retorna uma mensagem de successo relacionada aos outros atributos.
        return {
            success: {
                message: 'Cadastro foi atualizado',
            },
            tipo: 'atributos'
        };

    }

    // Se a requisição for um DELETE, significa que a foto do usuário está sendo excluída.
    if (request.method === 'DELETE') {

        // Obtém os dados do formulário enviado na requisição.
        const formData = await request.formData();
        const id = formData.get('id') as string;

        // Chama o serviço de exclusão de foto do usuário.
        const foto = await UsuariosService.deleteFotoById(Number(id));

        // Verifica se ocorreu algum erro na exclusão da foto.
        if (foto instanceof AxiosError) {

            // Obtém os erros retornados pela API.
            const errors = (foto as IResponseActionDetalhesDeUsuarios).response?.data.errors;

            // Manipulação de erros específicos
            if (foto.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: foto.response?.status || 500 }
                );

            }
            
            // Retorna os erros relacionados à exclusão da foto.
            return {
                errors: errors,
                tipo: 'foto'
            };
        }

        // Se a exclusão da foto ocorreu com successo, retorna uma mensagem de successo relacionada à foto.
        return {
            success: {
                message: 'Foto deletada com successo'
            },
            tipo: 'foto'
        };
    }
}