import { IPostCompleto, IUsuarioCompleto } from "../../../shared/interfaces";

export interface ILoaderDetalhesDePosts {
    response?: {
        data: {
            errors: {
                default?: string
            }
        }
    }
}

export interface IDetalhesDePostLoader {
    post: IPostCompleto;
    logado: Boolean
    usuarioLogado: IUsuarioCompleto | undefined
}