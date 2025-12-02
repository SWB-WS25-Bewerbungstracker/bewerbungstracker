import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { parseDateToString } from "./parseDate";

/* Modul, dass die Liste an Joboffer-Daten holt */

/*// Verwendung des Custom Hooks, um die Joboffer- und Ladezustandsdaten zu holen:
    const { listOfJoboffers, loading, error } = useJobofferData(); */

//-------------------------------------Interface----------------------------------------------
// Typ für die Joboffer Daten
export interface JobofferOverview {
  jobofferId: number;
  jobofferName: string;
  companyID: number;
  companyName?: string;
  companyImage?: string;
  nextAppointment?: string;
}

//-------------------------------------Daten-API----------------------------------------------
// Funktion zum Abrufen aller Jobofferdaten
export async function getOverviewOfAllJoboffers() {
  try {
    // Daten mit Axios holen
    const response = await axios.get("http://localhost:8080/joboffer");

    // KI Verbesserung: Prüfen, ob Daten vorhanden sind
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Unerwartetes Format der Daten vom Server.");
    }

    // Umwandlung der Daten in ein Array von Joboffer Overviews
    const jobofferData = response.data.map(
      // Map: Durchlaufen des JSONs, da es sich um ein Array an JSONs handelt
      (joboffer: {
        // Welche Daten (Attributname: Typ) werden von Backend empfangen:
        jobofferid: number;
        joboffername: string;
        companyid: number;
        companyname: string;
        nextapptdate: string;
      }) => {
        // Debugging
        console.log(
          "ID:",
          joboffer.jobofferid,
          "Name:",
          joboffer.joboffername,
          "Company ID:",
          joboffer.companyid,
          "Company:",
          joboffer.companyname,
          "Next Apointment:",
          joboffer.nextapptdate
        ); // Zuweisen der Daten in den JobofferOverview Datentyp
        return {
          jobofferId: joboffer.jobofferid,
          jobofferName: joboffer.joboffername,
          companyID: joboffer.companyid,
          companyName: joboffer.companyname,
          companyImage: "", // Default: Leerer String, da momentan noch kein Bild mitgegeben wird
          nextAppointment: parseDateToString(joboffer.nextapptdate),
        };
      }
    );
    // Liste der Joboffers zurückgeben
    return jobofferData;
  } catch (error) {
    // Fehlerbehandlung
    console.error("Fehler beim Laden der Unternehmensdaten:", error);
    // KI: Fehler weitergeben
    throw error;
  }
}

//-------------------------------------Custom-Hook----------------------------------------------
// Custom Hook, der die Joboffers abruft und den Ladezustand verwaltet sowie die Fehlerbehandlung übernimmt
export function useJobofferData() {
  // const [variableName, setMethodName] = useState<type>(initialState); // Element, dass das enthält, wird neu geladen, wenn sich die variable ändert
  const [listOfJoboffers, setJobofferList] = useState<JobofferOverview[]>([]); // Joboffers speichern
  const [loading, setLoading] = useState<boolean>(true); // Ladezustand speichern
  const [error, setError] = useState<string | null>(null); // Fehlerbehandlung

  // // useEffect wird nur einmal beim ersten Rendern des Components ausgeführt
  useEffect(() => {
    // Funktion zum Abrufen der Joboffers
    const loadJoboffers = async () => {
      try {
        // KI: Fehlerstatus zurücksetzen, wenn eine neue Anfrage gestartet wird
        setError(null);
        // Ladezustand setzen (Daten werden geladen)
        setLoading(true);
        // Daten mit seperater axios-get-Funktion holen
        const response = await getOverviewOfAllJoboffers();

        // KI: Hinweis bekommen, dass nicht geprüft wurde, ob überhaupt Daten im Backend zu senden sind (kein Fehler, sondern einfach nichts zu holen)
        if (response.length === 0) {
          setError("Es sind noch keine Stellenausschreibungen hinterlegt.");
        } else {
          // // Wenn Joboffers vorhanden sind,die Joboffers speichern
          setJobofferList(response);
        }
      } catch (err: unknown) {
        // Fehlerbehandlung im Falle eines Fehlers bei der API-Anfrage (basierend auf KI Troubleshooting Tips)
        console.error("Fehler beim Laden der Stellenausschreibungen:", err);
        // KI: Typisieren des Fehlers als Axios-Error
        if (err instanceof AxiosError) {
          // Fehlerantwort vom Server (z.B. 404, 500)
          if (err.response) {
            setError(
              `Fehler vom Server: ${err.response.status} - ${err.response.statusText}`
            );
          }
          // Keine Antwort vom Server (z.B. Netzwerkprobleme)
          else if (err.request) {
            setError("Keine Antwort vom Server erhalten.");
          }
          // Fehler in der Anfrage selbst
          else {
            setError("Fehler bei der Anfrage.");
          }
        }
      } finally {
        // Immer ausführen:
        // Ladezustand beenden
        setLoading(false);
      }
    };

    // Den Hook zum Abrufen der Joboffers ausführen
    loadJoboffers();
  }, []); // Effekt läuft nur einmal beim ersten Laden, ansonsten hier die Abhängigkeiten angeben

  // Alle Werte übergeben
  return { listOfJoboffers, loading, error };
}
