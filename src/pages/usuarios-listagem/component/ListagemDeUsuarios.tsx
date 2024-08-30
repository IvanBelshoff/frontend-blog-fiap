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
import { Environment } from '../../../shared/environment';

import { FerramentasDaListagem } from '../../../shared/components';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { format } from 'date-fns';
import {
  IListagemDeUsuariosAction,
  IListagemDeUsuariosLoader
} from '../interfaces/interfaces';
import { useDebouncedCallback } from 'use-debounce';

export const ListagemDeUsuarios = () => {

  const actionData = useActionData() as IListagemDeUsuariosAction;
  const loaderData = useLoaderData() as IListagemDeUsuariosLoader;
  const navigate = useNavigate();
  const navigation = useNavigation();

  const theme = useTheme();
  const { permissoes, regras } = useAuth();
  const { userId } = useAuth();
  const isLoading = navigation.state != 'idle';

  const [searchParams, setSearchParams] = useSearchParams();

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const [usuarioId, setUsuarioId] = useState<number>();
  const [tipo, setTipo] = useState<'Dialog' | 'Snackbar' | ''>('');
  const [open, setOpen] = useState<boolean>(false);
  const [messageSnackbar, setMessageSnackbar] = useState<string>('');
  const [typeSeverity, setTypeSeverity] = useState<'success' | 'error'>('success');

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setMessageSnackbar('');
  };

  const handleSearch = useDebouncedCallback((
    paramBusca: string = busca,
  ) => {
    setSearchParams({
      busca: paramBusca,
    }, { replace: true });
  }, Environment.TIME_DEBOUNCE);

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

    if (loaderData?.totalCount <= Environment.LIMITE_DE_LINHAS_TABLE_FUNCIONARIOS) {
      navigate(`/blog/usuarios?busca=${busca}&pagina=1`);
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

    console.log(loaderData)
  }, [actionData]);

  return (
    <LayoutBaseDePagina
      titulo={'Gerenciamento de Usuários'}
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="novo"
          mostrarInputBusca={true}
          disabledBotaoNovo={Environment.validaRegraPermissaoComponents(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_CRIAR_USUARIO])}
          textoDaBusca={busca}
          aoClicarEmNovo={() => navigate('novo')}
          aoMudarTextoDeBusca={texto => handleSearch(texto)}
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
              {Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_ADMIN]) && (
                <TableCell style={{ textAlign: 'center' }}>Permissões</TableCell>
              )}
              <TableCell style={{ textAlign: 'center' }}>Data de criação</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Último Acesso</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaderData?.data && loaderData.data.map((usuario) => (
              <TableRow key={usuario.id}>

                <TableCell style={{ textAlign: 'center' }}>
                  <Tooltip title="Visualizar e editar detalhes">
                    <IconButton size="medium" onClick={() => navigate(`detalhes/${pagina}/${usuario.id}`)}>
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

                {Environment.validaRegraPermissaoComponentsMetodos(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_ADMIN]) && (
                  <TableCell style={{ textAlign: 'center' }}>

                    <IconButton
                      size="medium"
                      onClick={() => navigate(`detalhes/${pagina}/${usuario.id}/regras/permissoes`)}
                    >
                      <Tooltip title="Visualizar e editar permissoes">
                        <Icon color={'primary'} fontSize="medium">rule</Icon>
                      </Tooltip>
                    </IconButton>

                  </TableCell>
                )}

                <TableCell style={{ textAlign: 'center' }}><Typography variant='body2'>{usuario.data_criacao ? format(new Date(usuario.data_criacao), 'dd/MM/yyyy HH:mm:ss') : 'Desconhecido'}</Typography></TableCell>

                <TableCell style={{ textAlign: 'center' }}><Typography variant='body2'>{usuario.ultimo_login ? format(new Date(usuario.ultimo_login), 'dd/MM/yyyy HH:mm:ss') : 'Desconhecido'}</Typography></TableCell>

                <TableCell style={{ textAlign: 'center' }}>

                  <IconButton
                    onClick={() => {
                      setUsuarioId(usuario.id);
                      setTipo('Dialog');
                      setOpen(true);
                    }}
                    disabled={Environment.validaRegraPermissaoComponents(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_DELETAR_USUARIO]) || Number(userId) == usuario.id}
                  >

                    <Tooltip title="Deletar Funcionario">
                      <Icon color={Environment.validaRegraPermissaoComponents(JSON.parse(regras || ''), [Environment.REGRAS.REGRA_USUARIO], JSON.parse(permissoes || ''), [Environment.PERMISSOES.PERMISSAO_DELETAR_USUARIO]) || Number(userId) == usuario.id ? 'disabled' : 'primary'} >delete</Icon>
                    </Tooltip>

                  </IconButton>

                </TableCell>

              </TableRow>

            ))}
          </TableBody>
          {(loaderData?.totalCount && loaderData.totalCount) === 0 && !isLoading && (
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
