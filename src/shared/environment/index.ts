const validaRegraPermissaoComponents = (regras: string[] | null, regrasRequisitadas: string[], permissoes?: string[] | null, permissoesRequisitas?: string[]): boolean => {

    const permissaoRegra = regrasRequisitadas.every(regra => regras?.includes(regra));

    const permissaoPermissao = permissoesRequisitas?.every(permissao => permissoes?.includes(permissao));

    const regraAdmin = regras?.every(() => regras?.includes(Environment.REGRAS.REGRA_ADMIN));

    if (regras && regras.length == 0 && regrasRequisitadas.length > 0) {
        return true;
    }

    if (regraAdmin == true) {
        return false;
    }

    if (regras?.length == 0) {
        return true;
    }

    if (regrasRequisitadas && !permissaoRegra) {
        return true;
    }

    if (regrasRequisitadas && permissaoRegra && !permissoesRequisitas) {
        return false;
    }

    if (regrasRequisitadas && permissaoRegra && permissoesRequisitas && !permissaoPermissao) {
        return true;
    }

    if (regrasRequisitadas && permissaoRegra == true && permissoesRequisitas && permissaoPermissao == true) {
        return false;
    }

    return true;
};

const validaRegraPermissaoComponentsMetodos = (regras: string[] | null, regrasRequisitadas: string[], permissoes?: string[] | null, permissoesRequisitas?: string[]): boolean => {

    const permissaoRegra = regrasRequisitadas?.every(regra => regras?.includes(regra));

    const permissaoPermissao = permissoesRequisitas?.every(permissao => permissoes?.includes(permissao));

    const regraAdmin = regras?.every(() => regras?.includes(Environment.REGRAS.REGRA_ADMIN));

    if (regras && regras.length == 0 && regrasRequisitadas.length > 0) {
        return false;
    }

    if (regraAdmin == true) {
        return true;
    }

    if (regras?.length == 0) {
        return false;
    }

    if (regrasRequisitadas && !permissaoRegra) {
        return false;
    }

    if (regrasRequisitadas && permissaoRegra && !permissoesRequisitas) {
        return true;
    }

    if (regrasRequisitadas && permissaoRegra && permissoesRequisitas && !permissaoPermissao) {
        return false;
    }

    if (regrasRequisitadas && permissaoRegra == true && permissoesRequisitas && permissaoPermissao == true) {
        return true;
    }

    return false;
};


export const Environment = {

    BASE_URL: import.meta.env.VITE_REACT_APP_BASE_URL,

    LISTAGEM_VAZIA: import.meta.env.VITE_REACT_APP_LISTAGEM_VAZIA,

    LIMITE_DE_POSTS: import.meta.env.VITE_REACT_APP_LIMITE_DE_POSTS,

    LIMITE_DE_ICONES: import.meta.env.VITE_REACT_APP_LIMITE_DE_ICONES,

    LIMITE_DE_LINHAS_TABLE_FUNCIONARIOS: import.meta.env.VITE_REACT_APP_LIMITE_DE_LINHAS_TABLE_FUNCIONARIOS,

    INPUT_DE_BUSCA: import.meta.env.VITE_REACT_APP_INPUT_DE_BUSCA,

    TIME_DEBOUNCE: import.meta.env.VITE_REACT_APP_TIME_DEBOUNCE || 300,

    REGRAS: {
        REGRA_ADMIN: 'REGRA_ADMIN',
        REGRA_USUARIO: 'REGRA_USUARIO',
        REGRA_PROFESSOR: 'REGRA_PROFESSOR'
    },

    PERMISSOES: {
        PERMISSAO_DELETAR_USUARIO: 'PERMISSAO_DELETAR_USUARIO',
        PERMISSAO_ATUALIZAR_USUARIO: 'PERMISSAO_ATUALIZAR_USUARIO',
        PERMISSAO_CRIAR_USUARIO: 'PERMISSAO_CRIAR_USUARIO',
        PERMISSAO_DELETAR_POSTAGEM: 'PERMISSAO_DELETAR_POSTAGEM',
        PERMISSAO_ATUALIZAR_POSTAGEM: 'PERMISSAO_ATUALIZAR_POSTAGEM',
        PERMISSAO_CRIAR_POSTAGEM: 'PERMISSAO_CRIAR_POSTAGEM'
    },

    validaRegraPermissaoComponents,
    validaRegraPermissaoComponentsMetodos
};