// https://mui.com/material-ui/guides/building-extensible-themes/

// Das ist erstmal nur ein Bsp von MUI an dem man sehen kann, wie Themes erstellt werden können

import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

export const theme: ThemeOptions = {
    // Farbschema
    palette: {
        // Primär- und Sekundärfarbe
        primary: {
        main: '#000000',
        },
        secondary: {
        main: '#5959ffff',
        },
        // Hintergrund
        background: {
            default: '#ffffffff',
            paper: '#d4d4ffff'
        },
        // Text
        text: {
            primary: '#000000ff',
            secondary: '#292929ff',
            disabled: '#757575ff',
        },
        // Light/Dark Mode
        mode: 'light',
    },
    // Abrundungen
    shape: {
        borderRadius: 8,
    },
    // Text: Schriftart, -größe und -breite
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2.125rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 700,
        },
        body1: {
            fontSize: '1rem',
        },
    },
    // Standardabstand
    spacing: 8,
    // Umbruch des Inhalts je nach Bildschirmgrößen
    breakpoints: {
        values: {
            xs: 0,   // kleinste Geräte (Smartphones)
            sm: 600, // Tablets
            md: 960, // Laptops
            lg: 1280, // Desktops
            xl: 1920  // Sehr große Bildschirme
        },
    },
    // Übergänge und Animationen
    transitions: {
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
        },
    },
    // Link-Farbe
    components: {
        MuiLink: {
        styleOverrides: {
            root: {
            color: 'black', // Linkfarbe auf "inherit" setzen, sodass sie die Farbe des Elternteils übernimmt
            textDecoration: 'none', // Standard-Link-Unterstreichung entfernen
            cursor: 'text',
            },
        },
        },
    },
    // Schatten
    shadows: [ // Standardmäßig alle Schatten auf 'none' (müssen leider 25 sein)
        'none', //1 
        'none', //2
        'none', //3
        'none', //4
        'none', //5
        'none', //6
        'none', //7
        'none', //8
        'none', //9
        'none', //10
        'none', //11
        'none', //12
        'none', //13
        'none', //14
        'none', //15
        'none', //16
        'none', //17
        'none', //18
        'none', //19
        'none', //20
        'none', //21
        'none', //22
        'none', //23
        'none', //24
        'none', //25
    ],  
};

export const brandedComponents: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        minWidth: 'unset',
        textTransform: 'capitalize',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },
  // Text der Cards auf normale Textfarbe setzen
  MuiCardContent: {
    styleOverrides: {
        root: {
            color: 'black',
            textDecoration: 'none'
        }
    }
  }
};

const brandedTheme = createTheme({
  ...theme,
  components: brandedComponents,
});

export default brandedTheme;
