// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import applicationTrackerApi from "../services/api.ts";
import { parseDateToNextAppointmentString } from "./parseDate";

/* Modul, dass die Liste an Joboffer-Daten holt */

/* Verwendung des Custom Hooks, um die Joboffer- und Ladezustandsdaten zu holen:
    const { listOfJoboffers, loading, error } = useJobofferData(); */

// Funktion kann mehrere Verwendungszwecke haben und je nachdem gibt es andere Rückgabewerte
type UseCase = "overview" | "addAppointment";
/* use = 'addAppointment' 
    ->  gibt Joboffer Id und JobofferName + CompanyName zurück
        für Dropdown Menü beim hinzufügen von Terminen
  use = 'overview' (default)
    ->  gibt Daten für die Stellenübersicht-Cards zurück
*/

//-------------------------------------Interface----------------------------------------------
// Typ für die erhaltenen Response Daten
interface JobofferResponse {
  jobofferid: number;
  joboffername: string;
  companyid: number;
  companyname: string;
  nextapptdate: string;
}

// Typ für die Joboffer Daten
export interface JobofferOverview {
  jobofferId: number;
  jobofferName: string;
  companyID?: number;
  companyName?: string;
  companyImage?: string;
  nextAppointment?: string;
}

// Typ für die Joboffer Daten
export interface JobofferAndCompany {
  jobofferId: number;
  jobofferAndCompanyName: string;
}

//-------------------------------------Daten-API----------------------------------------------
// Funktion zum Abrufen aller Jobofferdaten
export async function getOverviewOfAllJoboffers() {
  try {
    // Daten mit Axios holen
    const response = await applicationTrackerApi.get(
      "http://localhost:8080/joboffer"
    );

    // Debugging
    console.log("Antwort vom Server zur API /joboffer: ", response);

    // Weitergabe der Daten an aufrufende Funktion
    return response.data;
  } catch (error) {
    // Fehlerbehandlung
    // Fehler auf Konsole ausgeben
    console.error("Fehler beim Laden der Unternehmensdaten über Axios:", error);
    // KI: Fehler weitergeben
    throw error;
  }
}

//-------------------------------------Custom-Hook----------------------------------------------
// Custom Hook, der die Joboffers abruft und den Ladezustand verwaltet sowie die Fehlerbehandlung übernimmt
export function useOverviewOfAllJoboffers(use: UseCase = "overview") {
  // const [variableName, setMethodName] = useState<type>(initialState); // Element, dass das enthält, wird neu geladen, wenn sich die variable ändert
  const [listOfJoboffers, setJobofferList] = useState<JobofferOverview[]>([]);
  const [listOfJoboffersAndCompanyNames, setJobofferDropDownList] = useState<
    JobofferAndCompany[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect wird nur einmal beim ersten Rendern des Components ausgeführt
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
          // Wenn der Verwendungszweck das Hinzufügen eines Termins ist
          if (use == "addAppointment") {
            const JoboffersForDropdown = response.map(
              (joboffer: JobofferResponse) => {
                return {
                  jobofferId: joboffer.jobofferid,
                  jobofferAndCompanyName: `${joboffer.joboffername} + " - " + ${joboffer.companyname}`,
                };
              }
            );
            setJobofferDropDownList(JoboffersForDropdown);
          }
          // Wenn der Verwendungszweck die Übersicht aller Stellen ist
          else {
            const JoboffersForOverview = response.map(
              (joboffer: JobofferResponse) => {
                return {
                  jobofferId: joboffer.jobofferid,
                  jobofferName: joboffer.joboffername,
                  companyID: joboffer.companyid,
                  companyName: joboffer.companyname,
                  companyImage: "", // Default: Leerer String, da momentan noch kein Bild mitgegeben wird
                  nextAppointment: parseDateToNextAppointmentString(
                    joboffer.nextapptdate
                  ),
                };
              }
            );
            // Wenn der Verwendungszweck die Übersichtskarten sind
            setJobofferList(JoboffersForOverview); // Joboffers speichern
          }
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
  }, [use]); // Effekt läuft nur einmal beim ersten Laden, ansonsten hier die Abhängigkeiten angeben

  // Wenn der Verwendungszweck das Hinzufügen eines Termins ist
  if (use == "addAppointment") {
    return { listOfJoboffersAndCompanyNames, loading, error };
  }
  // Wenn der Verwendungszweck die Übersichtskarten sind
  return { listOfJoboffers, loading, error }; // Alle Werte übergeben
}
