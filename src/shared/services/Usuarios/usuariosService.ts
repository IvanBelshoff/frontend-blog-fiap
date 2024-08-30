import axios, { AxiosError, isAxiosError } from 'axios';
import { Api } from '../api';
import {
    IDataToken,
    IResponseErrosGeneric,
    IUsuarioCompleto,
    IUsuarioComTotalCount
} from '../../interfaces';
import { Environment } from '../../environment';

const create = async (
    nome: string,
    sobrenome: string,
    email: string,
    bloqueado: string,
    senha: string,
    foto?: File
): Promise<number | AxiosError> => {
    try {

        const formData = new FormData();

        formData.append('nome', nome);
        formData.append('sobrenome', sobrenome);
        formData.append('email', email);
        formData.append('bloqueado', bloqueado);
        formData.append('senha', senha);
        foto && (
            formData.append('foto', foto)
        );

        const data = await Api().post('/usuarios', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (data.status == 201) {
            return data.data;
        }

        return new AxiosError('Erro ao consultar o registros.', undefined, data.config);

    } catch (error) {

        if (axios.isAxiosError(error)) {
            return error;
        }

        const errorMessage = (error as { message: string }).message || 'Erro ao consultar o registros.';

        return new AxiosError(errorMessage, undefined, undefined, undefined, undefined);
    }
};

const deleteById = async (id: number): Promise<void | AxiosError> => {
    try {
        const data = await Api().delete(`/usuarios/${id}`);

        if (data.status == 204) {
            return;
        }

        return new AxiosError('Erro ao consultar o registros.', undefined, data.config);

    } catch (error) {

        if (axios.isAxiosError(error)) {
            return error;
        }

        const errorMessage = (error as { message: string }).message || 'Erro ao consultar o registros.';

        return new AxiosError(errorMessage, undefined, undefined, undefined, undefined);
    }
};

const deleteFotoById = async (id: number): Promise<void | AxiosError> => {
    try {
        const data = await Api().delete(`/usuarios/foto/${id}`);

        if (data.status == 204) {
            return;
        }

        return new AxiosError('Erro ao consultar o registros.', undefined, data.config);

    } catch (error) {

        if (axios.isAxiosError(error)) {
            return error;
        }

        const errorMessage = (error as { message: string }).message || 'Erro ao consultar o registros.';

        return new AxiosError(errorMessage, undefined, undefined, undefined, undefined);
    }
};

const getAll = async (page?: string, filter?: string): Promise<IUsuarioComTotalCount | AxiosError> => {
    try {

        const data = await Api().get('usuarios', {
            params: {
                page: Number(page),
                filter: filter,
                limit: Environment.LIMITE_DE_LINHAS_TABLE_FUNCIONARIOS,
            }
        });

        if (data.status == 200) {
            return {
                data: data.data,
                totalCount: Number(data.headers['x-total-count'] || Environment.LIMITE_DE_LINHAS_TABLE_FUNCIONARIOS),
            };
        }

        return new AxiosError('Erro ao consultar o registros.', undefined, data.config);

    } catch (error) {

        const errors = (error as IResponseErrosGeneric).response;

        if (isAxiosError(error)) {
            return error;
        }

        return new AxiosError(
            errors?.data?.errors?.default || 'Erro ao consultar o registros.',
            errors?.status || '500');

    }
};

const getById = async (id: number): Promise<IUsuarioCompleto | AxiosError> => {

    try {
        const data = await Api().get(`/usuarios/id/${id}`);

        if (data.status == 200) {
            return data.data;
        }

        return new AxiosError('Erro ao consultar o registros.', undefined, data.config);

    } catch (error) {

        if (axios.isAxiosError(error)) {
            return error;
        }
        const errorMessage = (error as { message: string }).message || 'Erro ao consultar o registros.';

        return new AxiosError(errorMessage, undefined, undefined, undefined, undefined);
    }

};

const login = async (email: string, senha: string): Promise<IDataToken | AxiosError> => {

    try {
        const data = await Api().post('/entrar', { email, senha });

        if (data.status == 200) {
            return data.data;
        }

        return new AxiosError('Erro ao consultar o registros.', undefined, data.config);
    } catch (error) {

        const errors = (error as IResponseErrosGeneric).response;

        if (isAxiosError(error)) {
            return error;
        }

        return new AxiosError(
            errors?.data?.errors?.default || 'Erro ao consultar o registros.',
            errors?.status || '500');
    }
};

const recoverPassword = async (emailRecuperacao: string): Promise<void | AxiosError> => {
    try {
        const data = await Api().post('/recuperar', { emailRecuperacao });

        if (data.status == 200) {
            return data.data;
        }

        return new AxiosError('Erro ao consultar o registros.', undefined, data.config);
    } catch (error) {

        if (axios.isAxiosError(error)) {
            return error;
        }

        const errorMessage = (error as { message: string }).message || 'Erro ao consultar o registros.';

        return new AxiosError(errorMessage, undefined, undefined, undefined, undefined);
    }
};

export const updateById = async (
    id: number,
    nome?: string,
    sobrenome?: string,
    email?: string,
    localidade?: string,
    departamento?: string,
    secao?: string,
    foto?: File,
    bloqueado?: string,
    senha?: string,
    id_copy_regras?: string,
): Promise<void | AxiosError> => {
    try {

        const formData = new FormData();

        nome && (
            formData.append('nome', nome)
        );

        sobrenome && (
            formData.append('sobrenome', sobrenome)
        );

        email && (
            formData.append('email', email)
        );

        localidade && (
            formData.append('localidade', localidade)
        );

        departamento && (
            formData.append('departamento', departamento)
        );

        secao && (
            formData.append('secao', secao)
        );

        bloqueado && (
            formData.append('bloqueado', bloqueado)
        );

        foto && (
            formData.append('foto', foto)
        );

        senha && (
            formData.append('senha', senha)
        );

        id_copy_regras && (
            formData.append('id_copy_regras', id_copy_regras)
        );

        const data = await Api().put(`/usuarios/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (data.status == 204) {
            return;
        }

        return new AxiosError('Erro ao consultar o registros.', undefined, data.config);

    } catch (error) {

        const errors = (error as IResponseErrosGeneric).response;

        if (isAxiosError(error)) {
            return error;
        }

        return new AxiosError(
            errors?.data?.errors?.default || 'Erro ao consultar o registros.',
            errors?.status || '500');
    }
};

const UpdateRolesAndPermissionsById = async (id: number, regras: number[], permissoes: number[]): Promise<void | Error> => {
    try {
        const { data } = await Api().patch(`/usuarios/autenticacao/${id}`, { regras: regras, permissoes: permissoes });

        if (!(data instanceof Error)) {
            return;
        }

        return new Error('Erro ao atualizar o registro.');
    } catch (error) {

        const errors = (error as IResponseErrosGeneric).response;

        if (isAxiosError(error)) {
            return error;
        }

        return new AxiosError(
            errors?.data?.errors?.default || 'Erro ao consultar o registros.',
            errors?.status || '500');

    }
};

export const UsuariosService = {
    create,
    deleteById,
    deleteFotoById,
    getAll,
    getById,
    login,
    recoverPassword,
    updateById,
    UpdateRolesAndPermissionsById
};