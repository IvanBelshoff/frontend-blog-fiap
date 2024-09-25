import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { BsFilePost } from "react-icons/bs";

import "../css/styles.css";
import { useAuth } from "../../../contexts";
import { IAcessoNegado } from "../interfaces/interfaces";

export const AcessoNegado: React.FC<IAcessoNegado> = ({
  regras,
  permissoes,
}) => {
  // Utiliza um hook para realizar chamadas à API
  const fetcher = useFetcher();
  const navigate = useNavigate();

  // Obtém informações de autenticação
  const { isAuthenticated } = useAuth();

  const theme = useTheme();

  const xsOnly = useMediaQuery(theme.breakpoints.only("xs"));
  const smOnly = useMediaQuery(theme.breakpoints.only("sm"));
  const mdOnly = useMediaQuery(theme.breakpoints.only("md"));
  const lgOnly = useMediaQuery(theme.breakpoints.only("lg"));

  const isLoading = fetcher.formData != null;

  // Estado para controlar a abertura/fechamento do painel de detalhes
  const [open, setOpen] = useState<boolean>(false);

  const HandleformatarString = (input: string): string => {
    // Remover underlines e substituir por espaços
    const semUnderlines = input.replace(/_/g, " ");

    return semUnderlines;
  };
  // Manipula o estado de abertura/fechamento do painel de detalhes
  const handleOpenAccordion = () => {
    setOpen(!open);
  };

  return (
    <div
      className={
        theme.palette.mode == "light"
          ? "account-user-error-container"
          : "account-user-error-container-dark"
      }
    >
      <Box
        component={Paper}
        variant="elevation"
        elevation={24}
        width="auto"
        minWidth={"40%"}
        height={"auto"}
        maxHeight={"100%"}
        sx={{ borderRadius: "16px", padding: 3 }}
      >
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" component="div" gutterBottom>
            Oops! você não tem acesso a esta tela
          </Typography>
        </Box>

        <Box
          paddingTop={2}
          display="flex"
          width="100%"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <img src={"/assets/ilustrations/500.png"} height="auto" width="25%" />
        </Box>
        <Box
          paddingTop={1}
          width="100%"
          display="flex"
          flexDirection={
            xsOnly || smOnly || mdOnly || lgOnly ? "row" : "column"
          }
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Box
            width="auto"
            gap={2}
            display="flex"
            flexDirection={
              xsOnly || smOnly || mdOnly || lgOnly ? "column" : "row"
            }
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              disabled={isLoading}
              onClick={() => navigate("/dashprivate")}
              startIcon={
                <Icon>
                  <BsFilePost />
                </Icon>
              }
            >
              <Typography
                variant="button"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                meus Professors
              </Typography>
            </Button>
            <fetcher.Form method="post" action="/logout">
              <Button
                variant={isAuthenticated ? "outlined" : "contained"}
                color="primary"
                disabled={isLoading}
                type="submit"
                startIcon={<Icon>logout</Icon>}
              >
                <Typography
                  variant="button"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  Sair da Aplicação
                </Typography>
              </Button>
            </fetcher.Form>
          </Box>

          <Box
            width={xsOnly || smOnly || mdOnly || lgOnly ? "auto" : "100%"}
            height={xsOnly || smOnly || mdOnly || lgOnly ? "6rem" : "auto"}
          >
            <Divider
              variant="middle"
              orientation={
                xsOnly || smOnly || mdOnly || lgOnly ? "vertical" : "horizontal"
              }
            />
          </Box>

          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Accordion
              elevation={3}
              expanded={open}
              onChange={handleOpenAccordion}
            >
              <AccordionSummary
                expandIcon={<Icon>expand_more</Icon>}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" component="div" gutterBottom>
                  Visualizar detalhes:
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  width="100%"
                  padding={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  sx={{
                    border: "2px solid",
                    borderColor: theme.palette.primary.main,
                    borderRadius: "16px",
                  }}
                >
                  <Typography variant="h6">
                    contate o administrador do sistema e solicite os seguintes
                    acessos:
                  </Typography>

                  <Typography variant="h6">
                    Regras: {regras.map((regra) => HandleformatarString(regra))}
                  </Typography>

                  {permissoes && (
                    <Typography variant="h6">
                      Permissoes:{" "}
                      {permissoes.map((permissao) =>
                        HandleformatarString(permissao)
                      )}
                    </Typography>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
