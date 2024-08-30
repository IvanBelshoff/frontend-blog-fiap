import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Icon,
} from "@mui/material";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { IDetalhesDePostLoader } from "../interfaces/interfaces";
import { LayoutBase } from "../../../shared/layouts";
import { PostsService } from "../../../shared/services/Posts/postsService";
import { useEffect, useRef, useState } from "react";
import { IPosts } from "../../../shared/interfaces";
import { UsuariosService } from "../../../shared/services";

export const EditarPosts = () => {
  const formatDateToBrazilian = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  const textareaRef = useRef(null);
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reseta a altura
    textarea.style.height = textarea.scrollHeight + "px"; // Ajusta para a altura do conteúdo
  };
  const loaderData = useLoaderData() as IDetalhesDePostLoader;
  const { pagina } = useParams<"pagina">();
  const {
    id,
    titulo,
    conteudo,
    usuario_cadastrador,
    data_criacao,
    data_atualizacao,
    foto,
  } = loaderData.post;
  const usuarioLogado = loaderData.usuarioLogado;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: titulo, // Preenchido com o título atual
    conteudo: conteudo,
    usuario_cadastrador: usuario_cadastrador,
    usuario_atualizador: usuarioLogado && usuarioLogado.nome ? usuarioLogado.nome : '',
    data_atualizacao: formatDateToBrazilian(
      new Date().toISOString().split("T")[0]
    ), // Data presente no formato brasileiro    foto: foto,
  });


  useEffect(() => {
    // Atualiza a data de atualização para a data presente sempre que o componente é renderizado
    setFormData((prevState) => ({
      ...prevState,
      data_atualizacao: formatDateToBrazilian(
        new Date().toISOString().split("T")[0]
      ),
      usuario_atualizador: usuarioLogado && usuarioLogado.nome ? usuarioLogado.nome : ''
    }));
    adjustTextareaHeight();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "conteudo") {
      adjustTextareaHeight();
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      foto: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    console.log("useEffect >>> loaderData.usuarioLogado: ", loaderData.usuarioLogado)
    e.preventDefault();
    let postEditado: IPosts = {
      id: id,
      titulo: formData.titulo,
      conteudo: formData.conteudo,
      visivel: true,
      usuario_cadastrador: formData.usuario_cadastrador,
      usuario_atualizador: usuarioLogado && usuarioLogado.nome ? usuarioLogado.nome : '',
      data_criacao: data_criacao,
      data_atualizacao: new Date(),
    };
    PostsService.updateById(id, postEditado);
    // Aqui você pode enviar os dados para a API ou realizar outra ação necessária
    console.log(formData);
  };
  const styles = {
    container: {
      backgroundColor: "#2d2d2d",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "600px",
      margin: "20px auto",
      color: "#ffffff",
      fontFamily: "Roboto, sans-serif",
    },
    header: {
      // textAlign: 'center',
      color: "#ff4081",
      fontFamily: "Roboto, sans-serif",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    formGroup: {
      marginBottom: "15px",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #cccccc",
      backgroundColor: "#3c3c3c",
      color: "#ffffff",
      fontSize: "16px",
      fontFamily: "Roboto, sans-serif",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #cccccc",
      backgroundColor: "#3c3c3c",
      color: "#ffffff",
      fontSize: "16px",
      resize: "none",
      fontFamily: "Roboto, sans-serif",
      overflowY: "hidden",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    button: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      fontFamily: "Roboto, sans-serif",
    },
    saveButton: {
      backgroundColor: "#ff4081",
      color: "#ffffff",
    },
    cancelButton: {
      backgroundColor: "#ff4081",
      color: "#ffffff",
      opacity: 0.7,
    },
    readOnlyInput: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #cccccc",
      backgroundColor: "#3c3c3c",
      color: "#ffffff",
      fontSize: "16px",
      fontFamily: "Roboto, sans-serif",
      cursor: "not-allowed",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Editar Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="conteudo">Conteúdo:</label>
          <textarea
            id="conteudo"
            name="conteudo"
            value={formData.conteudo}
            onChange={handleChange}
            style={styles.textarea}
            ref={textareaRef}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="usuario_cadastrador">Usuário Cadastrador:</label>
          <input
            type="text"
            id="usuario_cadastrador"
            name="usuario_cadastrador"
            value={formData.usuario_cadastrador}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="usuario_atualizador">Usuário Atualizador:</label>
          <input
            type="text"
            id="usuario_atualizador"
            name="usuario_atualizador"
            value={formData.usuario_atualizador}
            style={styles.readOnlyInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="data_atualizacao">Data de Atualização:</label>
          <input
            type="text"
            id="data_atualizacao"
            name="data_atualizacao"
            value={formData.data_atualizacao}
            readOnly
            style={styles.readOnlyInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="foto">Upload de Nova Foto:</label>
          <input
            type="file"
            id="foto"
            name="foto"
            onChange={handleFileChange}
            style={styles.input}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button
            type="submit"
            style={{ ...styles.button, ...styles.saveButton }}
          >
            Salvar Alterações
          </button>
          <button
            type="button"
            style={{ ...styles.button, ...styles.cancelButton }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
  // return (
  //   <LayoutBase>
  //     <Box
  //       width="100%"
  //       height="auto"
  //       display="flex"
  //       flexDirection="column"
  //       justifyContent="center"
  //       alignItems="center"
  //     >
  //       <Box width="60%" height="auto">
  //         {/* Breadcrumbs */}
  //         <Breadcrumbs
  //           aria-label="breadcrumb"
  //           sx={{ marginBottom: 2, marginTop: 2 }}
  //         >
  //           <Link style={{ color: "inherit" }} to={`/?busca=&pagina=${pagina}`}>
  //             <Typography color="text.primary">Posts</Typography>
  //           </Link>
  //           <Typography color="text.primary">{titulo}</Typography>
  //         </Breadcrumbs>

  //         {/* Post Details */}
  //         <Card sx={{ marginBottom: 2 }}>
  //         <Box sx={{ display: "flex", justifyContent: "center" }}>
  //             {foto && (
  //               <CardMedia
  //                 sx={{
  //                   width: "100%",
  //                   maxWidth: 400,
  //                   height: "auto",
  //                   objectFit: "cover",
  //                   marginTop: 5
  //                 }}
  //                 component="img"
  //                 height="auto"
  //                 image={foto.url}
  //                 alt={foto.nome}
  //               />
  //             )}
  //           </Box>
  //           <CardContent sx={{ display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center" }}>
  //             <Typography variant="h4" component="div" gutterBottom>
  //               {titulo}
  //             </Typography>
  //             <Typography variant="body1" color="text.secondary" paragraph>
  //               {conteudo}
  //             </Typography>
  //             <Typography variant="subtitle1" color="text.secondary">
  //               Autor: {usuario_cadastrador}
  //             </Typography>
  //             <Typography variant="subtitle2" color="text.secondary">
  //               Última atualização:{" "}
  //               {new Date(data_atualizacao).toLocaleDateString()}
  //             </Typography>
  //           </CardContent>
  //         </Card>
  //       </Box>
  //       {loaderData.logado && (
  //         <Box display="flex" gap="10px">
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             disableElevation
  //             onClick={() => {
  //               navigate(`/blog/posts/edit/${pagina}/${id}`); //temporario, alterar para tela de edicao que precisa ser criada
  //             }}
  //             endIcon={<Icon>edit</Icon>}
  //           >
  //             Editar
  //           </Button>
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             disableElevation
  //             onClick={() => {
  //               PostsService.deleteById(id);
  //             }}
  //             endIcon={<Icon>delete</Icon>}
  //           >
  //             Deletar
  //           </Button>
  //         </Box>
  //       )}
  //     </Box>
  //   </LayoutBase>
  // );
};
