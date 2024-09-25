import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import { ILayoutBaseDePaginaProps } from "../interfaces";

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  children,
  titulo,
  barraDeFerramentas,
  group,
  alert,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      boxSizing={"border-box"}
      gap={1}
      sx={{
        scrollBehavior: "smooth",
        overflowX: "hidden",
        msOverflowY: "scroll"
      }}
    >
      {titulo ? (
        <Box
          padding={1}
          display="flex"
          alignItems="center"
          gap={1}
          height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
          width={
            (smDown || mdDown) && !titulo
              ? "auto"
              : smDown || mdDown
              ? "85vw"
              : xlDown
              ? "auto"
              : xsDown
              ? "100vw"
              : "auto"
          }
        >
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="center"
            marginTop={2}
          >
            <Typography
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              variant={smDown ? "h7" : mdDown ? "h5" : "h3"}
            >
              {titulo}
            </Typography>
          </Box>
          {alert && (
            <Box
              marginBottom={2}
              width="25%"
              alignSelf="end"
              position="fixed"
              right="0"
              bottom="0"
            >
              {alert}
            </Box>
          )}
        </Box>
      ) : (
        <Box
        width={
            (smDown || mdDown) && !titulo
              ? "auto"
              : smDown || mdDown
              ? "85vw"
              : xlDown
              ? "auto"
              : xsDown
              ? "100vw"
              : "auto"
          }
          paddingX={0.5}
          display="flex"
          alignItems="center"
          gap={1}
          height={theme.spacing(smDown ? 1 : mdDown ? 1 : 1)}
        ></Box>
      )}

      {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}

      {group && <Box>{group}</Box>}

      <Box
        flex={1}
        overflowX="hidden"
        boxSizing={"border-box"}
        width={
          (smDown || mdDown) && !titulo
            ? "auto"
            : smDown || mdDown
            ? "85vw"
            : xlDown
            ? "auto"
            : xsDown
            ? "100vw"
            : "auto"
        }
      >
        {children}
      </Box>
    </Box>
  );
};
