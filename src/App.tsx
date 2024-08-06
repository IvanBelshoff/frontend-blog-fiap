import { RouterProvider } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { routes } from './routes';
import { AppThemeProvider, AuthProvider, IndexProvider } from './shared/contexts';
import { Loading } from './shared/components';

function App() {

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/png" href={window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? '/assets/favicons/favicon-white.png' : '/assets/favicons/favicon-black.png'} />
      </Helmet>
      <AuthProvider>
        <AppThemeProvider>
          <IndexProvider>
            <RouterProvider router={routes} fallbackElement={<Loading />} />
          </IndexProvider>
        </AppThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;