import { IPosts } from "../../../shared/interfaces";

export interface ILoaderBlog {
    response?: {
        data: {
            errors?: {
                default?: string
            }
        }
    }
}

export interface IBlogLoader {
    data: IPosts[];
    totalCount: number;
}