import { IRegra, IUsuarioCompleto } from '../../../shared/interfaces';

//regrasEPermissoesAction
export interface IActionRegrasEPermissoes {
    response?: {
        data: {
            errors?: {
                default?: string
            },
            success?: {
                message: string
            }
        }
    }
}

//RegrasEPermissoes
export interface IRegrasEPermissoesAction {
    errors?: {
        default?: string
    },
    success?: {
        message: string
    }
}

//regrasEPermissoesLoader
export interface IRegrasEPermissoesLoader {
    regras: IRegra[];
    regrasUsuario: IRegra[];
    usuario: IUsuarioCompleto;
}

export interface ILoaderRegrasEPermissoes {
    response?: {
        data: {
            errors: {
                default?: string
            }
        }
    }
}