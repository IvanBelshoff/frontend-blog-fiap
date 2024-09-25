import { AxiosError } from 'axios';
import { LoaderFunctionArgs, json } from 'react-router-dom';

import { UsuariosService } from '../../../shared/services';
import { IActionDetalhesDeUsuarios, IDetalhesDeUsuarioAction } from '../interfaces/interfaces';

export async function DetalhesDeUsuariosAction({ request, params }: LoaderFunctionArgs) {

    // Obtém o ID do usuário a partir dos parâmetros da URL.
    const idParams = params.id;

    // Se a requisição for um PATCH, significa que os dados do usuário estão sendo atualizados.
    if (request.method === 'PUT') {

        // Obtém os dados do formulário enviado na requisição.
        const formData = await request.formData();

        const id = formData.get('id') as string;
        const nome = formData.get('nome') as string;
        const sobrenome = formData.get('sobrenome') as string;
        const email = formData.get('email') as string;
        const bloqueado = formData.get('bloqueado') as string;
        const foto = formData.get('foto') as File;
        const senha = formData.get('senha') as string;
        const id_copy_regras = formData.get('id_copy_regras') as string;
        const localidade = formData.get('localidade') as string;
        const departamento = formData.get('departamento') as string;
        const secao = formData.get('secao') as string;

        // Chama o serviço de atualização de usuário com os dados fornecidos.
        const usuario = await UsuariosService.updateById(
            Number(id) || Number(idParams),
            nome && nome,
            sobrenome && sobrenome,
            email && email,
            localidade || undefined,
            departamento || undefined,
            secao || undefined,
            foto && foto,
            bloqueado ? bloqueado : 'false',
            senha ? senha : undefined,
            id_copy_regras || undefined
        );

        // Verifica se ocorreu algum erro na atualização.
        if (usuario instanceof AxiosError) {

            // Obtém os erros retornados pela API.
            const errors = (usuario as IActionDetalhesDeUsuarios).response?.data.errors;

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

                const data: IDetalhesDeUsuarioAction = {
                    errors: errors,
                    tipo: 'senha'
                };

                return data;
            }

            const data: IDetalhesDeUsuarioAction = {
                errors: errors,
                tipo: 'atributos'
            };

            return data;

        }

        // Se a atualização envolvia a senha, retorna uma mensagem de successo relacionada à senha.
        if (senha) {

            const data: IDetalhesDeUsuarioAction = {
                success: {
                    message: 'Senha foi atualizada',
                },
                tipo: 'senha'
            };

            return data;
        }

        const data: IDetalhesDeUsuarioAction = {
            success: {
                message: 'Cadastro foi atualizado',
            },
            tipo: 'atributos'
        };

        return data;

    }

    if (request.method === 'PATCH') {

        // Obtém os dados do formulário enviado na requisição.
        const formData = await request.formData();

        const id = formData.get('id') as string;
        const senha = formData.get('senha') as string;
        const foto = formData.get('foto') as File;

        // Chama o serviço de atualização de usuário com os dados fornecidos.
        const usuario = await UsuariosService.updatePasswordById(
            Number(id) || Number(idParams),
            senha || undefined,
            foto && foto
        );

        // Verifica se ocorreu algum erro na atualização.
        if (usuario instanceof AxiosError) {

            // Obtém os erros retornados pela API.
            const errors = (usuario as IActionDetalhesDeUsuarios).response?.data.errors;

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

                const response: IDetalhesDeUsuarioAction = {
                    errors: errors,
                    tipo: 'senha'
                };

                return response;
            }

            const response: IDetalhesDeUsuarioAction = {
                errors: errors,
                tipo: 'atributos'
            };

            return response;

        }

        // Se a atualização envolvia a senha, retorna uma mensagem de successo relacionada à senha.
        if (senha) {

            const response: IDetalhesDeUsuarioAction = {
                success: {
                    message: 'Senha foi atualizada',
                },
                tipo: 'senha'
            };

            return response;
        }

        const response: IDetalhesDeUsuarioAction = {
            success: {
                message: 'Cadastro foi atualizado',
            },
            tipo: 'atributos'
        };

        return response;

    }

    // Se a requisição for um DELETE, significa que a foto do usuário está sendo excluída.
    if (request.method === 'DELETE') {

        // Obtém os dados do formulário enviado na requisição.
        const formData = await request.formData();

        const id = formData.get('id') as string;

        // Chama o serviço de exclusão de foto do usuário.
        const foto = await UsuariosService.deleteFotoById(Number(id) || Number(idParams),);

        // Verifica se ocorreu algum erro na exclusão da foto.
        if (foto instanceof AxiosError) {

            // Obtém os erros retornados pela API.
            const errors = (foto as IActionDetalhesDeUsuarios).response?.data.errors;

            // Manipulação de erros específicos
            if (foto.response?.status != 400) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: foto.response?.status || 500 }
                );

            }

            const data: IDetalhesDeUsuarioAction = {
                errors: errors,
                tipo: 'foto'
            };

            // Retorna os erros relacionados à exclusão da foto.
            return data;
        }


        const data: IDetalhesDeUsuarioAction = {
            success: {
                message: 'Foto deletada com sucesso'
            },
            tipo: 'foto'
        };
        
        // Se a exclusão da foto ocorreu com successo, retorna uma mensagem de successo relacionada à foto.
        return data;
    }
}