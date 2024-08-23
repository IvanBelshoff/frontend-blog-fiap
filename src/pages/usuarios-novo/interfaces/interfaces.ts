
//novoUsuarioAction
export interface IActionNovoUsuario {
    response?: {
        data: {
            errors?: {
                default?: string
                body?: {
                    nome: string,
                    sobrenome: string,
                    email: string,
                    senha: string
                }
            },
            success?: {
                message?: string
            }

        }
    }
}

//NovoUsuario
export interface INovoUsuarioAction {
    errors?: {
        default?: string
        body?: {
            nome: string,
            sobrenome: string,
            email: string,
            senha: string
        }
    },
    success?: {
        message: string
    }
}

export interface IFormUsuario {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string
}
