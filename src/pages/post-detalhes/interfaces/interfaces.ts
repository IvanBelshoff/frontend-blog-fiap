import { IFoto, IPostCompleto } from "../../../shared/interfaces";

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

export interface IActionEditarPost {
    response?: {
        data: {
            errors?: {
                default?: string
                body?: {
                    conteudo: string;
                    data_atualizacao: Date;
                    data_criacao: Date;
                    titulo: string;
                    usuario_atualizador: string;
                    usuario_cadastrador: string
                    visivel: boolean
                }
            },
            success?: {
                message: string
            }
        }
    }
}

export interface IEditarPostAction {
    errors?: {
        default?: string
        body?: {
            conteudo: string;
            data_atualizacao: Date;
            data_criacao: Date;
            titulo: string;
            usuario_atualizador: string;
            usuario_cadastrador: string
            visivel: boolean
        }
    },
    success?: {
        message: string
    }
}

export interface IFormPost {
    conteudo: string;
    data_atualizacao: Date;
    data_criacao: Date;
    titulo: string;
    usuario_atualizador: string;
    usuario_cadastrador: string
    visivel: boolean
}

export interface IDetalhesDePostAction {
    errors?: {
        default?: string
        body?: {
            conteudo: string;
            data_atualizacao: Date;
            data_criacao: Date;
            foto: IFoto;
            id: number
            titulo: string;
            usuario_atualizador: string;
            usuario_cadastrador: string
            visivel: boolean
        }
    },
    success?: {
        message: string
    }

}