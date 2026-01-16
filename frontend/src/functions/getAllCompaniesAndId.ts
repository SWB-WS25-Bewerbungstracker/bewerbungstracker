import { useEffect, useState } from "react";
import applicationTrackerApi from "../services/api.ts";

/* Modul, dass die Liste an Unternehmensdaten und zugehörigen Ids holt */

/* Verwendung des Custom Hooks, um die Firmen- und Ladezustandsdaten zu holen:
    const { listOfCompanies, loading } = useCompanyData(); */

//-------------------------------------Interfaces----------------------------------------------
// Tyo der Axios Antwort
interface ComapnyResponse {
  companyname: string;
}

// Typ für die Unternehmensdaten
export interface Company {
  id: string;
  name: string;
}

//-------------------------------------Daten-API----------------------------------------------
// Abfrage von der Liste aller Firmen vom backend mithilfe von Axios
export async function getAllCompanies() {
  try {
    // Axios Anfrage
    const response = await applicationTrackerApi.get(
      "http://localhost:8080/joboffer/companies"
    );
    // Antwort weitergeben auf aufrufende Funktion
    return response.data;
  } catch (err) {
    // Fehlerbehandlung
    console.debug("Fehler beim Laden der Unternehmensdaten:", err);
    return []; // Im Fehlerfall ein Leeres Array zurückgeben
  }
}

//-------------------------------------Custom-Hook----------------------------------------------
// Custom Hook, der die Firmen abruft und den Ladezustand verwaltet
export function useCompanyData() {
  const [listOfCompanies, setCompanyList] = useState<Company[]>([]);
  const [loadingCompanies, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Funktion zum Laden der Liste aller Unternehmen
    const loadCompanies = async () => {
      setLoading(true);

      // Externe Axios Anfrage
      const response = await getAllCompanies();

      // Umwandlung der Daten in ein Array von Firmennamen
      const companyList = response.map((company: ComapnyResponse) => ({
        id: company.companyname,
        name: company.companyname,
      }));

      setCompanyList(companyList);
      setLoading(false);
    };

    // Funktion zum Laden der Liste aller Unternehmen aufrufen
    loadCompanies();
  }, []); // Effekt läuft nur einmal beim ersten Laden

  return { listOfCompanies, loadingCompanies };
}
