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
      sx={{
        marginTop: 2,
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          height: { xs: 230, sm: 200 },
        }}
      >
        <CardMedia
          component="img"
          image={capa_url}
          sx={{
            width: { xs: "100%", sm: "30%" },
            objectFit: "cover",
            objectPosition: "center",
            minHeight: { xs: 100, sm: 200 },
            maxHeight: { xs: 100, sm: 200 },
            backgroundColor: "#f4729c",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", sm: "70%" },
            justifyContent: "space-between",
            py: 1,
            px: 2,
            height: { xs: 230, sm: 200 },
          }}
        >
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                textAlign: { xs: "center", sm: "left" },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {titulo}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.5rem" },
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
          <Box display="flex" flexDirection={"column"}>
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
                fontSize: { sm: "0.65rem", md: "0.75rem" },
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
