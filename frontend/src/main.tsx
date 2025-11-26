
import App from './App.tsx'
//import './App.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import keycloak from './keycloak.tsx'


// Show loading while Keycloak initializes
const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Loading...</p>
    </div>
  </React.StrictMode>,
)
keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
    pkceMethod: "S256",
    silentCheckSsoRedirectUri: `${window.location.origin}/`,
  })
  .then(authenticated => {
    console.log('Keycloak authenticated:', authenticated)
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    )
  })
  .catch((error) => {
    console.error('Keycloak init error:', error)
    root.render(
      <React.StrictMode>
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>Authentication Error</h1>
          <p>{error?.message || 'Failed to initialize Keycloak'}</p>
          <pre>{String(error)}</pre>
          <p>Check browser console for details</p>
        </div>
      </React.StrictMode>,
    )
  })
  setInterval(() => {
  keycloak
    .updateToken(180)
    .then(refreshed => {
      if (refreshed) {
        console.log("Token refreshed", new Date());
      }
    })
    .catch(err => console.error("Failed to refresh token", err));
}, 10000);
