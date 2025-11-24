import { useParams } from 'react-router-dom'; // Zum Verarbeiten der mitgegeben Parameter
import { useEffect, useState } from "react"; 
// useState: für den internen Zustand der Komponente (Unternehmensliste)
// useEffect: führt Code nach dem Rendern aus (z. B. Daten vom Backend laden)
import axios from "axios"; 
import { Typography } from '@mui/material';
// axios: Bibliothek, um HTTP-Requests (GET, POST, PUT, DELETE …) zu machen

const Stellenansicht: React.FC = () => {

  // Extrahiere die ID aus der URL
  const { id } = useParams<{ id: string }>(); // Die ID kommt als URL-Parameter

  // useState-Hooks
  // const [variableName, setMethodName] = useState<type>(initialState); // Element, dass das enthält, wird neu geladen, wenn sich die variable ändert
  const [response, setResponse] = useState<unknown>(null); // Zustand für die Antwort vom Server
  const [loading, setLoading] = useState<boolean>(true); // Zustand, der anzeigt, ob die Daten noch geladen werden
  const [error, setError] = useState<string | null>(null); // Fehlerbeschreibung
    
  // useEffect-Hook
  // wird ausgeführt, wenn die Komponente zum ersten Mal gerendert wird
  useEffect(() => {
    if (id) {

    // Axios GET-Anfrage an das Backend senden
    axios
      // GET an Endpunkt mit Authentifizierungs-Cookie (wichtig: erst in http://localhost:8080/ einloggen)
      .get(`http://localhost:8080/joboffer/${id}`)
      // Verarbeiten der Antwort vom Backend
      .then((response) => {
        console.log('Antwort vom Server:', response.data); // Debugging
        setResponse(response.data); // Antwort in den Zustand speichern
        // Ladezustand beenden
        setLoading(false);
      })
      .catch((err) => {
        // Fehlerbehandlung
        console.error('Fehler beim Laden der Unternehmensdaten:', err);
        console.log('Error Details:', err);
        if (err.response) {
          // Fehlerantwort vom Server (z.B. 404, 500)
          setError(`Fehler vom Server: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          // Keine Antwort vom Server (z.B. Netzwerkprobleme)
          setError('Keine Antwort vom Server erhalten.');
        } else {
          // Fehler in der Anfrage selbst
          setError('Fehler bei der Anfrage.');
        }
        setLoading(false);
      });
    }
  }, [id]);
  // Falls noch Daten geladen werden, dies auf der Seite ausgeben
  if (loading) {
    return <div>Loading...</div>;
  }
  // Falls ein Fehler auftrat, den auf der Seite ausgeben
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Stellenansicht</h1>
      <p>Hier werden Informationen über die Bewerbungsstelle angezeigt.</p>
      <Typography> 
        {JSON.stringify(response)} {/* Antwort als String anzeigen */}
      </Typography>
    </div>
  );
};

export default Stellenansicht; 