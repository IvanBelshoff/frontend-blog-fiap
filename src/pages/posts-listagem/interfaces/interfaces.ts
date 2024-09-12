import { IPosts } from "../../../shared/interfaces";

export interface ILoaderPost{
    response?: {
        data: {
            errors?: {
                default?: string
            }
        }
    }
}

export interface IPostLoader {
    data: IPosts[];
    totalCount: number;
    logado: boolean
}

export interface IActionListagemDePosts {
    response?: {
        data: {
            errors?: {
                default?: string
            },
            success?: {
                message?: string
            }
        }
    }
}

export interface IListagemDePostsAction {
    errors?: {
        default?: string
    },
    success?: {
        message?: string
    }
}