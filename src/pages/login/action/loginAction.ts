import { AxiosError } from 'axios';

import { Api } from '../../../shared/services/api';
import { IResponseActionLogin } from '../../../shared/interfaces';
import { UsuariosService } from '../../../shared/services';
import { json } from 'react-router-dom';

export async function LoginAction(request: Request) {

    // Extração dos dados do formulário da requisição.
    const formData = await request.formData();
    const tipo = formData.get('tipo') as string;
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
            const errors = (recover as IResponseActionLogin).response?.data.errors;

            // Manipulação de erros específicos
            if (recover.response?.status != 400 && recover.response?.status != 401) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: recover.response?.status || 500 }
                );

            }

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return {
                errors: errors
            };

        }

        // Retorno de um objeto indicando que a recuperação de senha foi bem-sucedida.
        return {
            success: {
                recover: {
                    message: 'Senha foi enviada ao email'
                }
            }
        };

    } else if (tipo == 'login') {

        // Execução da função de criação de sessão (login).
        const login = await UsuariosService.login(email, senha);

        // Verificação de erro na resposta da API.
        if (login instanceof AxiosError) {

            // Extração dos erros da resposta.
            const errors = (login as IResponseActionLogin).response?.data.errors;

            // Manipulação de erros específicos
            if (login.response?.status != 400 && login.response?.status != 401) {

                // Lançamento de uma resposta JSON para o cliente
                throw json(
                    { message: errors?.default || 'Erro Interno do Servidor' },
                    { status: login.response?.status || 500 }
                );

            }

            // Retorno de um objeto indicando que ocorreu um erro durante o login.
            return {
                errors: errors
            };

        }

        // Extração do token e do ID do usuário da resposta bem-sucedida.
        const token = login.accessToken;
        const userId = login.id;

        // Armazenamento do token e do ID do usuário no localStorage para persistência.
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('userId', JSON.stringify(userId));

        // Configuração do cabeçalho de autorização para futuras requisições à API.
        Api().defaults.headers.Authorization = `Bearer ${token}`;

        // Retorno de um objeto indicando que o login foi bem-sucedido.
        return {
            success: {
                login: {
                    message: 'Autenticado'
                }
            }
        };

    }

}