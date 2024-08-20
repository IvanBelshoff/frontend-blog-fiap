import { ReactNode, SyntheticEvent } from 'react';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';


export interface IUsuario {
  id: number,
  nome: string,
  bloqueado: boolean,
  sobrenome: string,
  email: string,
  data_criacao: Date,
  data_atualizacao: Date,
  departamento: string,
  localidade: string,
  secao: string,
  ultimo_login: Date,
  usuario_atualizador: string,
  usuario_cadastrador: string
}
export interface IUsuarioCompleto extends IUsuario {
  foto: IFoto
}

export interface IAccountUserLoader {
  data: IUsuarioCompleto;
}

// interfaces genéricas
export interface IAtributosGeneric {
  originalName: string;
  nameAdjusted: string;
}

// Interfaces que são usadas por outras interfaces
export interface IDepartamento {
  originalName: string;
  nameAdjusted: string;
}

export interface ISecao {
  originalName: string;
  nameAdjusted: string;
}

export interface IEntidade {
  departamento: IDepartamento;
  secoes: ISecao[];
}

export interface IFoto {
  id: number;
  nome: string;
  originalname: string;
  tipo: string;
  tamanho: number;
  nuvem: boolean;
  local: string;
  url: string;
  width: number,
  height: number,
  data_criacao: string;
  data_atualizacao: string;
}

export interface IFuncionarioListagem {
  id: number,
  nome: string,
  sobrenome: string,
  email: string,
  ativo: boolean,
  cargo: string,
  descricao: string,
  telefone: string,
  celular: string,
  departamento: string,
  secao: string,
  localidade: string,
  data_criacao: Date,
  data_atualizacao: Date,
  children: IFuncionarioListagem[],
  parent: IFuncionarioListagem
  foto: IFoto
}

export interface IFiltrosAll {
  status: string[];
  statusCount: number;
  nomes: string[];
  nomesCount: number;
  vinculos: string[];
  vinculosCount: number;
  departamentos: string[];
  departamentosCount: number;
  secoes: string[]
  secaosCount: number;
  localidades: string[];
  localidadesCount: number
}

// funcionarios-detalhes começa aqui.
export interface IResponseActionDetalhesDeFuncionario {
  response?: {
    data: {
      errors?: {
        default?: string
        body?: {
          nome: string,
          sobrenome: string,
          email: string,
          descricao: string,
          telefone: string,
          celular: string,
          cargo: string,
          localidade: string,
          departamento: string,
          secao: string
        }
      },
    }
  }
  success?: {
    message: string
  },
  tipo?: 'atributos' | 'superior' | 'subordinados'
}

export interface IResponseDetalhesDeFuncionarioAction {
  errors?: {
    default?: string
    body?: {
      nome: string,
      sobrenome: string,
      email: string,
      matricula: string,
      descricao: string,
      telefone: string,
      celular: string,
      cargo: string,
      localidade: string,
      departamento: string,
      secao: string
      data_admissao?: string,
    }
  },
  success?: {
    message: string
  },
  tipo?: 'atributos' | 'superior' | 'subordinados'
}

export interface IDataDetalhesDeFuncionarioLoader {
  atributos: IEntidade[],
  funcionario: IFuncionarioDetalhes
}

export interface IsecoesComDepartamento {
  departamento: IDepartamento;
  originalName: string;
  nameAdjusted: string;
}

export interface IResponseLoaderDetalhesDeFuncionarios {
  response?: {
    data: {
      errors: {
        default?: string
      }
    }
  }
}

// funcionarios-listagem começa aqui.
export interface IResponseActionListagemDeFuncionarios {
  response?: {
    data: {
      errors?: {
        default?: string;
      };
      success?: {
        message?: string;
      };
    };
  };
}

export interface IResponseListagemDeFuncionariosAction {
  errors?: {
    default: string
  },
  success?: {
    message: string
  }
}

export interface IListagemDeUsuarios {
  data: IUsuarios[],
  totalCount: number
}

export interface IResponseLoaderListagemDeFuncionarios {
  response?: {
    data: {
      errors: {
        default?: string
      }
    }
  }
}

export interface IListagemDeFuncionariosAtributes {
  data: IFuncionarioListagem[];
  totalCount: number;
  atributos: IEntidade[];
  filtros?: IFiltrosAll
}

// funcionarios-novo começa aqui.
export interface IResponseActionNovoFuncionario {
  response?: {
    data: {
      errors?: {
        default?: string
        body?: {
          nome: string,
          sobrenome: string,
          email: string,
          descricao: string,
          telefone: string,
          celular: string,
          cargo: string,
          localidade: string,
          departamento: string,
          secao: string
        }
      },
      success?: {
        message?: string
      }
    }
  }
}

export interface IResponseNovoFuncionarioAction {
  errors?: {
    default?: string
    body?: {
      nome: string,
      sobrenome: string,
      email: string,
      matricula: string,
      descricao: string,
      telefone: string,
      celular: string,
      cargo: string,
      localidade: string,
      departamento: string,
      secao: string
      data_admissao: string
    }
  },
  success?: {
    message: string
  }
}

export interface IFuncionarioNovo {
  nome: string,
  sobrenome: string,
  email: string,
  matricula: string,
  descricao: string,
  telefone: string,
  celular: string,
  cargo: string,
  localidade: string,
  departamento: string,
  secao: string
  data_admissao: string;
  foto?: File
}

export interface INovoFuncionarioAtributes {
  atributos: IEntidade[]
}

export interface IResponseLoaderNovoFuncionario {
  response?: {
    data: {
      errors: {
        default?: string
      }
    }
  }
}

//home começa aqui.
export interface IResponsivePieChart {
  functionGetHeight: () => number,
  functionGetCx: () => number,
  functionGetCy: () => number,
  typePieChart: 'departamento' | 'localidade'
  charts: IChart;
  getDepartamentoAdjusted: (original: string) => string;
  getLocalidadeAdjusted: (original: string) => string;
}

export interface IChartListagem {
  data: IFuncionarioListagem[];
  totalCount: number;
  chart: IChart;
  atributos: IEntidade[];
  filtros?: IFiltrosAll;
}

export interface IResponseLoaderHome {
  response?: {
    data: {
      errors?: {
        default?: string
      }
    }
  }
}

//Login começa aqui
export interface IResponseActionLogin {
  response: {
    data: {
      errors?: {
        default?: string
        body?: {
          email: string,
          senha: string,
          emailRecuperacao: string
        }
      }
      success?: {
        recover?: {
          message: string
        }
        login?: {
          message: string
        }

      }
    }
  }
}

export interface IResponseLoginAction {
  errors?: {
    default?: string
    body?: {
      email: string,
      senha: string,
      emailRecuperacao: string
    }
  }
  success?: {
    recover?: {
      message: string
    }
    login?: {
      message: string
    }
  }
}

//Blog começa aqui
export interface IFuncionario {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  cargo: string;
  descricao: string;
  telefone: string;
  ativo: boolean
  matricula: number
  celular: string;
  departamento: string;
  secao: string;
  localidade: string;
  data_criacao: string;
  data_admissao: Date,
  data_atualizacao: string;
  parent: IFuncionario | undefined;
  children: IFuncionario[];
  nomeParent: string | undefined;
  nomesChildren: string[] | undefined
  foto: IFoto
}

export interface IAtributesBlog {
  data: {
    0: IFuncionario
  }
  filtros?: IFiltrosBlog
  atributos: IEntidade[]
}

export interface FormTree {
  id: string;
  name: string;
  cargo: string;
  celular: string;
  departamento: string;
  descricao: string;
  email: string;
  url: string;
  localidade: string;
  secao: string;
  nomeParent: string;
  nomesChildren: string[]
  telefone: string;
  data_admissao: Date;
}

export interface TreeNodeDatum {
  attributes: {
    id: string
    sobrenome: string;
    email: string,
    title: string;
    url: string
    departamento: string;
    cargo: string;
    nomeParent: string;
    nomesChildren: string[]
    descricao: string,
    telefone: string,
    data_admissao: Date,
    celular: string,
    secao: string,
    localidade: string
  }
  __rd3t: { collapsed: boolean; depth: number; id: string }
  children: TreeNodeDatum[]
  name: string
}

export interface LinkDatum {
  source: { x: number; y: number; };
  target: { x: number; y: number; };
}

export interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string | number | boolean>;
  children?: RawNodeDatum[];
}

export type SyntheticEventHandler = (evt: SyntheticEvent) => void;

export type AddChildrenFunction = (children: RawNodeDatum[]) => void;

export interface foreignObjectProps {
  width: number;
  height: number;
  x: number;
}

export interface toggleNode {
  toggleNode: () => void
}

export interface RenderForeignObjectNodeProps {
  nodeDatum: TreeNodeDatum;
  toggleNode: toggleNode['toggleNode'];
  foreignObjectProps: foreignObjectProps;
}

export interface IResponseLoaderBlog {
  response?: {
    data: {
      errors: {
        default?: string,
        query?: {
          filtros?: string
          id?: string
          nome?: string
          cargo?: string
          departamento?: string
          secao?: string
        }
      }
    }
  }
}

export interface IDataBlog {
  data: IFuncionario
  filtros?: IFiltrosBlog
  atributos: IEntidade[];
}

//usuarios-detalhes
export interface IResponseActionDetalhesDeUsuarios {
  response?: {
    data: {
      errors?: {
        default?: string
        body?: {
          nome: string,
          sobrenome: string,
          email: string,
          bloqueado: string,
          senha: string
        }
      },
    }
  }
  success?: {
    message: string
  },
  tipo?: 'foto' | 'atributos' | 'senha'
}

export interface IResponseDetalhesDeUsuarioAction {
  errors?: {
    default: string
    body?: {
      nome: string,
      sobrenome: string,
      email: string,
      bloqueado: string,
      senha: string
    }
  },
  success?: {
    message: string
  },
  tipo?: 'foto' | 'atributos' | 'senha'
}

export interface IResponseLoaderDetalhesDeUsuarios {
  response?: {
    data: {
      errors: {
        default?: string
      }
    }
  }
}

//usuarios-listagem
export interface IResponseActionListagemDeUsuarios {
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

export interface IResponseListagemDeUsuariosAction {
  errors?: {
    default: string
  },
  success?: {
    message: string
  }
}

export interface IResponseLoaderListagemDeUsuarios {
  response?: {
    data: {
      errors: {
        default?: string
      }
    }
  }
}

//Usuarios-novos começa aqui
export interface IResponseActionNovoUsuario {
  response?: {
    data: {
      errors?: {
        default?: string
        body?: {
          nome: string,
          sobrenome: string,
          email: string,
          senha: string,
        }
      },
      success?: {
        message?: string
      }

    }
  }
}

export interface IResponseNovoUsuarioAction {
  errors?: {
    default?: string
    body?: {
      nome: string,
      sobrenome: string,
      email: string,
      senha: string,
    }
  },
  success?: {
    message: string
  }
}

export interface IUsuarioNovo {
  nome: string,
  sobrenome: string,
  email: string,
  senha: string,
  foto?: File
}

//AccountUser começa aqui
export interface IAccountUserProps {
  account_circle: ReactNode
  about: ReactNode,
}

export interface IResponseLoaderAccountUser {
  response?: {
    data: {
      errors: {
        default?: string
      }
    }
  }
}

//AvatarListFuncionarios
export interface FuncionariosListagemProps {
  funcionarios: IFuncionarioListagem[];
  charts: IChart;
  quantidadeDeFuncionarios: number;
  getDepartamentoAdjusted: (original: string) => string;
  getLocalidadeAdjusted: (original: string) => string;
}

//CardFuncionario
export interface IcardFuncionario extends RenderForeignObjectNodeProps {
  handleOpenDrawer: (nodeDatum: TreeNodeDatum) => void;
}

//DrawerAppBar
export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

//FerramentasDaListagem
export interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  mostrarBotaoVoltar?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
}

// FerramentasDeDetalhes
export interface IFerramentasDeDetalhesProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoResetar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoResetarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;

  salvar?: ReactNode;
  salvarEFechar?: ReactNode

  resetar?: ReactNode;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
}

//FiltroFuncionarios
export interface IFiltroFuncionarios {
  tipo: 'listagem' | 'home'
  exibiFiltros: boolean;
  filtrosAplicados: boolean;
  filtrosFuncionarios: IFiltrosAll | undefined
  localidadesMap: IAtributosGeneric[]
  secoesMap: IAtributosGeneric[]
  departamentosMap: IAtributosGeneric[]
  vinculosMap: IAtributosGeneric[]
  nome: string | null
  status: string | null
  descricao: string | null
  localidade: string | null
  vinculos: string | null
  departamento: string | null
  secao: string | null
  aoSelecionarLocalidade: (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => void;
  aoSelecionarNome: (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => void;
  aoSelecionarStatus: (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => void;
  aoSelecionarDepartamento: (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => void;
  aoSelecionarSecao: (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => void;
  aoSelecionarVinculo: (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => void;
  aoSelecionarDescricao: (e: React.ChangeEvent<HTMLInputElement>) => void;
  aoClicarEmSearchDescricao: () => void
  aoClicarEmFiltrosAplicados: () => void
  aoClicarEmExibirFiltros: () => void
  aoClicarEmFecharFiltros: () => void
}

//FiltroBlog
export interface IFiltroBlog {
  exibiFiltros: boolean;
  filtrosAplicados: boolean;
  modoBuscaLivre: boolean;
  filtrosBlog: IFiltrosBlog | undefined
  localidade: string | null
  localidadesMap: IAtributosGeneric[]
  secoesMap: IAtributosGeneric[]
  departamentosMap: IAtributosGeneric[]
  nome: string | null
  descricao: string | null
  departamento: string | null
  secao: string | null
  cargo: string | null
  cargoBuscaLivre: string | null
  aoSelecionarLocalidade: (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => void;
  aoSelecionarNome: (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => void;
  aoSelecionarDepartamento: (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => void;
  aoSelecionarSecao: (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => void;
  aoSelecionarCargo: (_: React.SyntheticEvent<Element, Event>, newValue: string | null) => void;
  aoSelecionarCargoBuscaLivre: (e: React.ChangeEvent<HTMLInputElement>) => void;
  aoSelecionarDescricao: (e: React.ChangeEvent<HTMLInputElement>) => void;
  aoClicarEmSearchCargo: () => void
  aoClicarEmSearchDescricao: () => void
  aoClicarEmFiltrosAplicados: () => void
  aoClicarEmExibirFiltros: () => void
  aoClicarEmFecharFiltros: () => void
  aoMudarModoDeBusca: () => void;
}

//FloatingButtons
export interface IFloatingButtonsProps {
  exibiFiltros: boolean
}

//TemporaryDrawerFuncionario
export interface ITemporaryDrawerFuncionarioProps extends Omit<IFuncionario, 'sobrenome' | 'data_atualizacao' | 'data_criacao' | 'foto' | 'children' | 'parent'> {
  open: boolean;
  url: string;
  onClose: () => void;
}

//FuncionarioSubordinados
export interface IResponseActionFuncionarioSubordinados {
  response?: {
    data: {
      errors?: {
        default?: string
      }
    }
  }
  success?: {
    message: string
  },
  tipo?: 'atributos' | 'superior' | 'subordinados'
}

export interface IResponseFuncionarioSubordinadosAction {
  errors?: {
    default: string
  },
  success?: {
    message: string
  },
  tipo?: 'atributos' | 'superior' | 'subordinados'
}

export interface ISubordinadosDisponiveis {
  data: {
    children: Omit<IFuncionario, 'children' | 'foto'>[]
    childrenDisponiveis: Omit<IFuncionario, 'children' | 'foto'>[]
  }
}

export interface IResponseLoaderFuncionarioSubordinados {
  response?: {
    data: {
      errors: {
        default?: string
      }
    }
  }
}

//FuncionarioSuperior
export interface IResponseActionFuncionarioSuperior {
  response?: {
    data: {
      errors?: {
        default?: string
      },
    }
  }
  success?: {
    message: string
  },
  tipo?: 'atributos' | 'superior' | 'subordinados'
}

export interface ISuperioresDisponiveis {
  data: {
    parent: Omit<IFuncionario, 'children' | 'foto'>
    parentDisponiveis: Omit<IFuncionario, 'children' | 'foto'>[]
  }
}

export interface IResponseFuncionarioSuperiorAction {
  errors?: {
    default: string
  },
  success?: {
    message: string
  },
  tipo?: 'atributos' | 'superior' | 'subordinados'
}

export interface IResponseLoaderFuncionarioSuperior {
  response?: {
    data: {
      errors: {
        default?: string
      }
    }
  }
}

//ListaCustomizadaSubordinados
export interface IListaCustomizadaSubordinadosProps {
  titulo: string,
  funcionarios: Omit<IFuncionario, 'children' | 'foto'>[]
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  lado: 'left' | 'right',
  handleToggleAll: (funcionarios: readonly Omit<IFuncionario, 'children' | 'foto'>[]) => () => void,
  funcionarioOfChecked: (items: readonly Omit<IFuncionario, 'children' | 'foto'>[]) => number,
  handleToggle: (value: Omit<IFuncionario, 'children' | 'foto'>) => () => void,
  checked: readonly Omit<IFuncionario, 'children' | 'foto'>[]
}

//ListaCustomizadaSuperior
export interface IListaCustomizadaSuperiorProps {
  titulo: string,
  funcionario: Omit<IFuncionario, 'children' | 'foto'> | undefined
  selectedSuperior: Omit<IFuncionario, 'children' | 'foto'> | null,
  handleSelectedSuperior: (funcionario: Omit<IFuncionario, 'children' | 'foto'>, selectedSuperior: Omit<IFuncionario, 'children' | 'foto'> | null) => () => void,
}

//ListaCustomizadaSuperiores
export interface IListaCustomizadaSuperioresProps {
  titulo: string,
  funcionarios: Omit<IFuncionario, 'children' | 'foto'>[],
  selectedFuncionario: Omit<IFuncionario, 'children' | 'foto'> | null,
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSelectedFuncionario: (funcionario: Omit<IFuncionario, 'children' | 'foto'>, selectedFuncionario: Omit<IFuncionario, 'children' | 'foto'> | null) => () => void
}

//ModalUsuario
export interface IModalUsuarioProps {
  openModalConta: boolean
  aoClicarEmFecharModal: () => void
}

export interface IUsuarioModal {
  nome: string,
  sobrenome: string,
  email: string,
  id: number,
  senha?: string
}

export interface IResponseModalUsuarioAction {
  errors?: {
    default: string
    body?: {
      nome: string,
      sobrenome: string,
      email: string,
      bloqueado: string,
      senha: string
    }
  },
  success?: {
    message: string
  },
  tipo?: 'foto' | 'atributos' | 'senha'
}

//VerticalToggleButtons
export interface IVerticalToggleButtonsProps {
  aoClicarEmToggleButtonGroup?: (event: React.MouseEvent<HTMLElement, MouseEvent>, value: 'account_circle' | 'supervisor_account' | 'groups') => void;
  selectedView: 'account_circle' | 'supervisor_account' | 'groups'
}

export interface IResponseErrosGeneric {
  response?: {
      data: {
          errors?: {
              default?: string
          }
      },
      status?: string
  }
}

//AuthContext
export interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  regras: string | null;
  setRegras: React.Dispatch<React.SetStateAction<string | null>>;
  permissoes: string | null;
  setPermissoes: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface IAuthContextProps {
  children: React.ReactNode
}

//IndexContext
export interface IndexContextProps {
  selectedIndex: number | undefined;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface IIndexContextProps {
  children: React.ReactNode
}

//ThemeContext
export interface IThemeContextData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void;
}

export interface IAppThemeProviderProps {
  children: React.ReactNode
}

//LayoutBaseDeBlog
export interface ILayoutBaseDeBlogProps {
  children: ReactNode;
}

//LayoutBaseDePagina
export interface ILayoutBaseDePaginaProps {
  children: React.ReactNode
  titulo: string;
  alert?: ReactNode;
  barraDeFerramentas?: ReactNode;
  group?: ReactNode;
}

//funcionariosService
export interface IFuncionarioComTotalCount {
  data: IFuncionarioListagem[];
  totalCount: number;
}

export interface IFuncionarioDetalhes {
  id: number,
  nome: string,
  sobrenome: string,
  email: string,
  matricula: string,
  ativo: boolean,
  cargo: string,
  descricao: string,
  telefone: string,
  celular: string,
  departamento: string,
  secao: string,
  localidade: string,
  data_admissao?: Date,
  data_criacao: Date,
  data_atualizacao: Date,
  foto: IFoto,
  children: IFuncionarioListagem[],
  parent: IFuncionarioListagem
}

//blogService
export interface IFiltrosBlog {
  ids: number[];
  idsCount: number;
  nomes: string[];
  nomesCount: number;
  departamentos: string[];
  departamentosCount: number;
  cargos: string[];
  cargosCount: number;
  secoes: string[]
  secaosCount: number;
  localidades: string[];
  localidadesCount: number
}

export interface IChartDepartamento {
  id: number | string,
  quantidadeFuncionarios: number
  departamento: string
  rgb: string
}

export interface IChartLocalidade {
  id: number | string,
  quantidadeFuncionarios: number
  localidade: string
  rgb: string
}

export interface IChart {
  chartDepartamento: IChartDepartamento[]
  chartLocalidade: IChartLocalidade[]
}

//usuariosService

export interface IPosts {
  id: number,
  titulo: string,
  conteudo: string
  visivel: boolean,
  usuario_cadastrador: string,
  usuario_atualizador: string,
  data_criacao: Date,
  data_atualizacao: Date,
  foto: IFoto
}

export interface IPostsComTotalCount {
  data: IPosts[];
  totalCount: number;
}

export interface IUsuarios {
  id: number,
  nome: string,
  sobrenome: string,
  email: string,
  bloqueado: boolean,
  data_criacao: Date,
  data_atualizacao: Date,
}

export interface IUsuarioComTotalCount {
  data: IUsuarios[];
  totalCount: number;
}

export interface IDetalhesDeUsuarios {
  data: {
    id: number,
    nome: string,
    sobrenome: string,
    email: string,
    bloqueado: string,
    data_criacao: Date,
    data_atualizacao: Date,
    foto: IFoto
  }
}

export interface IPostCompleto extends IPosts {
  foto: IFoto
}

export interface IDataToken {
  accessToken: string;
  id: number;
  regras: string[];
  permissoes: string[];
}


export interface IModalSobreProps {
  openModalSobre: boolean
  aoClicarEmFecharModal: () => void
}



