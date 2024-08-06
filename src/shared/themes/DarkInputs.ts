import { createTheme } from '@mui/material';

export const DarkInputsTheme = createTheme({
    palette: {
        primary: {
            main: '#66B3A6',
            dark: '#50A294',
            contrastText: '#FFF',
        },
        secondary: {
            main: '#ff9833',
            dark: '#e57200',
            contrastText: '#FFF',
        },
        background: {
            default: '#202124',
            paper: '#303134',
        },
        mode: 'dark',
    },
    components: {

        MuiInputBase: {
            styleOverrides: {

                root: {
                    fontFamily: 'VolvoNovumMedium',

                }

            }
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: 'VolvoNovumMedium',
                },
            },
        },
        
        MuiTextField: {
            
            styleOverrides: {
                root: {
                    fontFamily: 'VolvoNovumMedium',
                },
            },
        },

    },

});


/*
Tema laranja

const DarkInputsTheme = createTheme({
    palette: {
        primary: {
            main: '#ff9833',
            dark: '#e57200',
            contrastText: '#FFF',
        },
        secondary: {
            main: '#8A8D8F',
            dark: '#f3f3f3',
            contrastText: '#FFF',
        },
        background: {
            default: '#202124',
            paper: '#303134',
        },
        mode: 'dark',
    },
    components: {

        MuiInputBase: {
            styleOverrides: {

                root: {
                    fontFamily: 'VolvoNovumMedium',

                }

            }
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: 'VolvoNovumMedium',
                },
            },
        },
        
        MuiTextField: {
            
            styleOverrides: {
                root: {
                    fontFamily: 'VolvoNovumMedium',
                },
            },
        },

    },

});
*/