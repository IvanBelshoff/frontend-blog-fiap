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
}