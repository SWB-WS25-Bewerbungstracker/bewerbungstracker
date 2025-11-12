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

// Beispiel-Daten
const exampleCardData = [
  {
    title: 'FirmaName 1',
    image: '',
    description: new Date('2025.01.01'),  // Beispiel für Date-Objekt
    link: '/firmenansicht',
  },
  {
    title: 'FirmaName 2',
    image: '',
    description: '2025.01.01 12:00',  // Beispiel für bereits formatierten String
    link: '/firmenansicht',
  },
  {
    title: 'FirmaName 3',
    image: '',
    description: 'yyyy-mm-dd hh:mm',
    link: '/firmenansicht',
  },
  {
    title: 'FirmaName 4',
    image: '',
    description: 'yyyy-mm-dd hh:mm',
    link: '/firmenansicht',
  },
  // Weitere Karten können hier hinzugefügt werden...
];

// Die Interface für die Daten, die von der Axios Anfrage zurückkommen sollten
interface CompanyData {
  id: number;
  title: string;
  image?: string;
  description?: string;
  link?: string;
}

const Dokumente: React.FC = () => {

  // NUR VORLÄUFIG
  // Axios Anfrage mit KI generiert, da in mehrere Fehler auftraten 
  // und ich ausschließen wollte, dass das Problem nicht 20cm vor der Tastatur sitzt
  // Scheint sich allerdings um ein Problem mit CORS und SpringSecurity zu handeln
  const [companies, setCompanies] = useState<CompanyData[]>([]); // Zustand für die Unternehmensdaten
  const [loading, setLoading] = useState<boolean>(true); // Ladezustand
  const [error, setError] = useState<string | null>(null); // Fehlerzustand
    useEffect(() => {
    // Axios GET-Anfrage an das Backend senden
    axios
      .get('http://localhost:8080/companies/names', {withCredentials: true}) // Hier musst du den richtigen Endpunkt angeben
      .then((response) => {
        console.log('Antwort vom Server:', response.data); 
        
        // Umwandlung der Unternehmensnamen in das benötigte Format
        const transformedData = response.data.map((companyName: string, index: number) => ({
          id: index + 1, // Dummy ID, falls du keine echte ID vom Server bekommst
          title: companyName,
          description: "Beschreibung fehlt", // Platzhalter-Text für Beschreibung
          image: "default-image.jpg", // Platzhalter-Image, falls du kein Bild hast
          link: "#", // Standardlink oder Platzhalter
        }));
        setCompanies(transformedData); // Die umgewandelten Daten setzen
        //setCompanies(response.data); // Wenn erfolgreich, die Daten speichern
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
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Bewerbungen</h2>
      <p>Leiste mit Buttons und Filter/Suchfunktionen muss noch eingefügt werden.</p>
      <p>Außerdem sollte Text oben ebenfalls noch in Container mit Padding gepackt werde.</p>
      <CardGrid data={companies}/>
    </div>
  );
};

export default Dokumente;

