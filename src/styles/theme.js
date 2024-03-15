import { createTheme } from '@mui/material';

const calcHeaderLineHeight = (fontSize) => `${fontSize * 1.2}rem`;

// reference this palette in your component within makeStyles with theme.palette
const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          '& .MuiAutocomplete-option[aria-selected="true"]': {
            backgroundColor: '#E3E6E7',
          },
          '& .MuiAutocomplete-option[aria-selected="true"].Mui-focused': {
            backgroundColor: '#E3E6E7',
          },
        },
      },
    },
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 24, 35, 0.4)',
        },
      },
    },
  },
  breakpoints: {
    // breakpoints aligned with .edu/uopcommon no more xs breakpoint. sm is 0-640
    values: {
      xs: 0,
      sm: 640,
      md: 992,
      lg: 1440,
      xl: 1920,
    },
  },
  palette: {
    common: {
      black: '#000',
      white: '#FFF',
    },
    background: {
      paper: '#FFF',
      dark: '#666666',
      default: '#FFF',
    },
    primary: {
      light: '#EA695B',
      main: '#DB3725',
      dark: '#B21F13',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#30718D',
      dark: '#1A3D4D',
      contrastText: '#FFF',
    },
    error: {
      light: '#EA695B',
      main: '#DB3725',
      contrastText: '#FFF',
    },
    success: {
      main: '#007758',
      contrastText: '#FFF',
    },
    text: {
      primary: '#001823',
      secondary: '#667982',
      disabled: '#667982',
    },
    cta: {
      primary: {},
      secondary: {},
      tertiary: {
        normal: {
          default: '#DB3725',
          hover: '#DB3725',
          active: '#8A1500',
          disabled: '#5E7079',
        },
        dark: {
          default: '#FFF',
          hover: '#FFF',
          active: '#E3E6E7',
          disabled: '#97A3A9',
        },
        light: {
          default: '#B21F13',
          hover: '#B21F13',
          active: '#58160F',
          disabled: '#5E7079',
        },
      },
    },
    ctaText: {
      normal: {
        text: {
          default: '#001823',
          hover: '#001823',
          active: '#001823',
          disabled: '#5e7079',
        },
        underline: {
          default: '#001823',
          hover: '#db3725',
          active: '#8a1500',
          disabled: '#5e7079',
        },
      },
      dark: {
        text: {
          default: '#ffffff',
          hover: '#ffffff',
          active: '#ffffff',
          disabled: '#97a3a9',
        },
        underline: {
          default: '#ffffff',
          hover: '#f2f3f3',
          active: '#e3e6e7',
          disabled: '#97a3a9',
        },
      },
    },
  },
  typography: {
    // this along with giving html font-size 62.5% in index.css allows
    // us to have 1rem == 10px for easier calculation
    // for example, 24px will be equal to 2.4rem, see: https://material-ui.com/customization/typography/#font-size
    htmlFontSize: 14,
    fontSize: 14,
    fontFamily: 'Roboto, sans-serif, IBM Plex Serif',
    h1: {
      fontSize: '2.3rem',
      fontFamily: 'Roboto',
      lineHeight: '4rem',
      fontWeight: '500',
    },
    h2: {
      fontSize: '2.4rem',
      fontFamily: 'Roboto',
      fontWeight: '100',
    },
    h3: {
      fontSize: '1.6rem',
      fontFamily: 'Roboto',
      fontWeight: '400',
    },
    h4: {
      fontSize: '1.6rem',
      fontFamily: 'Roboto',
      fontWeight: '400',
    },
    h5: {
      fontSize: '1.2rem',
      fontFamily: 'Roboto',
      fontWeight: '300',
      lineHeight: calcHeaderLineHeight(2.4),
    },
  },
  // use a 10px (1rem) grid
  spacing: (factor) => `${1 * factor}rem`,
});

export default theme;
