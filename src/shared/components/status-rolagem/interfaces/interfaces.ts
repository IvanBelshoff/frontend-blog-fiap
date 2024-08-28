import { IRegra } from '../../../interfaces';

export interface IStatusDeRolagemProps {
    tipo: 'professor' | 'usuario';
    regras: IRegra[];
    regrasUsuario: IRegra[];
    aoClicarEmTipoRegra: (tipo: 'professor' | 'usuario') => void
    aoClicarEmTipoPermissao: (regra: string, tipo: 'professor' | 'usuario') => void
}