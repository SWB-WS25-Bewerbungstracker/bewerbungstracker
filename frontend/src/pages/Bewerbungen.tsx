import CardGrid from "../components/Grid";

import { useEffect, useState } from "react"; 
// useState: für den internen Zustand der Komponente (Unternehmensliste)
// useEffect: führt Code nach dem Rendern aus (z. B. Daten vom Backend laden)
import axios from "axios"; 
// axios: Bibliothek, um HTTP-Requests (GET, POST, PUT, DELETE …) zu machen

// Softwarearchitektur Bsp
/*
export default axios.create({
  baseURL: "http://localhost:82[your-unique-numer]/api-[your-hs-esslingen-user-name]/item-management/v1",
  headers: {
    "Content-type": "application/json"
  }
});
*/

// Die Interface für die Daten, die von der Axios Anfrage zurückkommen sollten
interface JobofferData {
  id: number;
  title: string;
  image?: string;
  description_1?: string;
  description_2?: string;
}

const Bewerbungen: React.FC = () => {
  
  // An früherem KI-Bsp orientiert
  // useState-Hooks
  // const [variableName, setMethodName] = useState<type>(initialState); // Element, dass das enthält, wird neu geladen, wenn sich die variable ändert
  const [joboffer, setJoboffer] = useState<JobofferData[]>([]); // Hält die Unternehmensdaten, die von der API abgerufen werden
  const [loading, setLoading] = useState<boolean>(true); // Zustand, der anzeigt, ob die Daten noch geladen werden
  const [error, setError] = useState<string | null>(null); // Fehlerbeschreibung
    
  // useEffect-Hook
  // wird ausgeführt, wenn die Komponente zum ersten Mal gerendert wird
  useEffect(() => {
    // Axios GET-Anfrage an das Backend senden
    axios
      // GET an Endpunkt mit Authentifizierungs-Cookie (wichtig: erst in http://localhost:8080/ einloggen)
      .get('http://localhost:8080/joboffer', {withCredentials: true}) 
      // Verarbeiten der Antwort vom Backend
      .then((response) => {
        console.log('Antwort vom Server:', response.data); // Debugging
        // Umwandlung der Unternehmensnamen in das benötigte Format (durgehen des JSON Arrays und Zuweisen der Daten)
        const transformedData = response.data.map((joboffer: { jobofferid: number; joboffername:string, companyname: string, nextapptdate: string}) => {
          console.log('ID:', joboffer.jobofferid, 'Name:', joboffer.joboffername, 'Company:', joboffer.companyname, 'Next Apointment:', joboffer.nextapptdate); // Debugging
          return { // Zuweisung der Daten 
            id: joboffer.jobofferid,
            title: joboffer.joboffername,
            description_1: joboffer.companyname,
            description_2: joboffer.nextapptdate
          };
        });
        // Speichern der Daten in eine Konstante außerhalb des Axios Blocks, damit diese danach an CardGrid übergeben werden kann
        setJoboffer(transformedData); 
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
  }, []);
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
      <h2>Bewerbungen</h2>
      <p>Leiste mit Buttons und Filter/Suchfunktionen muss noch eingefügt werden.</p>
      <CardGrid data={joboffer}/>
    </div>
  );
};

export default Bewerbungen;

