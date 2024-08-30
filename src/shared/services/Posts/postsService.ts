import axios, { AxiosError, isAxiosError } from "axios";
import { Api } from "../api";
import {
  IPostCompleto,
  IPostsComTotalCount,
  IPosts,
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

const deleteById = async (id: number): Promise<IPostCompleto | AxiosError> => {
  try {
    const data = await Api().delete(`/posts/${id}`);

    if (data.status == 200) {
      return data.data;
    }

    return new AxiosError("Erro ao deletar o post.", undefined, data.config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error;
    }
    const errorMessage =
      (error as { message: string }).message || "Erro ao deletar o post.";

    return new AxiosError(
      errorMessage,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }
};

const updateById = async (
  id: number,
  postagem: IPosts
): Promise<void | AxiosError> => {
  try {
    const data = await Api().put(`/posts/${id}`, postagem, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.status == 204) {
      return;
    }

    return new AxiosError("Erro ao atualizar o post.", undefined, data.config);
  } catch (error) {
    const errors = (error as IResponseErrosGeneric).response;

    if (isAxiosError(error)) {
      return error;
    }

    return new AxiosError(
      errors?.data?.errors?.default || "Erro ao consultar o registros.",
      errors?.status || "500"
    );
  }
};

export const PostsService = {
  getAll,
  getById,
  deleteById,
  updateById,
};
