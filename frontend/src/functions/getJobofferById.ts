// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { Appointment } from "./parseDate";
import applicationTrackerApi from "../services/api.ts";

//-------------------------------------Interface----------------------------------------------
// Die Interface für das Konstrukt, in das die Daten der Joboffer Detailansicht gespeichert werden
export interface JobofferCompleteInformation {
  jobofferId: number;
  jobofferName: string;
  jobofferDescription?: string;
  jobofferRating?: number;
  jobofferMinimumWage?: number;
  jobofferMaximumWage?: number;
  jobofferNotes?: string;

  companyName?: string;
  companyEmployees?: number;
  companyLogo?: string;

  appointments?: Appointment[];

  addressId?: number;
  addressStreet?: string;
  addressStreetNumber?: string;
  addressZipCode?: string;
  addressCity?: string;
  addressCountry?: string;

  contactId?: number;
  contactFirstName?: string;
  contactLastName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

// Die Interface für die Daten, die von der Axios Anfrage zurückkommen sollten
interface JobofferResponse {
  joboffer: Joboffer;
  appointments: Appointments[];
}

type Joboffer = {
  id: number;
  jobtitle: string;
  description: string;
  rating: number;
  wagemin: number;
  wagemax: number;
  notes: string;
  contact: Contact;
  companyname: string;
  empcount: number;
  address: Address;
  logo: string;
};

type Contact = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string;
};

type Address = {
  id: number;
  street: string;
  streetno: string;
  city: string;
  zip: string;
  country: string;
};

type Appointments = {
  appointmentId: number;
  appointmentDate: string;
  appointmentName: string;
};

//-------------------------------------Daten-API----------------------------------------------
// Funktion zum Abrufen aller Jobofferdaten
export async function getAllJobofferInformationById(id: string | number) {
  // KI Fehlerkorrektur: zusätzlich zu null und undefined prüfen, ob id ein leeres Objekt ist
  if (!id || (typeof id === "object" && Object.keys(id).length === 0)) {
    return undefined;
  }
  try {
    // Daten mit Axios holen
    const response = await applicationTrackerApi.get<JobofferResponse>(
      `http://localhost:8080/joboffer/${id}`
    );

    // Debugging
    console.debug(
      `Antwort vom Server zur API /joboffer/${id} (= alle Informationen zu einer Joboffer): `,
      response
    );

    // KI Verbesserung: Prüfen, ob Daten vorhanden sind
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Keine Daten vom Server erhalten.");
    }
  } catch (error) {
    // Fehlerbehandlung
    console.error("Fehler beim Laden der Unternehmensdaten:", error);
    // KI: Fehler weitergeben
    throw error;
  }
}

//-------------------------------------Custom-Hook----------------------------------------------
// Custom Hook, der die Joboffers abruft und den Ladezustand verwaltet sowie die Fehlerbehandlung übernimmt
export function useCompleteJobofferInformation(id?: string) {
  // const [variableName, setMethodName] = useState<type>(initialState); // Element, dass das enthält, wird neu geladen, wenn sich die variable ändert
  const [jobofferCompleteInformation, setJoboffer] =
    useState<JobofferCompleteInformation>(); // Joboffers speichern
  const [loadingStateJoboffer, setLoading] = useState<boolean>(true); // Ladezustand speichern
  const [errorRetrievingJoboffer, setError] = useState<string | null>(null); // Fehlerbehandlung

  // // useEffect wird nur einmal beim ersten Rendern des Components ausgeführt
  useEffect(() => {
    // Funktion zum Abrufen der Joboffer
    const loadAllJobofferInformation = async () => {
      try {
        // KI: Fehlerstatus zurücksetzen, wenn eine neue Anfrage gestartet wird
        setError(null);
        // Ladezustand setzen (Daten werden geladen)
        setLoading(true);

        // Falls keine Id vorhanden:
        if (!id) {
          return {
            jobofferCompleteInformation: [],
            loading: false,
            error: null,
          };
        }

        // Falls Id vorhanden: Daten mit seperater axios-get-Funktion holen
        const response = await getAllJobofferInformationById(id);

        // Wenn eine Antwort erhalten wurde, diese verarbeiten
        if (response) {
          // Zuweisen der Daten in den JobofferCompleteInformation Datentyp
          const jobofferData: JobofferCompleteInformation = {
            jobofferId: response.joboffer?.id,
            jobofferName: response.joboffer?.jobtitle,
            jobofferDescription: response.joboffer?.description,
            jobofferRating: response.joboffer?.rating,
            jobofferMinimumWage: response.joboffer?.wagemin,
            jobofferMaximumWage: response.joboffer?.wagemax,
            jobofferNotes: response.joboffer?.notes,
            contactId: response.joboffer?.contact?.id,
            contactFirstName: response.joboffer?.contact?.firstname,
            contactLastName: response.joboffer?.contact?.lastname,
            contactEmail: response.joboffer?.contact?.email,
            contactPhone: response.joboffer?.contact?.phoneno,
            companyName: response.joboffer?.companyname,
            companyEmployees: response.joboffer?.empcount,
            companyLogo: response.joboffer?.logo,
            addressId: response.joboffer?.address?.id,
            addressStreet: response.joboffer?.address?.street,
            addressStreetNumber: response.joboffer?.address?.streetno,
            addressCity: response.joboffer?.address?.city,
            addressZipCode: response.joboffer?.address?.zip,
            addressCountry: response.joboffer?.address?.country,
            appointments: (response.appointments || []).map(
              // KI Bug Fix: nicht auf appointments = undefinded gecheckt, und daher hat map nicht funktioniert
              (appointment: {
                appointmentId: number;
                appointmentDate: string;
                appointmentName: string;
              }) => {
                return {
                  appointmentId: appointment.appointmentId,
                  appointmentDate: appointment.appointmentDate,
                  appointmentName: appointment.appointmentName,
                };
              }
            ),
          };
          // Speichern der zugewiesenen Joboffer Details Daten
          setJoboffer(jobofferData);
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
    loadAllJobofferInformation();
  }, [id]); // Effekt läuft nur einmal beim ersten Laden, oder wenn sich die Id ändert

  // Alle Werte übergeben
  return {
    jobofferCompleteInformation,
    loadingStateJoboffer,
    errorRetrievingJoboffer,
  };
}
