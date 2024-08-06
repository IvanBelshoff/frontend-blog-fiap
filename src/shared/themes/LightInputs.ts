import { createTheme } from '@mui/material';

export const LightInputsTheme = createTheme({
    palette: {
        primary: {
            main: '#182871',
            dark: '#298EF2',
            contrastText: '#FFF',
        },
        secondary: {
            main: '#8A8D8F',
            dark: '#66696B',

            contrastText: '#FFF',
        },
        background: {
            default: '#F7F6F3',
            paper: '#FFF',
        },
        
        mode: 'light'
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