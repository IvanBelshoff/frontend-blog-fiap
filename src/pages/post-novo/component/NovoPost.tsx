import { useEffect, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Grid,
  Icon,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { FerramentasDeDetalhes } from "../../../shared/components";
import { IFormPostNovo, INovoPostAction } from "../interfaces/interfaces";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { Environment } from "../../../shared/environment";
import { useAuth } from "../../../shared/contexts";

export const NovoPost = () => {
  const theme = useTheme();
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));
  // Hook para obter dados de ação
  const actionData = useActionData() as INovoPostAction;

  const { regras, permissoes } = useAuth();

  // Hook de navegação do React Router
  const navigate = useNavigate();

  // Estados locais para controlar o estado do Snackbar
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [uploadedImage, setUploadedImage] = useState<
    string | ArrayBuffer | Blob | null
  >(`${Environment.BASE_URL}/profile/profile.jpg`);

  // Estado local para o formulário do novo funcionário
  const [form, setForm] = useState<IFormPostNovo>({
    titulo: "",
    conteudo: "",
    visivel: "true",
  });

  // Função para fechar o Snackbar
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setMessage("");

    // Navega para a página de funcionários em caso de sucesso
    if (severity == "success") {
      navigate("/blog/posts");
    }
  };

  // Função para remover a imagem
  const handleRemoveImage = () => {
    setUploadedImage(null);
    // Resetando o valor do input para garantir que o evento onChange seja acionado novamente
    if (document.getElementById("upload-photo")) {
      (document.getElementById("upload-photo") as HTMLInputElement).value = "";
    }
  };

  // Manipulador de evento para a mudança de imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (e: { value: string; label: string } | null) => {
    if (!e) return;

    setForm((prevState) => ({ ...prevState, visivel: e.value }));
  };

  // Manipulador de evento para a mudança de entrada no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  // Efeito colateral para lidar com os dados de ação
  useEffect(() => {
    if (actionData?.errors?.default) {
      setSeverity("error");
      setMessage(actionData?.errors?.default);
      setOpen(true);
    }

    if (actionData?.success?.message) {
      setSeverity("success");
      setMessage(actionData?.success?.message);
      setOpen(true);
    }
  }, [actionData]);

  return (
    <LayoutBaseDePagina
      titulo=""
      barraDeFerramentas={
        <FerramentasDeDetalhes
          mostrarBotaoApagar={false}
          mostrarBotaoNovo={false}
          salvar={
            <Form method="POST" replace encType="multipart/form-data">
              <input
                id="titulo"
                type="hidden"
                name="titulo"
                value={form.titulo}
              />
              <input
                id="conteudo"
                type="hidden"
                name="conteudo"
                value={form.conteudo}
              />
              <input
                id="visivel"
                type="hidden"
                name="visivel"
                value={form.visivel}
              />
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="foto"
                type="file"
                onChange={handleImageChange}
                accept="image/*" // Aceita apenas imagens
              />

              <Button
                variant="contained"
                disableElevation
                type="submit"
                startIcon={<Icon>save</Icon>}
                color="primary"
              >
                <Typography
                  variant="button"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  Salvar
                </Typography>
              </Button>
            </Form>
          }
          aoClicarEmVoltar={() => navigate("/blog/posts")}
        />
      }
    >
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      <Box
        display="flex"
        width="auto"
        height="auto"
        flexDirection="column"
        justifyContent="center"
        margin={1}
        component={Paper}
        elevation={3}
      >
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="row"
          gap={2}
          padding={3}
        >
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <img
              src={uploadedImage as string}
              width={xlUp ? "30%" : "50%"}
              height="auto"
              alt="foto post"
            />

            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <label htmlFor="upload-photo">
                <Button
                  variant="contained"
                  startIcon={<Icon>file_upload</Icon>}
                  component="span"
                >
                  Carregar Capa
                </Button>
              </label>

              {uploadedImage && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleRemoveImage}
                >
                  Remover Foto
                </Button>
              )}
            </Box>

            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  error={!!actionData?.errors?.body?.titulo}
                  helperText={
                    !!actionData?.errors?.body?.titulo &&
                    "Titulo: " + actionData?.errors?.body.titulo
                  }
                  color={
                    !!actionData?.errors?.body?.titulo === false 
                      ? "primary"
                      : "error"
                  }
                  focused={!!actionData?.errors?.body?.titulo === false}
                  fullWidth
                  name="titulo"
                  variant="outlined"
                  label="Titulo"
                  value={form.titulo}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={!!actionData?.errors?.body?.conteudo}
                  helperText={
                    !!actionData?.errors?.body?.conteudo &&
                    "conteudo: " + actionData?.errors?.body.conteudo
                  }
                  color={
                    !!actionData?.errors?.body?.conteudo === false
                      ? "primary"
                      : "error"
                  }
                  focused={!!actionData?.errors?.body?.conteudo === false}
                  fullWidth
                  name="conteudo"
                  variant="outlined"
                  label="conteudo"
                  multiline
                  maxRows={5}
                  value={form.conteudo}
                  onChange={
                    Environment.validaRegraPermissaoComponentsMetodos(
                      JSON.parse(regras || ""),
                      [Environment.REGRAS.REGRA_PROFESSOR],
                      JSON.parse(permissoes || ""),
                      [Environment.PERMISSOES.PERMISSAO_ATUALIZAR_POSTAGEM]
                    )
                      ? handleInputChange
                      : undefined
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  fullWidth
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  } // Adicione esta linha
                  options={[
                    { value: "true", label: "Visivel" },
                    { value: "false", label: "Não visivel" },
                  ]}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!actionData?.errors?.body?.visivel}
                      helperText={
                        !!actionData?.errors?.body?.visivel &&
                        "Visibilidade: " + actionData?.errors?.body?.visivel
                      }
                      label="Visibilidade"
                      variant="outlined"
                      name="visivel"
                      focused={!!actionData?.errors?.body?.visivel === false}
                      color={
                        !!actionData?.errors?.body?.visivel === false
                          ? "primary"
                          : "error"
                      }
                    />
                  )}
                  onChange={(_, e) => {
                    handleSelectChange(e);
                  }}
                  clearText="Limpar seleção"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </LayoutBaseDePagina>
  );
};
