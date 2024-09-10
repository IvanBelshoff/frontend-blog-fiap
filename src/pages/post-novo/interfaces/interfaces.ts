export interface IFormPostNovo {
    titulo: string;
    conteudo: string;
    visivel: string;
}

export interface IActionNovoPost {
    response?: {
        data: {
            errors?: {
                default?: string
                body?: {
                    titulo: string
                    conteudo: string
                    visivel: string
                }
            },
            success?: {
                message?: string
            }
        }
    }
}

export interface INovoPostAction {
    errors?: {
        default?: string
        body?: {
            titulo: string
            conteudo: string
            visivel: string
        }
    },
    success?: {
        message?: string
    }
}
