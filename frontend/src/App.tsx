import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/AppBarWithResponsiveMenu";
import Home from "./pages/Home";
import Termine from "./pages/Termine";
import Bewerbungen from "./pages/Bewerbungen";
import Dokumente from "./pages/Dokumente";
import Einstellungen from "./pages/Einstellungen";
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import Firmenansicht from "./pages/Firmenansicht";

import { CssBaseline} from "@mui/material"; // aktuell nicht mehr verwendet, da es den Dark Mode blockiert hat

function App() {
  return (
    <> 
      {/* <CssBaseline /> */} 
      <ResponsiveAppBar/>
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/termine" element={<Termine />} />
          <Route path="/bewerbungen" element={<Bewerbungen />} />
          <Route path="/dokumente" element={<Dokumente />} />
          <Route path="/einstellungen" element={<Einstellungen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/firmenansicht" element={<Firmenansicht />} />
        </Routes>
      </div>
    </>
  );
}

export default App;