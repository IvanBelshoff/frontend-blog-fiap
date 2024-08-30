import { IRegra } from '../../../interfaces';

export interface IRegrasAccordionsProps {
    tipo: 'professor' | 'usuario'
    regras: IRegra[];
    idsRegras: number[];
    disabledRegra: boolean;
    disabledPermissao: boolean;
    idsPermissoes: number[];
    refProfessor?: React.RefObject<HTMLDivElement>;
    refUsuario?: React.RefObject<HTMLDivElement>
    aoMarcarRegras: (ids: number[]) => void
    aoMarcarPermissoes: (ids: number[]) => void
    expandedRegra?: string;
}
