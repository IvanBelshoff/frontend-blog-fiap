import {
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams
} from 'react-router-dom';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';

import { useAuth } from '../../../shared/contexts';
import { FerramentasDaListagem } from '../../../shared/components/ferramentas-da-listagem/component/FerramentasDaListagem';
import { LayoutBaseDePagina } from '../../../shared/layouts/LayoutBaseDePagina';
import {
  IListagemDeUsuarios,
  IResponseListagemDeUsuariosAction
} from '../../../shared/interfaces';
import { Environment } from '../../../shared/environment';
import { format } from 'date-fns';

export const ListagemDeUsuarios = () => {

  // Hooks do React para navegação, tema, etc.
  const navigation = useNavigation();
  const { userId } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const loaderData = useLoaderData() as IListagemDeUsuarios;
  const actionData = useActionData() as IResponseListagemDeUsuariosAction;

  // State para controle do diálogo de confirmação e snackbar
  const [usuarioId, setUsuarioId] = useState<number>();
  const [tipo, setTipo] = useState<'Dialog' | 'Snackbar' | ''>('');
  const [open, setOpen] = useState<boolean>(false);
  const [messageSnackbar, setMessageSnackbar] = useState<string>('');
  const [typeSeverity, setTypeSeverity] = useState<'success' | 'error'>('success');

  // Hooks para manipulação da barra de busca e paginação
  const [searchParams, setSearchParams] = useSearchParams();
  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);
  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  // Função para fechar o diálogo de confirmação
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Função para fechar a snackbar
  const handleCloseSnackbar = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setMessageSnackbar('');
  };

  // Função para atualizar os parâmetros da busca na URL
  const handleSearchParams = (
    paramBusca: string = busca,
    paramPagina: string = String(pagina),
  ) => {
    setSearchParams({
      busca: paramBusca,
      pagina: paramPagina,
    }, { replace: true });
  };

  // Efeito colateral para tratar ações após a execução da carga de dados
  useEffect(() => {

    if (loaderData.totalCount <= 4) {
      navigate('/blog/usuarios?busca=&pagina=1');
    }

    if (actionData?.errors?.default) {
      setMessageSnackbar(actionData?.errors.default);
      setOpen(true);
      setTipo('Snackbar');
      setTypeSeverity('error');
      handleSearchParams();
    }

    if (actionData?.success?.message) {
      setMessageSnackbar(actionData?.success.message);
      setOpen(true);
      setTipo('Snackbar');
      setTypeSeverity('success');
      handleSearchParams();
    }

  }, [actionData]);

  return (
    <LayoutBaseDePagina
      titulo='Gerenciamento de Usuários'
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="novo"
          mostrarInputBusca={true}
          textoDaBusca={busca}
          aoClicarEmNovo={() => navigate('novo')}
          aoMudarTextoDeBusca={texto => handleSearchParams(texto)}
        />

      }
    >

      <Dialog
        open={open && tipo == 'Dialog' ? true : false}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        hidden={!open || tipo !== 'Dialog'}
      >
        <DialogTitle id="alert-dialog-title" align="center">
          Deletar Usuário
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            Deseja Realmente apagar este Usuário?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Form method='DELETE' onSubmit={handleCloseDialog}>
            <input type="hidden" name="id" value={usuarioId} />
            <Button type='submit' autoFocus>
              Apagar
            </Button>
          </Form>

        </DialogActions>
      </Dialog>

      <Snackbar
        open={open && tipo == 'Snackbar' ? true : false}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={typeSeverity} sx={{ width: '100%' }}>
          {messageSnackbar}
        </Alert>
      </Snackbar>

      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table >
          <TableHead >
            <TableRow >
              <TableCell style={{ textAlign: 'center' }}>Visualizar</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Nome</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Status</TableCell>
              <TableCell style={{ textAlign: 'center' }}>E-mail</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Data de criação</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaderData.data.map((usuario) => (
              <TableRow key={usuario.id}>

                <TableCell style={{ textAlign: 'center' }}>
                  <Tooltip title="Visualizar e editar detalhes">
                    <IconButton size="medium" onClick={() => navigate(`/blog/usuarios/detalhes/${pagina}/${usuario.id}`)}>
                      <Icon color="primary" fontSize="medium">open_in_new</Icon>
                    </IconButton>
                  </Tooltip>
                </TableCell>

                <TableCell style={{ textAlign: 'center' }}><Typography variant='body2'>{usuario.nome} {usuario.sobrenome}</Typography></TableCell>

                <TableCell style={{ textAlign: 'center' }}>{String(usuario.bloqueado) == 'false' ? (

                  <Tooltip title="Usuário Ativo">
                    <Icon color="success" fontSize="medium">check_circle</Icon>
                  </Tooltip>

                ) : (

                  <Tooltip title="Usuário Bloqueado">
                    <Icon color="error" fontSize="medium">remove_circle</Icon>
                  </Tooltip>

                )}</TableCell>

                <TableCell style={{ textAlign: 'center' }}><Typography variant='body2'>{usuario.email}</Typography></TableCell>

                <TableCell style={{ textAlign: 'center' }}><Typography variant='body2'>{usuario.data_criacao ? format(new Date(usuario.data_criacao), 'dd/MM/yyyy') : 'Desconhecido'}</Typography></TableCell>

                <TableCell style={{ textAlign: 'center' }}>

                  <IconButton onClick={() => {
                    setUsuarioId(usuario.id);
                    setTipo('Dialog');
                    setOpen(true);
                  }}
                    disabled={Number(userId) == usuario.id ? true : false}
                  >

                    <Tooltip title="Deletar Usuário">
                      <Icon color={Number(userId) == usuario.id ? 'disabled' : 'primary'} >delete</Icon>
                    </Tooltip>

                  </IconButton>

                </TableCell>
              </TableRow>

            ))}
          </TableBody>
          {loaderData.totalCount === 0 && navigation.state == 'idle' && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}
          <TableFooter>
            {navigation.state !== 'idle' && (
              <TableRow >
                <TableCell colSpan={8} >

                  <LinearProgress sx={{ backgroundColor: theme.palette.primary.dark }} variant='indeterminate' />

                </TableCell>
              </TableRow>
            )}
            {(loaderData.totalCount > 0 && loaderData.totalCount > Environment.LIMITE_DE_LINHAS_TABLE_FUNCIONARIOS) && (
              <TableRow>
                <TableCell colSpan={8} >
                  <Pagination
                    color="primary"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    page={pagina}
                    count={Math.ceil(loaderData.totalCount / Environment.LIMITE_DE_LINHAS_TABLE_FUNCIONARIOS)}
                    onChange={(_, newPage) => handleSearchParams(undefined, newPage.toString())}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  );
};
