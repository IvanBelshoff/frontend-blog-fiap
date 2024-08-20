import axios, { AxiosError, isAxiosError } from 'axios';
import { Api } from '../api';
import {
    IDataToken,
    IResponseErrosGeneric,
    IUsuarioCompleto,
    IUsuarioComTotalCount
} from '../../interfaces';

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

const getAll = async (page?: string, filter?: string, limit?: string): Promise<IUsuarioComTotalCount | AxiosError> => {
    try {

        const data = await Api().get('usuarios', {
            params: {
                page: Number(page),
                filter: filter,
                limit: limit,
            }
        });

        if (data.status == 200) {
            return {
                data: data.data,
                totalCount: Number(data.headers['x-total-count'] || limit),
            };
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

const getById = async (id: number): Promise<IUsuarioCompleto | AxiosError> => {

    try {
        const data = await Api().get(`/usuarios/${id}`);

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
    foto?: File,
    bloqueado?: string,
    senha?: string
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

        bloqueado && (
            formData.append('bloqueado', bloqueado)
        );

        foto && (
            formData.append('foto', foto)
        );

        senha && (
            formData.append('senha', senha)
        );

        const data = await Api().patch(`/usuarios/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

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

export const UsuariosService = {
    create,
    deleteById,
    deleteFotoById,
    getAll,
    getById,
    login,
    recoverPassword,
    updateById
};