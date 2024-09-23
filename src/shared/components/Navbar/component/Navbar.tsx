import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  TextField,
  Icon,
  useTheme,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useMatch,
  useNavigate,
  useOutletContext,
  useParams,
  useResolvedPath,
} from "react-router-dom";
import { useAppThemeContext, useIndex } from "../../../contexts";
import { IBlogLoader } from "../../../../pages/blog/interfaces/interfaces";
import { IPosts } from "../../../interfaces";
import { Environment } from "../../../environment";

type ContextType = {
  busca: string | null;
  data: IPosts[];
  totalCount: number;
};

export const Navbar = () => {
  const fetcher = useFetcher();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { setSelectedIndex } = useIndex();
  const navigate = useNavigate();
  const loaderData = useLoaderData() as IBlogLoader;
  const { toggleTheme } = useAppThemeContext();
  const [busca, setBusca] = React.useState<string | null>("");
  const { pagina } = useParams<"pagina">();
  const { id } = useParams<"id">();
  const resolvedPathHome = useResolvedPath(`/detalhes/${pagina}/${id}`);
  const matchHome = useMatch({ path: resolvedPathHome.pathname, end: false });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const isLoggingOut = fetcher.formData != null;

  const actionLogout = () => {
    fetcher.submit({ idle: true }, { method: "post", action: "/logout" });
  };

  const actionAdmin = () => {
    setSelectedIndex(1);
    navigate("/blog");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed"
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            background: "linear-gradient(to right, #f4729c, #ED145B)",
            flexDirection: "row",
            padding: "8px 16px",
            alignItems: "center",
            flexWrap: "wrap",
            minHeight:"64px"
          }}
        >
          {/* Logo */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            onClick={() => navigate("/")}
          >
            <Icon>home</Icon> {/* Substitua pelo seu logo */}
          </IconButton>

          {/* Search for mobile view */}
          {isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <IconButton
                color="inherit"
                onClick={() => setSearchOpen(!searchOpen)}
                sx={{ marginRight: 2 }}
              >
                <Icon>search</Icon>
              </IconButton>
              {searchOpen && (
                <TextField
                  size="small"
                  id="outlined-search"
                  type="search"
                  InputProps={{
                    startAdornment: (
                      <Icon sx={{ color: "white", marginRight: 1 }}>
                        search
                      </Icon>
                    ),
                    style: { borderColor: "white" },
                  }}
                  variant="outlined"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiInputLabel-shrink": {
                      color: "white",
                    },
                  }}
                  defaultValue={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder={Environment.INPUT_DE_BUSCA}
                />
              )}
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                visibility: searchOpen ? "hidden" : "visible",
              }}
            >
              {!matchHome && (
                <TextField
                  size="small"
                  id="outlined-search"
                  type="search"
                  InputProps={{
                    startAdornment: (
                      <Icon sx={{ color: "white", marginRight: 1 }}>
                        search
                      </Icon>
                    ),
                    style: { borderColor: "white" },
                  }}
                  variant="outlined"
                  sx={{
                    width: "70%",
                    mx: "15%",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiInputLabel-shrink": {
                      color: "white",
                    },
                  }}
                  defaultValue={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder={Environment.INPUT_DE_BUSCA}
                />
              )}
            </Box>
          )}

          <Box
            flexDirection="row"
            alignItems="center"
            gap={0}
            sx={{
              display: searchOpen ? "none" : "flex",
              flexDirection:"row",
              justifyContent: "flex-end"
            }}
          >

            {!isMobile && loaderData?.usuario && (
              <Typography
                color={"white"}
                variant="h6"
                component="div"
                sx={{ 
                  flexGrow: 1,
                  marginRight: 1
                 }}
              >
                Bem-vindo, {loaderData.usuario.nome}!
              </Typography>
            )}

{theme.palette.mode === "light" ? (
              <Tooltip title="Alterar para tema escuro" placement="left">
                <IconButton size="large" onClick={toggleTheme}>
                  <Icon sx={{ color: "#FFF" }} fontSize="medium">
                    dark_mode
                  </Icon>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Alterar para tema claro" placement="left">
                <IconButton size="large" onClick={toggleTheme}>
                  <Icon sx={{ color: "#FFF" }} fontSize="medium">
                    light_mode
                  </Icon>
                </IconButton>
              </Tooltip>
            )}

            {loaderData?.usuario ? (
              <Box>
                <Avatar
                  alt="User Avatar"
                  src={loaderData.usuario.foto.url}
                  onClick={handleMenuOpen}
                  sx={{
                    cursor: "pointer",
                    width: isMobile ? 40 : 45,
                    height: isMobile ? 40 : 45,
                    transition: "transform 0.3s",
                    transformOrigin: "center",
                    "&:hover": {
                      transform: "scale(1.07)",
                    },
                  }}
                />

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  slotProps={{
                    paper: {
                      elevation: 5,
                      sx: {
                        backgroundColor: theme.palette.background.default,
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 25,
                          width: 10,
                          height: 10,
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "#37383a"
                              : theme.palette.background.paper,
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                >
                  <MenuItem disabled={isLoggingOut} onClick={actionAdmin}>
                    <ListItemIcon>
                      <Icon>admin_panel_settings</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Painel de administração" />
                  </MenuItem>

                  <MenuItem disabled={isLoggingOut} onClick={actionLogout}>
                    <ListItemIcon>
                      <Icon>logout</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Sair" />
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <IconButton
                size="large"
                color="inherit"
                onClick={() => navigate("/login")}
              >
                <Icon>login</Icon>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box paddingTop={7} height="100vh" width="100%">
        <Outlet
          context={
            {
              busca: busca,
              data: loaderData?.data,
              totalCount: loaderData?.totalCount,
            } satisfies ContextType
          }
        />
      </Box>
    </Box>
  );
};

export function useNavbar() {
  return useOutletContext<ContextType>();
}