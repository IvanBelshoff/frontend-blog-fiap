import {
    useEffect,
    useState
} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Icon,
    Paper,
    Typography
} from '@mui/material';
import { BsFilePost } from 'react-icons/bs';

import { Environment } from '../../../environment';
import { IRegrasAccordionsProps } from '../interfaces/interfaces';

export const RegrasAccordions: React.FC<IRegrasAccordionsProps> = ({
    regras,
    tipo,
    disabledPermissao,
    disabledRegra,
    idsRegras,
    idsPermissoes,
    aoMarcarPermissoes,
    aoMarcarRegras,
    refProfessor,
    refUsuario,
    expandedRegra
}) => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    
    const [expanded, setExpanded] = useState<string | false>(false);

    const HandleGenerateRegraIcons = (regra: string) => {
        if (regra === Environment.REGRAS.REGRA_PROFESSOR) {
            return <Icon><BsFilePost /></Icon>;
        } else if (regra === Environment.REGRAS.REGRA_USUARIO) {
            return <Icon>account_circle</Icon>;
        } else {
            return <Icon>admin_panel_settings</Icon>;
        }
    };

    const handleChange = (regra: string) => {
        setExpanded((prevExpanded) => (prevExpanded === regra ? false : regra));
    };

    const HandleFormatarString = (input: string): string => {
        // Remover underlines e substituir por espaços
        const semUnderlines = input.replace(/_/g, ' ');

        return semUnderlines;
    };

    const HandleVerificarIds = (ids: number[], id: number) => {
        // Verifica se o id já está presente no array
        const isIdPresente = ids.includes(id);

        if (isIdPresente) {
            // Se o id já estiver presente, remove-o do array
            const novosIdsRegras = ids.filter((regraId) => regraId !== id);

            return novosIdsRegras;

        } else {
            // Se o id não estiver presente, adiciona-o ao array
            return [...ids, id];
        }
    };

    useEffect(() => {

        if (expandedRegra && regras.find((regra) => regra.nome === expandedRegra)) {
            handleChange(expandedRegra);
        }

    }, [expandedRegra, regras]);

    return (
        <Box
            component={Paper}
            variant='outlined'
            ref={
                tipo == 'professor' ? refProfessor :
                    tipo == 'usuario' ? refUsuario : undefined
            }
            padding={2}
            width='100%'
            height='auto'
            display='flex'
            flexDirection={'column'}>
            <Box width='100%' display='flex' justifyContent='center' alignItems='center' marginBottom={1} >
                <Typography variant='h4'>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</Typography>
            </Box>

            {regras
                .filter((regra) => (tipo === 'professor' && [Environment.REGRAS.REGRA_PROFESSOR].includes(regra.nome)) ||
                    (tipo === 'usuario' && [Environment.REGRAS.REGRA_ADMIN, Environment.REGRAS.REGRA_USUARIO].includes(regra.nome)))
                .map((regra) => (
                    <Accordion
                        key={regra.id}
                        expanded={expanded === regra.nome}
                        onChange={() => handleChange(regra.nome)}
                    >
                        <AccordionSummary
                            expandIcon={<Icon>expand_more</Icon>}
                            aria-controls="panel1-content" id="panel1-header">
                            <FormGroup>
                                <FormControlLabel
                                    disabled={disabledRegra}
                                    control={
                                        <Checkbox
                                            {...label}
                                            checked={idsRegras.some(regraUsuario => regraUsuario === regra.id)}
                                            onChange={() => aoMarcarRegras(HandleVerificarIds(idsRegras, regra.id))}
                                        />
                                    }
                                    label={
                                        <Box display='flex' width='100%' justifyContent='center' alignItems='center' gap={1}>
                                            <Typography variant='h5' noWrap> {HandleFormatarString(regra.nome)}</Typography>
                                            {HandleGenerateRegraIcons(regra.nome)}
                                        </Box>
                                    }
                                />
                            </FormGroup>
                        </AccordionSummary>
                        <AccordionDetails  >
                            <FormControl sx={{ width: '100%', alignItems: 'center' }}>
                                <FormGroup row >
                                    {regra.permissao.map((permission) => (
                                        <FormControlLabel
                                            key={permission.id}
                                            disabled={disabledPermissao}
                                            control={
                                                <Checkbox
                                                    {...label}
                                                    checked={idsPermissoes.some(permissaoUsuario => permissaoUsuario === permission.id)}
                                                    onChange={() => aoMarcarPermissoes(HandleVerificarIds(idsPermissoes, permission.id))}
                                                />
                                            }
                                            label={
                                                <Typography variant='h6' letterSpacing={0.5} noWrap>
                                                    {HandleFormatarString(permission.nome)}
                                                </Typography>
                                            }
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                ))
            }

        </Box >
    );
};