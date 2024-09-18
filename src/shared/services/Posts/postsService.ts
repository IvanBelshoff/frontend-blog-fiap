import axios, { AxiosError, isAxiosError } from "axios";
import { Api } from "../api";
import {
  IPostCompleto,
  IPostsComTotalCount,
  IResponseErrosGeneric,
} from "../../interfaces";

const getAll = async (
  page?: string,
  filter?: string,
  limit?: string
): Promise<IPostsComTotalCount | AxiosError> => {
  try {
    const data = await Api().get("/posts", {
      params: {
        page: Number(page),
        filter: filter,
        limit: limit,
      },
    });

    if (data.status == 200) {
      return {
        data: data.data,
        totalCount: Number(data.headers["x-total-count"] || limit),
      };
    }

    return new AxiosError(
      "Erro ao consultar o registros.",
      undefined,
      data.config
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error;
    }

    const errorMessage =
      (error as { message: string }).message ||
      "Erro ao consultar o registros.";

    return new AxiosError(
      errorMessage,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }
};

const getAllLogged = async (
  page?: string,
  filter?: string,
  limit?: string
): Promise<IPostsComTotalCount | AxiosError> => {
  try {
    const data = await Api().get("/posts/logged", {
      params: {
        page: Number(page),
        filter: filter,
        limit: limit
      },
    });

    if (data.status == 200) {
      return {
        data: data.data,
        totalCount: Number(data.headers["x-total-count"] || limit),
      };
    }

    return new AxiosError(
      "Erro ao consultar o registros.",
      undefined,
      data.config
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error;
    }

    const errorMessage =
      (error as { message: string }).message ||
      "Erro ao consultar o registros.";

    return new AxiosError(
      errorMessage,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }
};

const getById = async (id: number): Promise<IPostCompleto | AxiosError> => {
  try {
    const data = await Api().get(`/posts/${id}`);

    if (data.status == 200) {
      return data.data;
    }

    return new AxiosError(
      "Erro ao consultar o registros.",
      undefined,
      data.config
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error;
    }
    const errorMessage =
      (error as { message: string }).message ||
      "Erro ao consultar o registros.";

    return new AxiosError(
      errorMessage,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }
};

const deleteById = async (id: number): Promise<void | AxiosError> => {
  try {
    const data = await Api().delete(`/posts/${id}`);

    console.log(data.status)
    if (data.status == 204) {
      return;
    }

    return new AxiosError("Erro ao deletar o post.", undefined, data.config);

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

const updateById = async (
  id: number,
  titulo?: string,
  conteudo?: string,
  visivel?: string,
  foto?: File,
): Promise<void | AxiosError> => {
  try {

    const formData = new FormData();

    titulo && (
      formData.append('titulo', titulo)
    );

    conteudo && (
      formData.append('conteudo', conteudo)
    );

    visivel && (
      formData.append('visivel', visivel)
    );

    foto && (
      formData.append('foto', foto)
    );

    const data = await Api().put(`/posts/${id}`, formData, {
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

const deleteCapaById = async (id: number): Promise<void | AxiosError> => {
  try {
    const data = await Api().delete(`/posts/capa/${id}`);

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

const create = async (
  titulo?: string,
  conteudo?: string,
  visivel?: string,
  foto?: File,
): Promise<number | AxiosError> => {
  try {
    const formData = new FormData();

    titulo && (
      formData.append('titulo', titulo)
    );

    conteudo && (
      formData.append('conteudo', conteudo)
    );

    visivel && (
      formData.append('visivel', visivel)
    );

    foto && (
      formData.append('foto', foto)
    );

    const data = await Api().post('/posts', formData, {
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

export const PostsService = {
  create,
  getAll,
  getAllLogged,
  getById,
  deleteById,
  updateById,
  deleteCapaById
};
