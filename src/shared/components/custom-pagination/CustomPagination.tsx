import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Icon,
  MenuItem,
  Select,
  FormControl,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC } from "react";

interface CustomPaginationProps {
  totalCount: number;
  totalExibido: number;
  totalPages: number;
  pagina: number;
  aoClicarEmKeyboardDoubleArrowUp: () => void;
  aoClicarEmKeyBoardArrowUp: () => void;
  aoClicarEmKeyboardArrowDown: () => void;
  aoClicarEmKeyboardDoubleArrowDown: () => void;
  aoSelecionarPagina: (novoTexto: string) => void;
}

export const CustomPagination: FC<CustomPaginationProps> = ({
  pagina,
  totalExibido,
  totalCount,
  totalPages,
  aoSelecionarPagina,
  aoClicarEmKeyboardDoubleArrowUp,
  aoClicarEmKeyBoardArrowUp,
  aoClicarEmKeyboardArrowDown,
  aoClicarEmKeyboardDoubleArrowDown,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const ITEM_HEIGHT = 38;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: "auto",
      },
    },
  };
  return (
    <Box
      width="100%"
      marginBottom={0.5}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {!isMobile ? (
        <Box
          width="auto"
          paddingLeft={0.5}
          justifyContent="end"
          alignItems="end"
          display="flex"
        >
          <Typography variant="h5" fontSize={15} color="primary" align="center">
            Exibindo {totalExibido} de {totalCount} posts
          </Typography>
        </Box>
      ) : (
        ""
      )}

      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        {totalPages > 1 && pagina != 1 && (
          <Tooltip title="Página anterior">
            <IconButton size="medium" onClick={aoClicarEmKeyBoardArrowUp}>
              <Icon color="primary" fontSize="medium">
                keyboard_arrow_up
              </Icon>
            </IconButton>
          </Tooltip>
        )}
        {totalPages > 1 && totalExibido != totalCount && (
          <Tooltip title="Próxima página">
            <IconButton size="medium" onClick={aoClicarEmKeyboardArrowDown}>
              <Icon color="primary" fontSize="medium">
                keyboard_arrow_down
              </Icon>
            </IconButton>
          </Tooltip>
        )}

        {totalPages > 1 && totalExibido != totalCount && (
          <Tooltip title={"Ver todos os posts"}>
            <IconButton
              size="medium"
              onClick={aoClicarEmKeyboardDoubleArrowDown}
            >
              <Icon color="primary" fontSize="medium">
                keyboard_double_arrow_down
              </Icon>
            </IconButton>
          </Tooltip>
        )}

        {totalPages > 1 && pagina != 1 && (
          <Tooltip title={"Ver menos posts"}>
            <IconButton size="medium" onClick={aoClicarEmKeyboardDoubleArrowUp}>
              <Icon color="primary" fontSize="medium">
                keyboard_double_arrow_up
              </Icon>
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {!isMobile && totalPages > 1 ? (
        <Box
          width="auto"
          paddingRight={2}
          justifyContent="initial"
          alignItems="center"
          display="flex"
        >
          <Typography variant="h5" fontSize={15} color="primary" align="center">
            Página
          </Typography>
          <FormControl
            variant="standard"
            sx={{ minWidth: 60, marginLeft: 1, marginRight: 1 }}
          >
            <Select
              value={pagina}
              onChange={(e) => aoSelecionarPagina(String(e.target.value))}
              MenuProps={MenuProps}
            >
              {[...Array(totalPages).keys()].map((pageNumber) => (
                <MenuItem key={pageNumber + 1} value={pageNumber + 1}>
                  {pageNumber + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h5" fontSize={15} color="primary" align="center">
            de {totalPages}
          </Typography>
        </Box>
      ) : isMobile && totalPages > 1 ?(
        <Box
          width="auto"
          paddingRight={2}
          justifyContent="space-between"
          alignItems="center"
          display="flex"
        >
          <FormControl
            variant="standard"
            sx={{  marginLeft: 1, marginRight: 1 }}
          >
            <Select
              value={pagina}
              onChange={(e) => aoSelecionarPagina(String(e.target.value))}
              MenuProps={MenuProps}
            >
              {[...Array(totalPages).keys()].map((pageNumber) => (
                <MenuItem key={pageNumber + 1} value={pageNumber + 1}>
                  {pageNumber + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : ("")}
    </Box>
  );
};
