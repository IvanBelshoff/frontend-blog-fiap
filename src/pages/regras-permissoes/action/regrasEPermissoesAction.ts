
import {
  LoaderFunctionArgs, json,
} from 'react-router-dom';
import { UsuariosService } from '../../../shared/services';
import { AxiosError } from 'axios';
import {
  IActionRegrasEPermissoes,
  IRegrasEPermissoesAction
} from '../interfaces/interfaces';

export async function RegrasEPermissoesAction({ request, params }: LoaderFunctionArgs) {

  // Verificação se a requisição é do tipo PATCH
  if (request.method === 'PATCH') {

    // Extração do ID do parâmetro
    const id = params.id;

    // Extração dos dados do formulário da requisição
    const formData = await request.formData();

    // Extração dos subordinados do formulário e conversão para números
    const rawRegras = formData.getAll('regras');
    const regras = rawRegras.map(sub => Number(sub));

    const rawPermissoes = formData.getAll('permissoes');
    const permissoes = rawPermissoes.map(sub => Number(sub));

    // Chamada do serviço para atualizar os subordinados
    const atualizaPermissoes = await UsuariosService.UpdateRolesAndPermissionsById(Number(id), regras, permissoes);

    // Verificação se ocorreu um erro durante a atualização
    if (atualizaPermissoes instanceof AxiosError) {

      // Extração dos erros da resposta
      const errors = (atualizaPermissoes as IActionRegrasEPermissoes).response?.data.errors;

      // Manipulação de erros específicos
      if (atualizaPermissoes.response?.status != 400) {

        // Lançamento de uma resposta JSON para o cliente em caso de erro
        throw json(
          { message: errors?.default || 'Erro Interno do Servidor' },
          { status: atualizaPermissoes?.response?.status || 500 }
        );

      }

      const response: IRegrasEPermissoesAction = {
        errors: errors
      };

      // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
      return response;

    }

    const response: IRegrasEPermissoesAction = {
      success: {
        message: 'Cadastro foi atualizado',
      }
    };

    // Retorno de sucesso para ser tratado pelo componente
    return response;

  }
}