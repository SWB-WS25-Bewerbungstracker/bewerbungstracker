import axios from "axios"; 
import { useEffect, useState } from "react";
import applicationTrackerApi from "../services/api.ts";

/* Modul, dass die Liste an Unternehmensdaten und zugehörigen Ids holt */

/*// Verwendung des Custom Hooks, um die Firmen- und Ladezustandsdaten zu holen:
    const { listOfCompanies, loading } = useCompanyData(); */

// Typ für die Unternehmensdaten
export interface Company {
  id: string;
  name: string;
}

// KI (Abfrage von Seite Bewerbungen übernommen und angepasst)
export async function getAllCompanies(): Promise<Company[]> {
  try {
    const response = await applicationTrackerApi.get("http://localhost:8080/companies");

    // Umwandlung der Daten in ein Array von Firmennamen
    const companyData = response.data.map(
      (company: { id: number; companyname: string }) => ({
        id: company.id,
        name: company.companyname,
      })
    );

    // Liste der Firmennamen zurückgeben
    return companyData;
  } catch (err) {
    console.log("Fehler beim Laden der Unternehmensdaten:", err);
    return [];
  }
}

// KI: Custom Hook, der die Firmen abruft und den Ladezustand verwaltet
export function useCompanyData() {
  const [listOfCompanies, setCompanyList] = useState<Company[]>([]);
  const [loadingCompanies, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCompanies = async () => {
      setLoading(true);
      const companies = await getAllCompanies();
      setCompanyList(companies);
      setLoading(false);
    };

    loadCompanies();
  }, []); // Effekt läuft nur einmal beim ersten Laden

  return { listOfCompanies, loadingCompanies };
}
