/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/
import { Routes, Route } from "react-router-dom";
//import Navbar from "./components/Navbar";
import ResponsiveAppBar from "./components/AppBarWithResponsiveMenu";
import Home from "./pages/Home";
import Termine from "./pages/Termine";
import Bewerbungen from "./pages/Bewerbungen";
import Dokumente from "./pages/Dokumente";
import Einstellungen from "./pages/Einstellungen";
import Login from "./pages/Login";
import Profil from "./pages/Profil";

import { CssBaseline} from "@mui/material";

function App() {
  return (
    <> 
      <CssBaseline />
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
        </Routes>
      </div>
    </>
  );
}

export default App;