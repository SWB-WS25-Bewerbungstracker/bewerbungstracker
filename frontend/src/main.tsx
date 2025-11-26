import App from './App.tsx'
//import './App.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import keycloak from './keycloak.tsx'

/*
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
*/
keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
    pkceMethod: "S256",
    redirectUri: `${window.location.origin}/`,  // Explicit redirect URI
    silentCheckSsoRedirectUri: undefined,
  })
  .then(authenticated => {
    if (authenticated) {
      ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      )
    } else {
      keycloak.login()
    }
  })
  .catch(() => {
    console.error('Keycloak init failed')
  })
  setInterval(() => {
  keycloak
    .updateToken(30)
    .then(refreshed => {
      if (refreshed) {
        console.log("Token refreshed", new Date());
      }
    })
    .catch(err => console.error("Failed to refresh token", err));
}, 10000);