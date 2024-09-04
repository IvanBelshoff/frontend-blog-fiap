import { IFoto } from "../../../interfaces";

export interface ICardPostProps {
    capa_url: string;
    titulo: string;
    conteudo: string;
    usuario_cadastrador: string;
    usuario_atualizador: string;
    data_criacao: Date;
    data_atualizacao: Date;
    aoCliclarNoCard?: () => void;
}
