import { Routes, Route } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";

import ResponsiveAppBar from "./components/AppBarWithResponsiveMenu";
import Home from "./pages/Home";
import Termine from "./pages/Termine";
import Bewerbungen from "./pages/Bewerbungen";
import Dokumente from "./pages/Dokumente";
import Einstellungen from "./pages/Einstellungen";
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import Stellenansicht from "./pages/Stellenansicht";
import PrivateRoute from "./helper/PrivateRoute";
import FormularBewerbungHinzufuegen from "./pages/FormularBewerbung";

import { CssBaseline} from "@mui/material"; // aktuell nicht mehr verwendet, da es den Dark Mode blockiert hat

function App() {
  return (
    <> 
      <CssBaseline />
      <ResponsiveAppBar/>
      <div className="content">
        <ReactKeycloakProvider authClient={keycloak}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/termine" element={<PrivateRoute><Termine /></PrivateRoute>} />
          <Route path="/bewerbungen" element={<PrivateRoute><Bewerbungen /></PrivateRoute>} />
          <Route path="/dokumente" element={<PrivateRoute><Dokumente /></PrivateRoute>} />
          <Route path="/einstellungen" element={<PrivateRoute><Einstellungen /></PrivateRoute>} />
          <Route path="/profil" element={<PrivateRoute><Profil /></PrivateRoute>} />
          <Route path="/stellenansicht/:id" element={<PrivateRoute><Stellenansicht /></PrivateRoute>} />
          <Route path="/formular" element={<PrivateRoute><FormularBewerbungHinzufuegen /></PrivateRoute>} />
{/*       <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/" element={<Navigate to="/home" replace />} /> */}
        </Routes>
        </ReactKeycloakProvider>
      </div>
    </>
  );
}

export default App;