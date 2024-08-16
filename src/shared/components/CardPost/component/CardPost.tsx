import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { ICardPostProps } from "../interfaces/interfaces";
import { format } from "date-fns";

export const CardPost: React.FC<ICardPostProps> = ({
    conteudo,
    data_atualizacao,
    data_criacao,
    capa,
    titulo,
    usuario_atualizador,
    usuario_cadastrador,
    aoCliclarNoCard
}) => {

    return (
        <Card onClick={aoCliclarNoCard} sx={{ maxWidth: '100%', display: 'flex', flexDirection: 'row' }}>
            <CardActionArea sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                    component="img"
                    height={'auto'}
                    image={capa.url}
                    sx={{ width: '30%' }}
                    alt={titulo}
                />
                <CardContent sx={{ flex: '1' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {conteudo.substring(0, 100)}...
                    </Typography>
                    <Box display='flex' flexDirection={'column'} mt={2}>
                        <Typography variant="caption" color="text.secondary">
                            Criado por: {usuario_cadastrador} em {format(new Date(data_criacao), 'dd/MM/yyyy')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Atualizado por: {usuario_atualizador} em {format(new Date(data_atualizacao), 'dd/MM/yyyy')}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};