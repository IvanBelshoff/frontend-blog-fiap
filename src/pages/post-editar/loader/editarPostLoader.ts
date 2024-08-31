import { AxiosError } from "axios";
import { LoaderFunctionArgs, json } from "react-router-dom";

import { PostsService, UsuariosService } from "../../../shared/services";
import {
  IDetalhesDePostLoader,
  ILoaderDetalhesDePosts,
} from "../interfaces/interfaces";

export async function EditarPostLoader({ params }: LoaderFunctionArgs) {
  // Obtém o ID do usuário a partir dos parâmetros da URL.
  const id = params.id;

  // Chama o serviço para obter os detalhes do usuário pelo ID.
  const post = await PostsService.getById(Number(id));

  // Verificação se o usuário está logado
  const logado = Boolean(JSON.parse(localStorage.getItem("token") || '""'));

  // Verifica se ocorreu um erro durante a solicitação.
  if (post instanceof AxiosError) {

    const errors = (post as ILoaderDetalhesDePosts).response?.data.errors;

    if (post.response?.status == 401 && logado == true) {
      throw json(
        { message: errors?.default || "Erro Interno do Servidor" },
        { status: post.response?.status || 500 }
      );
    }

    // Retorno dos erros
    return {
      errors: errors,
    };
  }

  const data: IDetalhesDePostLoader = {
    post: post,
  };

  // Retorna os dados do usuário obtidos com sucesso.
  return data;
}
