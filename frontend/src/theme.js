import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#008080', // Your desired primary color
        },
        secondary: {
            main: '#008080', // Your desired secondary color
        },
        contrastText: "#ffffff"
        // You can customize other colors like error, warning, info, success, etc.
    },
    // You can also customize typography, spacing, and other properties here
});

export default theme;