// Keycloak
import { Routes, Route } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import PrivateRoute from "./helper/PrivateRoute";

// Komponenten
import ResponsiveAppBar from "./components/AppBar";

// Seiten
import Home from "./pages/Home";
import Termine from "./pages/Termine";
import Bewerbungen from "./pages/Bewerbungen";
import Einstellungen from "./pages/Einstellungen";
import Profil from "./pages/Profil";
import Stellenansicht from "./pages/Stellenansicht";
import FormularBewerbungHinzufuegen from "./pages/FormularBewerbung";

// Theme
import { CssBaseline } from "@mui/material"; // aktuell nicht mehr verwendet, da es den Dark Mode blockiert hat
import { ThemeProvider } from "@mui/material/styles";
import { useThemeMode } from "./theme/themeModeHandler"; // Dark Modus ermöglichen

function App() {
  const currentTheme = useThemeMode(); // KI: Theme dynamisch abrufen

  return (
    <ThemeProvider theme={currentTheme}>
      {/* ThemeProvider einbinden */}
      <CssBaseline />
      <ResponsiveAppBar />
      <div className="content">
        <ReactKeycloakProvider authClient={keycloak}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/termine"
              element={
                <PrivateRoute>
                  <Termine />
                </PrivateRoute>
              }
            />
            <Route
              path="/bewerbungen"
              element={
                <PrivateRoute>
                  <Bewerbungen />
                </PrivateRoute>
              }
            />
            <Route
              path="/einstellungen"
              element={
                <PrivateRoute>
                  <Einstellungen />
                </PrivateRoute>
              }
            />
            <Route
              path="/profil"
              element={
                <PrivateRoute>
                  <Profil />
                </PrivateRoute>
              }
            />
            <Route
              path="/stellenansicht/:id"
              element={
                <PrivateRoute>
                  <Stellenansicht />
                </PrivateRoute>
              }
            />
            <Route
              path="/formular/:id?"
              element={
                <PrivateRoute>
                  <FormularBewerbungHinzufuegen />
                </PrivateRoute>
              }
            />
            {/*       <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/" element={<Navigate to="/home" replace />} /> */}
          </Routes>
        </ReactKeycloakProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
