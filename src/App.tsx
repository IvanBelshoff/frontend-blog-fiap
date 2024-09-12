import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { AppThemeProvider, AuthProvider, IndexProvider } from './shared/contexts';
import { Loading } from './shared/components';

function App() {

  return (
      <AuthProvider>
        <AppThemeProvider>
          <IndexProvider>
            <RouterProvider router={routes} fallbackElement={<Loading />}  />
          </IndexProvider>
        </AppThemeProvider>
      </AuthProvider>
  );
}

export default App;