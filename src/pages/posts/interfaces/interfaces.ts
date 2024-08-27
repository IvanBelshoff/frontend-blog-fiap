import { IPostCompleto } from "../../../shared/interfaces";

export interface ILoaderPosts {
    response?: {
        data: {
            errors: {
                default?: string
            }
        }
    }
}

export interface IPostLoader {
    post: IPostCompleto[];
}