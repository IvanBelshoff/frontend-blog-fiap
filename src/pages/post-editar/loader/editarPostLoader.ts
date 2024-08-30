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
  console.log("loader >>> post: ", post);

  // Verificação se o usuário está logado
  const logado = Boolean(JSON.parse(localStorage.getItem("token") || '""'));
  let usuarioLogado;
  if (logado) {
    const userId = localStorage.getItem("userId");
    if (userId) {
      usuarioLogado = await UsuariosService.getById(Number(userId));
    }
    console.log("usuarioLogado: ", usuarioLogado);
    if (usuarioLogado instanceof AxiosError) {
        // Extrai informações de erro da resposta.
        const errors = (usuarioLogado as ILoaderDetalhesDePosts).response?.data.errors;
    
        // Manipulação de erros específicos
    
        if (usuarioLogado.response?.status != 200 && logado == true) {
          // Lançamento de uma resposta JSON para o cliente
          throw json(
            { message: errors?.default || "Erro Interno do Servidor" },
            { status: usuarioLogado.response?.status || 500 }
          );
        }
    
        // Retorno dos erros
        return {
          errors: errors,
        };
      }
  }
  // Verifica se ocorreu um erro durante a solicitação.
  if (post instanceof AxiosError) {
    // Extrai informações de erro da resposta.
    const errors = (post as ILoaderDetalhesDePosts).response?.data.errors;

    // Manipulação de erros específicos

    if (post.response?.status == 401 && logado == true) {
      // Lançamento de uma resposta JSON para o cliente
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
    logado: logado,
    usuarioLogado: usuarioLogado
  };

  // Retorna os dados do usuário obtidos com sucesso.
  return data;
}
