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
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));

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
      <Paper
        sx={{
          maxWidth: "100vw",
          paddingX: theme.spacing(1),
          paddingBottom: theme.spacing(4),
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2),
          borderRadius: 2,
          boxShadow: theme.shadows[5],
          maxHeight: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Box
          paddingTop={2}
          display="flex"
          width="90vw"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Typography
            variant={smDown ? "h6" : mdDown ? "h5" : xlUp ? "h4" : "h5"}
            component="div"
            gutterBottom
            textAlign={"center"}
            margin={2}
          >
            401 - Não autorizado
          </Typography>

          <Typography
            variant={smDown ? "h7" : mdDown ? "h6" : xlUp ? "h5" : "h6"}
            component="div"
            gutterBottom
            textAlign={"center"}
            margin={2}
          >
            Você não está autorizado a acessar esta página
          </Typography>

          <img
            src={"/assets/ilustrations/500.png"}
            height="auto"
            width={smDown ? "50%" : mdDown ? "40%" : "25%"}
          />
        </Box>
        <Box
          paddingTop={1}
          width="100%"
          display="flex"
          flexDirection={
            // xlUp  ? "row" : "column"
            "column"
          }
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Box
            width="auto"
            gap={2}
            display="flex"
            flexDirection={xlUp ? "row" : "column"}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              sx={{
                fontSize: "1rem",
                padding: "8px 16px",
                margin: "0 auto",
                width: "100%",
                maxWidth: "300px",
                "& smDown": {
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                },
                "& mdDown": {
                  fontSize: "0.875rem",
                  padding: "6px 12px",
                },
                "& xlDown": {
                  fontSize: "0.875rem",
                  padding: "6px 12px",
                },
                "& xlUp": {
                  fontSize: "1rem",
                  padding: "8px 16px",
                },
              }}
              variant="contained"
              color="primary"
              disabled={isLoading}
              onClick={() => navigate("/?busca=&pagina=1")}
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
                Página Inicial
              </Typography>
            </Button>
            <fetcher.Form method="post" action="/logout">
              <Button
                sx={{
                  fontSize: "1rem",
                  padding: "8px 16px",
                  margin: "0 auto",
                  width: "100%",
                  maxWidth: "300px",
                  "& smDown": {
                    fontSize: "0.75rem",
                    padding: "4px 8px",
                  },
                  "& mdDown": {
                    fontSize: "0.875rem",
                    padding: "6px 12px",
                  },
                  "& xlDown": {
                    fontSize: "0.875rem",
                    padding: "6px 12px",
                  },
                  "& xlUp": {
                    fontSize: "1rem",
                    padding: "8px 16px",
                  },
                }}
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
        </Box>
      </Paper>{" "}
    </div>
  );
};
