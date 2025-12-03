// https://mui.com/material-ui/guides/building-extensible-themes/
// https://mui.com/material-ui/customization/dark-mode/

// Das ist erstmal nur ein Bsp, wie Themes erstellt werden können

import { createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

// KI: Funktion zum Ermitteln des aktuellen Systemmodus
export const getSystemMode = (): "light" | "dark" => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const theme = (mode: "light" | "dark"): ThemeOptions => ({
  // Farbschema
  palette: {
    mode, // KI: Tipp zur Implementation des Dark Modes: Auswahl von 'light' oder 'dark' möglich
    ...(mode === "light" // Farben für den Light-Mode
      ? {
          // Primär- und Sekundärfarbe
          primary: {
            main: "#85a1ffff",
          },
          secondary: {
            main: "#ff6eb6ff",
          },
          // Hintergrund
          background: {
            default: "#d4d4ffff",
            paper: "#ffffffff",
          },
          // Text
          text: {
            primary: "#000000ff",
            secondary: "#292929ff",
            disabled: "#757575ff",
          },
        }
      : {
          // Farben für den Dark Mode
          // Primär- und Sekundärfarbe
          primary: {
            main: "#002d57ff",
          },
          secondary: {
            main: "#66001aff",
          },
          // Hintergrund
          background: {
            default: "#000000ff",
            paper: "#252525ff",
          },
          // Text
          text: {
            primary: "#ffffffff",
            secondary: "#bbbbbbff",
            disabled: "#757575ff",
          },
        }),
  },
  // Abrundungen
  shape: {
    borderRadius: 8,
  },
  // Text: Schriftart, -größe und -breite
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.875rem",
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "1.125rem",
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    caption: {
      fontSize: "0.8rem",
      fontWeight: 400,
    },
  },
  // Standardabstand
  spacing: 8,
  // Umbruch des Inhalts je nach Bildschirmgrößen
  breakpoints: {
    values: {
      xs: 0, // kleinste Geräte (Smartphones)
      sm: 600, // Tablets
      md: 960, // Laptops
      lg: 1280, // Desktops
      xl: 1920, // Sehr große Bildschirme
    },
  },
  // Übergänge und Animationen
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
    },
  },
  // MUI-Link-Farbe
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: mode === "light" ? "#000000" : "#ffffff", // Linkfarbe je nach Theme anders
          textDecoration: "none", // Standard-Link-Unterstreichung entfernen
          cursor: "pointer",
        },
      },
    },
    // KI: Globale CSS-Überschreibungen für <a> Tags (HTML-Links)
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: mode === "light" ? "#000000" : "#ffffff", // Link-Farbe basierend auf dem Modus (hell oder dunkel)
          textDecoration: "none", // Keine standardmäßige Unterstreichung für Links
          cursor: "pointer", // Stellt sicher, dass Cursor als "Zeiger" angezeigt wird, wenn über dem Link
          "&:hover": {
            color: mode === "light" ? "#000000" : "#ffffff", // Hover-Farbe für den Link basierend auf dem Modus
            textDecoration: "underline", // Link wird unterstrichen, wenn der Benutzer mit der Maus darüber ist
          },
        },
      },
    },
  },
  // Schatten
  shadows: [
    // Standardmäßig alle Schatten auf 'none' (müssen leider 25 sein)
    "none", //1
    "none", //2
    "none", //3
    "none", //4
    "none", //5
    "none", //6
    "none", //7
    "none", //8
    "none", //9
    "none", //10
    "none", //11
    "none", //12
    "none", //13
    "none", //14
    "none", //15
    "none", //16
    "none", //17
    "none", //18
    "none", //19
    "none", //20
    "none", //21
    "none", //22
    "none", //23
    "none", //24
    "none", //25
  ],
});

export const customComponents: ThemeOptions["components"] = {
  // Buttons
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        minWidth: "unset",
        textTransform: "capitalize",
        maxHeight: "fit-content",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
  // Papers
  MuiPaper: {
    styleOverrides: {
      root: {
        m: 1,
        width: "100%",
        padding: "2%",
      },
    },
  },
  // Stack
  MuiStack: {
    defaultProps: {
      direction: "row",
      spacing: 1,
    },
  },
};

// Theme erstellen
const customTheme = createTheme({
  ...theme(getSystemMode()),
  components: customComponents,
});

export default customTheme;
