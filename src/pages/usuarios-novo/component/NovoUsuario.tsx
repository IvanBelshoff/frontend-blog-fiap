import { useEffect, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
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

import {
  CropperModal,
  FerramentasDeDetalhes,
} from "../../../shared/components";
import { Environment } from "../../../shared/environment";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { IFormUsuario, INovoUsuarioAction } from "../interfaces/interfaces";

export const NovoUsuario = () => {
  const actionData = useActionData() as INovoUsuarioAction;
  const navigate = useNavigate();

  // Hook para obter o tema atual do Material-UI
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [filename, setFilename] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<
    string | ArrayBuffer | Blob | null
  >(`${Environment.BASE_URL}/profile/profile.jpg`);
  const [statePhoto, setStatePhoto] = useState<
    "original" | "edição" | "preview"
  >("original");
  const [form, setForm] = useState<IFormUsuario>({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
  });

  const reader = new FileReader();

  // Função para fechar o Snackbar
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setStatePhoto("original");
    setOpen(false);
    setMessage("");

    if (severity == "success") {
      navigate("/blog/usuarios");
    }
  };

  // Manipulador de evento para a mudança de entrada no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  // Manipulador de evento para a mudança de imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setStatePhoto("edição");
        setFilename(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para remover a imagem
  const handleRemoveImage = () => {
    setUploadedImage(null);
    setStatePhoto("original");
    // Resetando o valor do input para garantir que o evento onChange seja acionado novamente
    if (document.getElementById("upload-photo")) {
      (document.getElementById("upload-photo") as HTMLInputElement).value = "";
      setUploadedImage(`${Environment.BASE_URL}/profile/profile.jpg`);
    }
  };

  const handleSaveEditedImage = (
    blob: Blob,
    state?: "original" | "edição" | "preview"
  ) => {
    reader.onloadend = () => {
      setUploadedImage(blob);

      // Criando uma FileList simulando a seleção de arquivos pelo usuário
      const editedFile = new File([blob], filename || "edited_photo.jpg", {
        type: blob.type,
      });
      const fileList = new DataTransfer();
      fileList.items.add(editedFile);

      // Setando o valor do input para a FileList criada
      const uploadedPhotoInput = document.getElementById(
        "upload-photo"
      ) as HTMLInputElement;
      uploadedPhotoInput.files = fileList.files;

      if (state) {
        setStatePhoto(state);
      }
    };
    reader.readAsDataURL(blob);
  };

  // Efeito colateral para lidar com os dados de ação
  useEffect(() => {
    if (actionData?.errors?.default) {
      setSeverity("error");
      setMessage(actionData.errors.default);
      setOpen(true);
    }

    if (actionData?.success?.message) {
      setSeverity("success");
      setMessage(actionData.success.message);
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
          aoClicarEmVoltar={() => navigate("/blog/usuarios")}
          salvar={
            <Form method="POST" replace encType="multipart/form-data">
              <input id="nome" type="hidden" name="nome" value={form.nome} />
              <input
                id="sobrenome"
                type="hidden"
                name="sobrenome"
                value={form.sobrenome}
              />
              <input id="email" type="hidden" name="email" value={form.email} />
              <input id="senha" type="hidden" name="senha" value={form.senha} />
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
                color="primary"
                disableElevation
                type="submit"
                startIcon={<Icon>save</Icon>}
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
        />
      }
    >
      <Box
            display="flex"
            width="auto"
            height="auto"
            flexDirection="column"
            justifyContent="center"
            marginLeft={1}
            marginRight={1}
            marginBottom={1}
            paddingBottom={3}
            component={Paper}
            elevation={3}
            overflow={"hidden"}
      >
        <Box
              width={smDown || mdDown ? "100" : "90%"}
              height="100%"
              display="flex"
              flexDirection={smDown || mdDown ? "column" : "row"}
              gap={2}
              padding={1}
        >
          <Box
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={2}
          >
            <Typography variant="h5">Foto do Usuário</Typography>

            {statePhoto == "original" || statePhoto == "preview" ? (
              <>
                <Avatar
                  src={
                    typeof uploadedImage == "string"
                      ? uploadedImage
                      : URL.createObjectURL(uploadedImage as Blob)
                  }
                  alt="Foto do funcionário"
                  // width={"50%"}
                  
                  style={{
                    width: smDown || mdDown ? "50%" : "30%",
                    height:"auto",
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  textAlign={"center"}
                  gap={2}
                >
                <label htmlFor="upload-photo">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<Icon>file_upload</Icon>}
                  >
                    Carregar Foto
                  </Button>
                </label>
                {statePhoto != "original" && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Icon>delete</Icon>}
                    onClick={handleRemoveImage}
                  >
                    Remover Foto
                  </Button>
                )}
                </Box>
              </>
            ) : (
              <CropperModal
                src={uploadedImage as string}
                setPreview={setUploadedImage}
                cancelPhoto={handleRemoveImage}
                onSave={handleSaveEditedImage}
              />
            )}
          </Box>

          <Box
            width={smDown || mdDown ? "100%" : "100%"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!actionData?.errors?.body?.nome}
                  helperText={
                    !!actionData?.errors?.body?.nome &&
                    "Nome: " + actionData?.errors?.body.nome
                  }
                  color={
                    !!actionData?.errors?.body?.nome === false
                      ? "primary"
                      : "error"
                  }
                  focused={!!actionData?.errors?.body?.nome === false}
                  fullWidth
                  name="nome"
                  variant="outlined"
                  label="Nome"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!actionData?.errors?.body?.sobrenome}
                  helperText={
                    !!actionData?.errors?.body?.sobrenome &&
                    "Sobrenome: " + actionData?.errors?.body.sobrenome
                  }
                  color={
                    !!actionData?.errors?.body?.sobrenome === false
                      ? "primary"
                      : "error"
                  }
                  focused={!!actionData?.errors?.body?.sobrenome === false}
                  fullWidth
                  name="sobrenome"
                  variant="outlined"
                  label="Sobrenome"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={!!actionData?.errors?.body?.email}
                  helperText={
                    !!actionData?.errors?.body?.email &&
                    "E-mail: " + actionData?.errors?.body.email
                  }
                  color={
                    !!actionData?.errors?.body?.email === false
                      ? "primary"
                      : "error"
                  }
                  focused={!!actionData?.errors?.body?.email === false}
                  fullWidth
                  name="email"
                  variant="outlined"
                  label="E-mail"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid container item justifyContent="center">
                <Grid item xs={12} sm={12}>
                  <TextField
                    error={!!actionData?.errors?.body?.senha}
                    helperText={
                      !!actionData?.errors?.body?.senha &&
                      "Senha: " + actionData?.errors?.body.senha
                    }
                    color={
                      !!actionData?.errors?.body?.senha === false
                        ? "primary"
                        : "error"
                    }
                    focused={!!actionData?.errors?.body?.senha === false}
                    fullWidth
                    type="password"
                    name="senha"
                    variant="outlined"
                    label="Nova senha"
                    value={form.senha}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </LayoutBaseDePagina>
  );
};
