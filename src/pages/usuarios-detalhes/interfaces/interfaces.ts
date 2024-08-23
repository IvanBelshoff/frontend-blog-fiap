import { IDepartamento, IUsuarioCompleto } from '../../../shared/interfaces';

//detalhesDeUsuariosAction
export interface IActionDetalhesDeUsuarios {
    response?: {
        data: {
            errors?: {
                default?: string
                body?: {
                    nome: string,
                    sobrenome: string,
                    email: string,
                    localidade: string,
                    departamento: string,
                    secao: string
                    bloqueado: string,
                    senha: string,
                    id_copy_dashboards: string,
                    id_copy_regras: string
                }
            },
        }
    }
    success?: {
        message: string
    },
    tipo?: 'foto' | 'atributos' | 'senha'
}

//DetalhesDeUsuario
export interface IDetalhesDeUsuarioAction {
    errors?: {
        default?: string
        body?: {
            nome: string,
            sobrenome: string,
            email: string,
            bloqueado: string,
            senha: string,
        }
    },
    success?: {
        message: string
    },
    tipo?: 'foto' | 'atributos' | 'senha'
}

export interface IsecoesComDepartamento {
    departamento: IDepartamento;
    originalName: string;
    nameAdjusted: string;
}

export interface IFormUsuario {
    nome: string;
    sobrenome: string;
    email: string;
    bloqueado: string;
    senha: string;
    usuario_atualizador: string;
    usuario_cadastrador: string;
    ultimo_login: Date;
    data_atualizacao: Date;
    data_criacao: Date;
}

export interface IDetalhesDeUsuarioLoader {
    usuario: IUsuarioCompleto;
}

//detalhesDeUsuarioLoader
export interface ILoaderDetalhesDeUsuario {
    response?: {
        data: {
            errors: {
                default?: string
            }
        }
    }
}