import CardGrid from "../components/Grid";
import TestButtonGroup from "../components/TestButtonGroup"

import { useEffect, useState } from "react"; 
// useState: für den internen Zustand der Komponente (Unternehmensliste)
// useEffect: führt Code nach dem Rendern aus (z. B. Daten vom Backend laden)
import axios from "axios"; 
import { parseDatePassed } from "../functions/parseDateFromIso";
// axios: Bibliothek, um HTTP-Requests (GET, POST, PUT, DELETE …) zu machen

//-------------------------------------Interface----------------------------------------------
// Die Interface für die Daten, die von der Axios Anfrage zurückkommen sollten
interface JobofferData {
  id: number;
  title: string;
  image?: string;
  description_1?: string;
  description_2?: string;
}

//-------------------------------------Seite----------------------------------------------
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
      .get('http://localhost:8080/joboffer')
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
            description_2: parseDateToString(joboffer.nextapptdate)            
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
        <TestButtonGroup buttons={[
            { label: "Löschen", onClick: () => {deleteButtonClicked()} },
            { label: "Hinzufügen", onClick: () => {addButtonClicked()}}
        ]}/>
        <p> Leiste mit Filter/Suchfunktionen muss noch eingefügt werden.</p>
      <CardGrid data={joboffer}/>
    </div>
  );
};

export default Bewerbungen;

//-------------------------------------Hilfsfunktionen----------------------------------------------
// Funktion, um ein Datum in einen String umzuwandeln (an KI Bsp orientiert)
/*
function parseDatePassed (isoDate:string) {
  if (isoDate) {
    const date = new Date(isoDate);
    const dayPart = date.toLocaleDateString("de-DE", {
      weekday: "long",
    });
    const datePart = date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    const timePart = date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit"
    });
    return (`Nächster Termin: am ${dayPart} den ${datePart} um ${timePart} Uhr`)
  } else {
    return ('')
  }
}
  */

function parseDateToString (passedDate?: string) : string | undefined{
  // Versuchen, die Rückgabewerte der parseDatePassed-Funktion zu entpacken, falls dieser existiert
  if (passedDate){
    const result = parseDatePassed(passedDate); 
    // Überprüfen, ob das Ergebnis ein Array ist und es entpacken
    if (result && result.length === 3) {
      const [dayPart, datePart, timePart] = result;

      // Wenn alle Teile vorhanden sind, erstelle den Terminstring
      return `Nächster Termin: am ${dayPart} den ${datePart} um ${timePart} Uhr`;
    } else {
      // Wenn das Ergebnis nicht gültig ist, gib einen leeren String zurück
      return '';
    }
  }
}

// Funktion, die beim Click auf den Löschen Button ausgeführt wird
const deleteButtonClicked = () => {
    console.log('Löschen-Button wurde geklickt!');
  };

// Funktion, die beim Click auf den Hinzufügen Button ausgeführt wird
const addButtonClicked  = () => {
    console.log('Hinzufügen-Button wurde geklickt!');
    window.open('/formular'); // Zum öffnen in einer anderen Seite
    //window.location.replace('/home'); // Zum öffnen auf dieser Seite
  }; 

