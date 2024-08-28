import {
    Params,
    json
} from 'react-router-dom';
import { AxiosError } from 'axios';
import {
    RegrasService,
    UsuariosService
} from '../../../shared/services';
import {
    ILoaderRegrasEPermissoes,
    IRegrasEPermissoesLoader
} from '../interfaces/interfaces';

export async function RegrasEPermissoesLoader(request: Request, params: Params) {

    // Verificação se o usuário está logado
    const logado = Boolean(JSON.parse(localStorage.getItem('token') || '""'));

    const url = new URL(request.url);

    const nome = url.searchParams.get('nome') || '';

    const id = params.id;

    const regras = await RegrasService.getAll(
        nome || undefined
    );

    // Verificando se ocorreu um erro durante a obtenção dos atributos
    if (regras instanceof AxiosError) {

        // Extraindo informações de erro do Axios
        const errors = (regras as ILoaderRegrasEPermissoes).response?.data.errors;

        // Manipulação de erros específicos
        if ((regras.response?.status == 401 || regras.response?.status == 500) && logado == true) {
            // Lançamento de uma resposta JSON para o cliente
            throw json(
                { message: errors?.default },
                { status: regras.response?.status }
            );
        }

        // Retorno dos erros
        return {
            errors: errors
        };

    }

    const regrasUsuario = await RegrasService.getRegrasByIdUser(Number(id));

    // Verificando se ocorreu um erro durante a obtenção dos atributos
    if (regrasUsuario instanceof AxiosError) {

        // Extraindo informações de erro do Axios
        const errors = (regrasUsuario as ILoaderRegrasEPermissoes).response?.data.errors;

        // Manipulação de erros específicos
        if ((regrasUsuario.response?.status == 401 || regrasUsuario.response?.status == 500) && logado == true) {
            // Lançamento de uma resposta JSON para o cliente
            throw json(
                { message: errors?.default },
                { status: regrasUsuario.response?.status }
            );
        }

        // Retorno dos erros
        return {
            errors: errors
        };

    }

    const usuario = await UsuariosService.getById(Number(id));

    // Verifica se ocorreu um erro durante a solicitação.
    if (usuario instanceof AxiosError) {

        // Extrai informações de erro da resposta.
        const errors = (usuario as ILoaderRegrasEPermissoes).response?.data.errors;

        // Manipulação de erros específicos

        if ((usuario.response?.status == 401) && logado == true) {

            // Lançamento de uma resposta JSON para o cliente
            throw json(
                { message: errors?.default || 'Erro Interno do Servidor' },
                { status: usuario.response?.status || 500 }
            );
        }

        // Retorno dos erros
        return {
            errors: errors
        };

    }

    const data: IRegrasEPermissoesLoader = {
        regras: regras,
        regrasUsuario: regrasUsuario,
        usuario: usuario
    };

    // Retornando o objeto com os atributos
    return data;
}