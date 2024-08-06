import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: '#66B3A6',
            dark: '#50A294',
            contrastText: '#FFF',
        },
        secondary: {
            main: '#8A8D8F',
            dark: '#66B3A6',
            contrastText: '#FFF',
        },
        background: {
            default: '#202124',
            paper: '#303134',
        },
        mode: 'dark',
    },
    typography: {
        fontFamily: 'VolvoBroadPro',
        allVariants: {
            fontFamily: 'VolvoBroadPro',
        },
        h1: {

            color: '#FFF'
        },
        h2: {

            color: '#FFF'
        },
        h3: {
            color: '#FFF'
        },
        h4: {

            color: '#FFF'
        },
        h5: {
            color: '#FFF'
        },
        h6: {
            color: '#FFF'
        },
        body1: {
            color: '#FFF'
        },
        body2: {
            color: '#FFF'
        },
        button: {
            fontFamily: 'VolvoBroadPro',
            letterSpacing: 1
        },
        subtitle2: {
            letterSpacing: 0.5
        }
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontFamily: 'VolvoNovumMedium'
                }
            }
        }
    }

});

/*
Tema laranja Volvo

const DarkTheme = createTheme({
    palette: {
        primary: {
            main: '#ff9833',
            dark: '#e57200',
            contrastText: '#FFF',
        },
        secondary: {
            main: '#8A8D8F',
            dark: '#ff9833',
            contrastText: '#FFF',
        },
        background: {
            default: '#202124',
            paper: '#303134',
        },
        mode: 'dark',
    },
    typography: {
        fontFamily: 'VolvoBroadPro',
        allVariants: {
            fontFamily: 'VolvoBroadPro',
        },
        h1: {

            color: '#FFF'
        },
        h2: {

            color: '#FFF'
        },
        h3: {
            color: '#FFF'
        },
        h4: {

            color: '#FFF'
        },
        h5: {
            color: '#FFF'
        },
        h6: {
            color: '#FFF'
        },
        body1: {
            color: '#FFF'
        },
        body2: {
            color: '#FFF'
        },
        button: {
            fontFamily: 'VolvoBroadPro',
            letterSpacing: 1
        },
        subtitle2: {
            letterSpacing: 0.5
        }
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontFamily: 'VolvoNovumMedium'
                }
            }
        }
    }

});
*/