// Dark.ts
import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: '#ED145B',
            dark: '#BE1049',
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
    typography: {
        fontFamily: '"Noto Serif", serif',
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
            letterSpacing: 1
        },
        subtitle2: {
            letterSpacing: 0.5
        }
    }
});
