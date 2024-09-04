import { IPostCompleto } from "../../../shared/interfaces";

export interface ILoaderBlogPost{
    response?: {
        data: {
            errors: {
                default?: string
            }
        }
    }
}

export interface IBlogPostLoader {
    post: IPostCompleto;
    logado: Boolean
}