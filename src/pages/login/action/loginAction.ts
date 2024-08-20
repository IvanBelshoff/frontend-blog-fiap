import { AxiosError } from 'axios';

import { Api } from '../../../shared/services/api';
import { UsuariosService } from '../../../shared/services';
import { json } from 'react-router-dom';
import { IActionLogin, ILoginAction } from '../interfaces/interfaces';

export async function LoginAction(request: Request) {

    // Extração dos dados do formulário da requisição.
    const formData = await request.formData();

    const tipo = formData.get('tipo') as 'login' | 'recover';
    const email = formData.get('email') as string;
    const senha = formData.get('senha') as string;
    const emailRecuperacao = formData.get('emailRecuperacao') as string;

    // Verificação do tipo de ação: recuperação de senha ou login.
    if (tipo == 'recover') {

        // Execução da função de recuperação de senha.
        const recover = await UsuariosService.recoverPassword(emailRecuperacao);

        // Verificação de erro na resposta da API.
        if (recover instanceof AxiosError) {

            // Extração dos erros da resposta.
            const errors = (recover as IActionLogin).response?.data.errors;

            // Manipulação de erros específicos
            if (recover.response?.status != 400 && recover.response?.status != 401) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: recover.response?.status || 500 }
                );

            }

            const response: ILoginAction = {
                errors: errors
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;

        }

        const response: ILoginAction = {
            success: {
                recover: {
                    message: 'Senha foi enviada ao email'
                }
            }
        };

        // Retorno de um objeto indicando que a recuperação de senha foi bem-sucedida.
        return response;

    } else if (tipo == 'login') {

        // Execução da função de criação de sessão (login).
        const login = await UsuariosService.login(email, senha);

        // Verificação de erro na resposta da API.
        if (login instanceof AxiosError) {

            // Extração dos erros da resposta.
            const errors = (login as IActionLogin).response?.data.errors;

            // Manipulação de erros específicos
            if (login.response?.status != 400 && login.response?.status != 401) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: login.response?.status || 500 }
                );

            }

            const response: ILoginAction = {
                errors: errors
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;

        }

        const { accessToken, id, permissoes, regras } = login;

        // Armazenamento do token e do ID do usuário no localStorage para persistência.
        localStorage.setItem('token', JSON.stringify(accessToken));
        localStorage.setItem('userId', JSON.stringify(id));
        localStorage.setItem('regras', JSON.stringify(regras));
        localStorage.setItem('permissoes', JSON.stringify(permissoes));

        // Configuração do cabeçalho de autorização para futuras requisições à API.
        Api().defaults.headers.Authorization = `Bearer ${accessToken}`;

        const response: ILoginAction = {
            success: {
                login: {
                    message: 'Autenticado'
                }
            }
        };

        // Retorno de um objeto indicando que o login foi bem-sucedido.
        return response;

    }

}