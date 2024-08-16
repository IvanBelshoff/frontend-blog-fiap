import { IPostCompleto } from "../../../shared/interfaces";

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
}