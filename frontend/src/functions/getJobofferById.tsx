import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

//-------------------------------------Interface----------------------------------------------
// Die Interface für das Konstrukt, in das die Daten der Joboffer Detailansicht gespeichert werden
export interface JobofferDetails {
  jobofferId: number;
  jobofferTitle: string;
  jobofferDescription: string;
  jobofferRating: number;
  jobofferNotes: string;
  contactId: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyId: number;
  companyName: string;
  companyEmployees: number;
  companyLogo: string;
  addressId: number;
  addressStreet: string;
  addressStreetNumber: string;
  addressCity: string;
  addressZipCode: number;
  addressCountry: string;
  appointments: Appointment[];
}

type Appointment = {
  appointmentId: number;
  appointmentDate: string;
  appointmentName: string;
};

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
  notes: string;
  contact: Contact;
  company: Company;
};

type Contact = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string;
};

type Company = {
  id: number;
  companyname: string;
  empcount: number;
  logo: string;
  address: Address;
};

type Address = {
  id: number;
  street: string;
  streetno: string;
  city: string;
  zip: number;
  country: string;
};

type Appointments = {
  id: number;
  appointmentdate: string;
  appointmentname: string;
};

//-------------------------------------Daten-API----------------------------------------------
// Funktion zum Abrufen aller Jobofferdaten
export async function getAllJobofferDetailsById(id: string) {
  try {
    // Daten mit Axios holen
    const response = await axios.get<JobofferResponse>(
      `http://localhost:8080/joboffer/${id}`
    );

    // KI Verbesserung: Prüfen, ob Daten vorhanden sind
    if (!response.data) {
      throw new Error("Unerwartetes Format der Daten vom Server.");
    }

    // Debugging
    console.log("Joboffer empfangen:", response); // Zuweisen der Daten in den JobofferDetailsDatentyp

    // Umwandlung der Daten in ein Array von Joboffer Details
    const jobofferData: JobofferDetails = {
      jobofferId: response.data.joboffer?.id,
      jobofferTitle: response.data.joboffer?.jobtitle,
      jobofferDescription: response.data.joboffer?.description,
      jobofferRating: response.data.joboffer?.rating,
      jobofferNotes: response.data.joboffer?.notes,
      contactId: response.data.joboffer?.contact.id,
      contactName:
        response.data.joboffer?.contact.firstname +
        " " +
        response.data.joboffer?.contact.lastname,
      contactEmail: response.data.joboffer?.contact.email,
      contactPhone: response.data.joboffer?.contact.phoneno,
      companyId: response.data.joboffer?.company.id,
      companyName: response.data.joboffer?.company.companyname,
      companyEmployees: response.data.joboffer?.company.empcount,
      companyLogo: response.data.joboffer?.company.logo,
      addressId: response.data.joboffer?.company.address.id,
      addressStreet: response.data.joboffer?.company.address.street,
      addressStreetNumber: response.data.joboffer?.company.address.streetno,
      addressCity: response.data.joboffer?.company.address.city,
      addressZipCode: response.data.joboffer?.company.address.zip,
      addressCountry: response.data.joboffer?.company.address.country,
      appointments: (response.data.appointments || []).map(
        // KI Bug Fix: nicht auf appointments = undefinded gecheckt, und daher hat map nicht funktioniert
        (appointment: {
          id: number;
          appointmentdate: string;
          appointmentname: string;
        }) => {
          return {
            appointmentId: appointment.id,
            appointmentDate: appointment.appointmentdate,
            appointmentName: appointment.appointmentname,
          };
        }
      ),
    };
    // Joboffer Details zurückgeben
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
export function useJobofferDetails(id?: string) {
  // const [variableName, setMethodName] = useState<type>(initialState); // Element, dass das enthält, wird neu geladen, wenn sich die variable ändert
  const [jobofferDetails, setJoboffer] = useState<JobofferDetails>(); // Joboffers speichern
  const [loading, setLoading] = useState<boolean>(true); // Ladezustand speichern
  const [error, setError] = useState<string | null>(null); // Fehlerbehandlung

  // // useEffect wird nur einmal beim ersten Rendern des Components ausgeführt
  useEffect(() => {
    // Funktion zum Abrufen der Joboffer
    const loadJobofferDetails = async () => {
      try {
        // KI: Fehlerstatus zurücksetzen, wenn eine neue Anfrage gestartet wird
        setError(null);
        // Ladezustand setzen (Daten werden geladen)
        setLoading(true);

        // Falls keine Id vorhanden:
        if (!id) {
          return { jobofferDetails: [], loading: false, error: null };
        }

        // Falls Id vorhanden: Daten mit seperater axios-get-Funktion holen
        const response = await getAllJobofferDetailsById(id);

        // Speichern der zugewiesenen Daten
        setJoboffer(response);
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
    loadJobofferDetails();
  }, [id]); // Effekt läuft nur einmal beim ersten Laden, oder wenn sich die Id ändert

  // Alle Werte übergeben
  return { jobofferDetails, loading, error };
}
