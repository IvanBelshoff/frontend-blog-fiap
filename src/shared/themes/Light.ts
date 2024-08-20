// Light.ts
import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#ED145B',
            dark: '#BE1049',
            contrastText: '#FFF',
        },
        secondary: {
            main: '#678C96',
            dark: '#396976',
            contrastText: '#FFF',
        },
        background: {
            default: '#F7F6F3',
            paper: '#FFF',
        },
        mode: 'light'
    },
    typography: {
        fontFamily: '"Noto Serif", serif',
        h1: {
            color: '#464a4e'
        },
        h2: {
            color: '#464a4e'
        },
        h3: {
            color: '#464a4e'
        },
        h4: {
            color: '#464a4e'
        },
        h5: {
            color: '#464a4e'
        },
        h6: {
            color: '#464a4e'
        },
        body1: {
            color: '#464a4e'
        },
        body2: {
            color: '#464a4e'
        },
        button: {
            letterSpacing: 1
        },
        subtitle2: {
            letterSpacing: 0.5
        }
    }
});
