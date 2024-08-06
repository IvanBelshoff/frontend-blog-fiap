import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#182871',
            dark: '#3992e6',
            contrastText: '#FFF',
        },
        secondary: {
            main: '#8A8D8F',
            dark: '#3992e6',
            contrastText: '#FFF',
        },
        background: {
            default: '#F7F6F3',
            paper: '#FFF',
        },
        mode: 'light'
    },
    typography: {
        fontFamily: 'VolvoBroadPro',
        allVariants: {
            fontFamily: 'VolvoBroadPro',
        },
        h1: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        h2: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        h3: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        h4: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        h5: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        h6: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        body1: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        body2: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
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
const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#182871',
            dark: '#3992e6',
            contrastText: '#FFF',
        },
        secondary: {
            main: '#8A8D8F',
            dark: '#3992e6',
            contrastText: '#FFF',
        },
        background: {
            default: '#F7F6F3',
            paper: '#FFF',
        },
        mode: 'light'
    },
    typography: {
        fontFamily: 'VolvoBroadPro',
        allVariants: {
            fontFamily: 'VolvoBroadPro',
        },
        h1: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        h2: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        h3: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        h4: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        h5: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        h6: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        body1: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
        },
        body2: {
            fontFamily: 'VolvoBroadPro',
            color: '#464a4e'
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