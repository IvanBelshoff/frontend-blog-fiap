import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ICardPostProps } from "../interfaces/interfaces";
import { format } from "date-fns";

export const CardPost: React.FC<ICardPostProps> = ({
  conteudo,
  data_atualizacao,
  data_criacao,
  capa_url,
  titulo,
  usuario_atualizador,
  usuario_cadastrador,
  aoCliclarNoCard,
}) => {
  return (
    <Card
      onClick={aoCliclarNoCard}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          height: "auto",
        }}
      >
        <CardMedia
          component="img"
          image={capa_url}
          sx={{
            width: { xs: "100%", sm: "30%" },
            objectFit: "cover",
            objectPosition: "center",
            backgroundColor: "#f4729c",
            marginLeft: '2vw'
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", sm: "70%" },
            justifyContent: "space-between",
            py: 2,
            px: 3,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{

                textAlign: { xs: "center", sm: "left" },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {titulo}
            </Typography>
          </Box>
          <Box  sx={{ mt: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 2,
                textOverflow: "ellipsis",
              }}
            >
              {conteudo}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Criado por: {usuario_cadastrador} em{" "}
              {format(new Date(data_criacao), "dd/MM/yyyy")}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: { sm: "0.8rem", md: "0.9rem" },
                display: { xs: "none", sm: "flex" },
              }}
            >
              Atualizado por: {usuario_atualizador} em{" "}
              {format(new Date(data_atualizacao), "dd/MM/yyyy")}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
