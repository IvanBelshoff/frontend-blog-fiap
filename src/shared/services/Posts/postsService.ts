import axios, { AxiosError } from "axios";
import { Api } from "../api";
import { IPostsComTotalCount } from "../../interfaces";

const getAll = async (page?: string, filter?: string, limit?: string): Promise<IPostsComTotalCount | AxiosError> => {
    try {

        const data = await Api().get('/posts', {
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

export const PostsService = {
    getAll
};