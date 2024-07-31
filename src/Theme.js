import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00C9FF',
    },
    secondary: {
      main: '#92FE9D',
    },
    background: {
      default: '#1f1c2c',
    },
    text: {
      primary: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
