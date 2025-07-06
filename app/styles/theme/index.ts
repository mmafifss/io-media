import { createTheme } from '@mui/material/styles';

const typography = {
  h1: {
    fontSize: '4.5rem',
    fontWeight: '700',
    lineHeight: '100.8px',
  },
  h2: {
    fontSize: '3.4375rem',
    fontWeight: '700',
    lineHeight: '77px',
  },
  h3: {
    fontSize: '2.5rem',
    fontWeight: '700',
    lineHeight: '56px',
  },
  h4: {
    fontSize: '2rem',
    fontWeight: '700',
    lineHeight: '44.8px',
  },
  h5: {
    fontSize: '1.5rem',
    fontWeight: '700',
    lineHeight: '33.6px',
  },
  h6: {
    fontSize: '1.25rem',
    fontWeight: '700',
    lineHeight: '28px',
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: '700',
    lineHeight: '22.4px',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: '700',
    lineHeight: '19.6px',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: '16.8px',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: '22.4px',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: '19.6px',
  },
  overline: {
    fontSize: '0.875rem',
    lineHeight: '19.6px',
  },
};

export const LightTheme = createTheme({
  palette: {
    mode: 'light', // Specifies the light mode
    primary: {
      main: '#0B73E6',
      light: '#70DDFF',
      dark: '#1057A7',
    },
    secondary: {
      main: '#FFC257',
      light: '#F7E5C4',
      dark: '#E69B17',
    },
    error: {
      main: '#E34747',
      light: '#FF8080',
      dark: '#C52424',
    },
    warning: {
      main: '#E69B17',
      light: '#FFD560',
      dark: '#BB7A07',
    },
    info: {
      main: '#FF7E5A',
      light: '#FFAA92',
      dark: '#E9613A',
    },
    success: {
      main: '#46D639',
      light: '#79F46E',
      dark: '#36A92C',
    },
    background: {
      paper: '#fdfdfd',
      default: '#fdfdfd',
    },
    text: {
      primary: '#323232',
      secondary: '#808080',
      disabled: '#bfbfbf',
    },
  },
  typography,
});

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark', // Specifies the dark mode
    primary: {
      main: '#0B73E6',
      light: '#70DDFF',
      dark: '#1057A7',
    },
    secondary: {
      main: '#FFC257',
      light: '#F7E5C4',
      dark: '#E69B17',
    },
    error: {
      main: '#E34747',
      light: '#FF8080',
      dark: '#C52424',
    },
    warning: {
      main: '#E69B17',
      light: '#FFD560',
      dark: '#BB7A07',
    },
    info: {
      main: '#FF7E5A',
      light: '#FFAA92',
      dark: '#E9613A',
    },
    success: {
      main: '#46D639',
      light: '#79F46E',
      dark: '#36A92C',
    },
    background: {
      paper: '#121212',
      default: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
      disabled: '#7a7a7a',
    },
  },
  typography,
});
