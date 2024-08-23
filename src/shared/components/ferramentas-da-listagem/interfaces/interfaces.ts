import { ReactNode } from 'react';

//FerramentasDaListagem
export interface IFerramentasDaListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    mostrarBotaoVoltar?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarFavoritos?: ReactNode;
    mostrarBotaoNovo?: boolean;
    disabledBotaoNovo: boolean;
    mostrarBotaoLogin?: boolean;
    aoClicarEmNovo?: () => void;
    aoClicarEmLogin?: () => void;
    aoClicarEmVoltar?: () => void;
}