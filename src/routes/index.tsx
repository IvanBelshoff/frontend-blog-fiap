import {
    useEffect,
    useState
} from 'react';
import {
    LoaderFunctionArgs,
    Navigate,
    createBrowserRouter,
    redirect,
    useLocation
} from 'react-router-dom';

import {
    Errors,
    LoginAction,
    Login,
    DetalhesDeUsuariosAction,
    DetalhesDeUsuario,
    DetalhesDeUsuarioLoader,
    ListagemDeUsuariosAction,
    ListagemDeUsuarios,
    ListagemDeUsuariosLoader,
    NovoUsuarioAction,
    NovoUsuario,
    LoaderBlog,
    Post,
    LoaderPost,
    RegrasEPermissoes,
    RegrasEPermissoesAction,
    RegrasEPermissoesLoader,
    DetalhesDePost,
    DetalhesDePostLoader,
    BlogPost,
    BlogPostLoader,
} from '../pages';
import {
    AccountUserLoader,
    AcessoNegado,
    DrawerAppBar,
    Navbar,
} from '../shared/components';
import { Api } from '../shared/services/api';
import { useAuth } from '../shared/contexts/AuthContext';
import { Environment } from '../shared/environment';


// Variável para verificar se o usuário está logado
let logado = Boolean(JSON.parse(localStorage.getItem('token') || '""'));

// eslint-disable-next-line prefer-const
let regras: string[] | null = null;

const regrasString = localStorage.getItem('regras');

if (regrasString) {
    try {
        regras = JSON.parse(regrasString);
    } catch (error) {
        console.error('Erro ao fazer parse do JSON:', error);
    }
}

let permissoes: string[] | null = null;

const permissoesString = localStorage.getItem('permissoes');

if (permissoesString) {
    try {
        permissoes = JSON.parse(permissoesString);
    } catch (error) {
        console.error('Erro ao fazer parse do JSON:', error);
    }
}

const PrivateRoute = ({ children, requiredRoles, requiredPermissions }: { children: JSX.Element, requiredRoles: string[], requiredPermissions?: string[] }) => {

    const { regras, permissoes } = useAuth();

    const regrasUsuario: string[] = JSON.parse(regras || '');

    const permissoesUsuario: string[] = JSON.parse(permissoes || '');

    const hasRequiredRoles = requiredRoles.every(role => regrasUsuario?.includes(role));

    const hasRequiredPermissions = requiredPermissions?.every(permission => permissoesUsuario?.includes(permission));

    if (requiredRoles.every(() => regras?.includes(Environment.REGRAS.REGRA_ADMIN))) {
        return children;
    }

    if (requiredRoles && !hasRequiredRoles) {

        console.log('não possui a regra desejada');
        //return <Navigate to={`/acesso-negado${location.pathname}`} state={{ from: location }} replace />;
        return <AcessoNegado regras={requiredRoles} permissoes={requiredPermissions} />;
    }

    if (requiredPermissions && !hasRequiredPermissions) {

        console.log('não possui a permissao desejada');
        //return <Navigate to={`/acesso-negado${location.pathname}`} state={{ from: location }} replace />;
        return <AcessoNegado regras={requiredRoles} permissoes={requiredPermissions} />;
    }

    // console.log('permitido');

    return children;
};

// Componente de redirecionamento para a página de login
const RedirectLogin = ({ children }: { children: JSX.Element }) => {

    const { isAuthenticated } = useAuth();

    const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated);

    useEffect(() => {
        setAuthenticated(isAuthenticated);
    }, [LoginAction, logado]);

    const location = useLocation();

    if (authenticated == true && logado == true) {
        return <Navigate to="/blog" state={{ from: location }} replace />;
    }

    return children;

};

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

    const { isAuthenticated } = useAuth();

    const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated);

    useEffect(() => {
        setAuthenticated(isAuthenticated);
    }, [LoginAction, logado]);


    if (authenticated == false && logado == false) {
        return <Login />;
    }

    return children;

};

// Configuração das rotas
export const routes = createBrowserRouter([
    {
        path: '/',   // Rota principal do blog
        errorElement: <Errors />,
        element: <Navbar />,
        loader: LoaderBlog,
        children: [
            {
                index: true,
                id: 'home',
                async lazy() {

                    const { Blog } = await import('../pages');

                    return {
                        element: <Blog />,
                    };
                }
            },
            {
                path: '/detalhes/:pagina/:id',
                element: <BlogPost />,
                loader: BlogPostLoader
            }
        ]
    },
    {
        path: 'login', // Rota de login
        async action({ request }) {
            return LoginAction(request);
        },
        element: <RedirectLogin><Login /></RedirectLogin>,
        errorElement: <Errors />
    },
    {
        path: 'blog',  // Rota principal de gerenciamento do blog
        id: 'root',
        element: <ProtectedRoute ><DrawerAppBar /></ProtectedRoute >,
        loader: AccountUserLoader,
        errorElement: <Errors />,
        async action({ request }) {

            if (logado == true) {
                return null;
            } else {
                return LoginAction(request);
            }

        },
        children: [
            {
                index: true,
                async lazy() {

                    const { Home } = await import('../pages');

                    return {
                        element: <Home />,
                        //loader: HomeLoader
                    };
                }
            },
            {
                path: 'posts',
                element: <Post />,
                loader: LoaderPost
            },
            {
                path: 'posts/detalhes/:pagina/:id',
                element: <DetalhesDePost />,
                loader: DetalhesDePostLoader,
                action: DetalhesDeUsuariosAction
            },
            {
                path: 'usuarios',
                element: <PrivateRoute requiredRoles={[Environment.REGRAS.REGRA_USUARIO]}><ListagemDeUsuarios /></PrivateRoute>,
                action: ListagemDeUsuariosAction,
                async loader({ request }) {
                    if (Environment.validaRegraPermissaoComponentsMetodos(regras, [Environment.REGRAS.REGRA_USUARIO])) {
                        return ListagemDeUsuariosLoader(request);
                    } else {
                        return null;
                    }
                }
            },
            {
                path: 'usuarios/novo',
                element: <PrivateRoute requiredRoles={[Environment.REGRAS.REGRA_USUARIO]} requiredPermissions={[Environment.PERMISSOES.PERMISSAO_CRIAR_USUARIO]}><NovoUsuario /></PrivateRoute>,
                action: NovoUsuarioAction,
            },
            {
                path: 'usuarios/detalhes/:pagina/:id',
                element: <PrivateRoute requiredRoles={[Environment.REGRAS.REGRA_USUARIO]}><DetalhesDeUsuario /></PrivateRoute>,
                action: DetalhesDeUsuariosAction,
                async loader({ params }) {
                    if (Environment.validaRegraPermissaoComponentsMetodos(regras, [Environment.REGRAS.REGRA_USUARIO])) {
                        return DetalhesDeUsuarioLoader(params);
                    } else {
                        return null;
                    }
                },
                children: [
                    {
                        path: 'regras/permissoes',
                        element: <PrivateRoute requiredRoles={[Environment.REGRAS.REGRA_ADMIN]}><RegrasEPermissoes /></PrivateRoute>,
                        action: RegrasEPermissoesAction,
                        async loader({ request, params }) {
                            if (Environment.validaRegraPermissaoComponentsMetodos(regras, [Environment.REGRAS.REGRA_ADMIN])) {
                                return RegrasEPermissoesLoader(request, params);
                            } else {
                                return null;
                            }

                        }
                    },
                ]
            }
        ]
    },
    {
        path: 'logout',
        async action({ request }: LoaderFunctionArgs) {

            if (request.method === 'POST') {

                try {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    Api().defaults.headers.Authorization = null;

                    logado = false;

                    return (redirect('/login'));

                } catch (error) {
                    console.log(error);
                }

            }

        },
    },
]);










