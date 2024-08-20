import {
    useEffect,
    useState
} from 'react';
import {
    LoaderFunctionArgs,
    Navigate,
    createBrowserRouter,
    redirect,
    useLocation,
    useMatch,
    useResolvedPath
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
    DetalhesDePosts,
    DetalhesDePostsLoader,
} from '../pages';
import {
    AccountUserLoader,
    DrawerAppBar,
    Navbar,
} from '../shared/components';
import { Api } from '../shared/services/api';
import { useAuth } from '../shared/contexts/AuthContext';

// Variável para verificar se o usuário está logado
let logado = Boolean(JSON.parse(localStorage.getItem('token') || '""'));

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
        path: '/',   // Rota principal do organograma
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
                        //loader: LoaderBlog,
                    };
                }
            },
            {
                path: '/detalhes/:pagina/:id',
                element: <DetalhesDePosts />,
                loader: DetalhesDePostsLoader
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
        path: 'blog',  // Rota principal de gerenciamento do organograma
        id: 'root',
        element: <ProtectedRoute ><DrawerAppBar /></ProtectedRoute >,
        loader: AccountUserLoader,
        errorElement: <Errors />,
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
                path: 'usuarios',
                element: <ListagemDeUsuarios />,
                loader: ListagemDeUsuariosLoader,
                action: ListagemDeUsuariosAction,
            },
            {
                path: 'usuarios/novo',
                element: <NovoUsuario />,
                action: NovoUsuarioAction
            },
            {
                path: 'usuarios/detalhes/:pagina/:id',
                element: <DetalhesDeUsuario />,
                action: DetalhesDeUsuariosAction,
                loader: DetalhesDeUsuarioLoader
            }
        ],
        async action({ request }) {

            if (logado == true) {
                return null;
            } else {
                return LoginAction(request);
            }

        }

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










