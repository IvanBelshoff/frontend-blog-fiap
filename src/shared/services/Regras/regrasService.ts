import {
    isAxiosError,
    AxiosError
} from 'axios';

import { Api } from '../api';
import { IRegra, IResponseErrosGeneric } from '../../interfaces';

const getAll = async (nome?: string): Promise<IRegra[] | AxiosError> => {

    try {

        const data = await Api().get('/regras', {
            params: {
                nome: nome,
            }
        });

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

const getRegrasByIdUser = async (id: number): Promise<IRegra[] | AxiosError> => {
    try {

        const data = await Api().get(`/regras/usuario/${id}`,);

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

export const RegrasService = {
    getAll,
    getRegrasByIdUser
};