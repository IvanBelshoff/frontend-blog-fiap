import React from 'react';
import {
    Box,
    Button,
    Icon,
    Paper,
    Tooltip,
    Typography
} from '@mui/material';
import { BsFilePost } from 'react-icons/bs';

import { IRegra } from '../../../interfaces';
import { Environment } from '../../../environment';
import { IStatusDeRolagemProps } from '../interfaces/interfaces';


export const StatusDeRolagem: React.FC<IStatusDeRolagemProps> = ({
    regras,
    tipo,
    regrasUsuario,
    aoClicarEmTipoRegra,
    aoClicarEmTipoPermissao }) => {

    const iconMap: Record<string, React.ReactNode> = {
        professor: <Icon><BsFilePost /></Icon>,
        usuario: <Icon>manage_accounts</Icon>,
    };

    const labelMap: Record<string, string> = {
        professor: 'Professores',
        usuario: 'Usuários',
    };

    const HandleFormatarString = (input: string): string => {
        // Remover underlines e substituir por espaços
        const semUnderlines = input.replace(/_/g, ' ');

        return semUnderlines;
    };

    const HandleGeneratePermissionIcons = (regra: IRegra, regrasUsuario: IRegra[]) => {
        return (
            <>
                <Tooltip title={HandleFormatarString(regra.nome)}>
                    <Icon color={regrasUsuario.some((userRegra) => userRegra.nome === regra.nome) ? 'primary' : 'disabled'}>
                        {regra.nome == Environment.REGRAS.REGRA_ADMIN ? 'admin_panel_settings' : 'visibility'}
                    </Icon>
                </Tooltip>


                {regra.permissao.map((permission, index) => {
                    const hasPermission = regrasUsuario
                        .filter((userRegra) => userRegra.id === regra.id)
                        .map((userRegra) => userRegra.permissao)
                        .flat()
                        .some((userPermission) => userPermission.nome === permission.nome);

                    return (
                        <Tooltip key={index} title={HandleFormatarString(permission.nome)}>
                            <Icon

                                color={hasPermission ? 'primary' : 'disabled'}
                            >
                                {permission.nome.includes('CRIAR') ? 'add' :
                                    (permission.nome.includes('DELETAR') ? 'delete' :
                                        (permission.nome.includes('ATUALIZAR') ? 'edit' : (
                                            permission.nome.includes('CONCEDER') ? 'swap_horiz' : ''
                                        )))}
                            </Icon>
                        </Tooltip>
                    );
                })}
            </>
        );
    };

    const HandleGenerateRegraIcons = (regra: string) => {
        if (regra === Environment.REGRAS.REGRA_PROFESSOR) {
            return <Icon><BsFilePost /></Icon>;
        } else if (regra === Environment.REGRAS.REGRA_USUARIO) {
            return <Icon>account_circle</Icon>;
        } else {
            return <Icon>admin_panel_settings</Icon>;
        }
    };

    return (

        <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent={'center'}
            component={Paper}
            variant="outlined"
            paddingBottom={1}
            paddingTop={1}
        >
            <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent={'center'}>
                <Typography variant="h6" component={Button} startIcon={iconMap[tipo]} onClick={() => aoClicarEmTipoRegra(tipo)}>
                    {`Regra de Gerenciamento de ${labelMap[tipo]}`}
                </Typography>
            </Box>

            <Box width="100%" display="flex" gap={1} flexDirection="column" alignItems="center" justifyContent={'center'}>
                {regras
                    .filter((regra) => {
                        const allowedRules = {
                            professor: [Environment.REGRAS.REGRA_PROFESSOR],
                            usuario: [Environment.REGRAS.REGRA_ADMIN, Environment.REGRAS.REGRA_USUARIO],
                        };
                        return allowedRules[tipo].includes(regra.nome);
                    })
                    .map((regra) => (
                        <Box key={regra.id} width="100%" display="flex" alignItems="center" justifyContent="center">
                            <Box width="100%" display="flex" alignItems="center" justifyContent="center">
                                <Typography variant="h6" component={Button} startIcon={HandleGenerateRegraIcons(regra.nome)} onClick={() => aoClicarEmTipoPermissao(regra.nome, tipo)}>
                                    Permissões:
                                </Typography>
                                {HandleGeneratePermissionIcons(regra, regrasUsuario)}
                            </Box>
                        </Box>
                    ))}
            </Box>
        </Box>

    );
};
