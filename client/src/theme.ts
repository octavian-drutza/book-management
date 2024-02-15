import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontSize: 11,
        fontWeightRegular: 400,
        h1: {
            fontSize: 18,
            fontWeight: 500
        },
        h2: {
            fontSize: 17,
        },
        button: {
            fontSize: 13,
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    '@media (max-width:600px)': {
                        fontSize: 14,
                        h1: {
                            fontSize: 17,
                            fontWeight: 500
                        },
                        h2: {
                            fontSize: 14,
                        },
                    },
                },
            },
        },
    },
});

export default theme;;