import { IUsuario } from '../../../shared/interfaces';

//listagemDeUsuariosAction
export interface IActionListagemDeUsuarios {
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

//ListagemDeUsuarios
export interface IListagemDeUsuariosAction {
    errors?: {
        default?: string
    },
    success?: {
        message: string
    }
}

export interface IListagemDeUsuariosLoader {
    data: IUsuario[],
    totalCount: number
}

//listagemDeUsuariosLoader
export interface ILoaderListagemDeUsuarios {
    response?: {
        data: {
            errors: {
                default?: string
            }
        }
    }
}
