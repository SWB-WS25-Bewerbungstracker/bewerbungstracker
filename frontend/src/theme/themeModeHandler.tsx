import { useState, useEffect } from "react";
import { theme, getSystemMode } from "./theme"; // App eigener Theme-Generator
import { createTheme, type Theme } from "@mui/material/styles";

// KI: Dynamisch den Systemmodus ermitteln und das Theme anpassen
export const useThemeMode = (): Theme => {
  // Systemmodus abrufen und setzten
  const [mode, setMode] = useState<"light" | "dark">(getSystemMode());

  // Wenn der Systemmodus sich ändert, aktualisieren des App Themes
  useEffect(() => {
    // handleThemeChange wird aufgerufen, wenn sich der Systemmodus ändert
    const handleThemeChange = (e: MediaQueryListEvent) => {
      // Wenn der Systemmodus dunkel (dark) ist,
      // setze den Mode auf "dark", sonst auf "light"
      setMode(e.matches ? "dark" : "light");
    };

    // mediaQuery wird verwendet,
    // um den aktuellen Systemmodus zu überprüfen
    // (-> benutzt Benutzer das dunkle Farbschema?)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // Event-Listener, der jedes Mal ausgelöst wird, wenn sich der Systemmodus ändert
    mediaQuery.addEventListener("change", handleThemeChange);

    // Initialen Modus setzen
    setMode(getSystemMode());

    // Cleanup:
    // Entfernen des Event-Listeners, wenn der Hook nicht mehr benötigt wird,
    // um Speicherlecks zu vermeiden
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  // Theme in Abhängigkeit des aktuellen Modus erstellen
  return createTheme(theme(mode));
};
