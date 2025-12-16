// https://mui.com/material-ui/react-text-field/
// https://mui.com/material-ui/api/text-field/
// https://mui.com/material-ui/react-autocomplete/#combo-box

/* Bugs gefunden:
- Termine können gelöscht und hinzugefügt werden, aber noch nicht bearbeitet 
*/

import {
  Autocomplete,
  Box,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ButtonGroup from "./ButtonGroup.tsx";
import axios from "axios";
import applicationTrackerApi from "../services/api.ts";
import { useCompanyData } from "../functions/getAllCompaniesAndId";
import { useJobofferDetails } from "../functions/getJobofferById";
import AddAppointments from "./AddAppointments";
import { Send } from "@mui/icons-material";
import {
  removeIdForNewAppointments,
  type Appointment,
} from "../functions/parseDate";

const TitleWidth = "20%";

//-------------------------------------Interface----------------------------------------------
interface JobofferFormData {
  jobofferId: number | string; //!
  jobofferName: string;
  jobofferRating?: number | string;
  jobofferDescription?: string;
  personalNotes?: string;

  companyId?: number | string;
  companyName?: string;
  companyEmployees?: number | string;
  companyLogo?: string; //!

  appointments?: Appointment[]; // mehrere Termine können so als Array gespeichert und übergeben werden

  addressId?: number | string; //!
  addressStreet?: string;
  addressStreetNumber?: string;
  addressZipCode?: number | string;
  addressCity?: string;
  addressCountry?: string;

  distanceLength?: string;
  distanceTime?: string;

  contactId?: number | string; //!
  contactFirstName?: string;
  contactLastName?: string;
  contactEmail?: string;
  contactPhoneNumber?: string;

  salaryMinimum?: number | string;
  salaryMaximum?: number | string;

  perks?: string;
}
/* type Appointment = {
  appointmentId: number | string;
  appointmentDate: string;
  appointmentName: string;
};*/

// Standardwerte
const jobofferInputData: JobofferFormData = {
  jobofferId: "",
  jobofferName: "",
  jobofferRating: "",
  jobofferDescription: "",
  personalNotes: "",

  companyId: "",
  companyName: "",
  companyEmployees: "",
  companyLogo: "",

  appointments: [],

  addressId: "",
  addressStreet: "",
  addressStreetNumber: "",
  addressZipCode: "",
  addressCity: "",
  addressCountry: "",

  distanceLength: "",
  distanceTime: "",

  contactId: "",
  contactFirstName: "",
  contactLastName: "",
  contactEmail: "",
  contactPhoneNumber: "",

  salaryMinimum: "",
  salaryMaximum: "",

  perks: "",
};

// KI: Anpassungstipp um das ganze mit Props nutzbar zu machen un  nicht Parametern, da es eine Komponente und keine Funktion ist
interface AddJobofferFormProps {
  id?: string; // Id soll optional sein
}

//-------------------------------------Komponente----------------------------------------------

const AddJobofferForm: React.FC<AddJobofferFormProps> = ({ id }) => {
  /* ----------------------------------Bisherige Daten holen---------------------------------- */
  // Daten mithilfe externer Funktion laden
  const { jobofferDetails, loadingJoboffer, errorRetrievingJoboffer } =
    useJobofferDetails(id);
  // Um welchen Vorgang handelt es sich? (Bearbeiten oder Hinzufügen (default)?)
  const [action, setAction] = useState<string>("Stellenangaben hinzufügen");

  // KI Tipp: Zuweisung der Daten im useEffect um die Daten nach dem erfolgreichen Laden zu setzen
  useEffect(() => {
    // Prüfen  Id mitgegeben wurde (= ob Stelle schon existiert)
    if (!id) {
      // sollte ein Leeres Array sein wenn keine Id mitgegeben wurde
      setAction("Stellenangaben hinzufügen");
    }
    // Prüfen ob Daten noch geladen werden
    else if (loadingJoboffer) {
      setAction("Daten werden geladen");
    } // Prüfen ob ein Fehler auftrat
    else if (errorRetrievingJoboffer) {
      setAction("Es trat ein Fehler auf: " + errorRetrievingJoboffer);
    } else if (jobofferDetails) {
      // Debugging
      console.log(
        "Abrufen der Stellendaten für ",
        id,
        "Jobofferdaten: ",
        jobofferDetails
      );
      setAction("Stellenangaben bearbeiten");
      // Falls Daten geladen wurden, dies als Standardwerte setzen
      setFormData({
        jobofferId: jobofferDetails.jobofferId,
        jobofferName: jobofferDetails.jobofferName,
        jobofferDescription: jobofferDetails.jobofferDescription,
        jobofferRating: jobofferDetails.jobofferRating,
        personalNotes: jobofferDetails.jobofferNotes,

        companyId: jobofferDetails.companyId,
        companyName: jobofferDetails.companyName,
        companyEmployees: jobofferDetails.companyEmployees?.toString(),
        companyLogo: "", // Existiert noch nicht in der Datenbank

        appointments: jobofferDetails.appointments,

        addressId: jobofferDetails.addressId,
        addressStreet: jobofferDetails.addressStreet,
        addressStreetNumber: jobofferDetails.addressStreetNumber,
        addressZipCode: jobofferDetails.addressZipCode?.toString(),
        addressCity: jobofferDetails.addressCity,
        addressCountry: jobofferDetails.addressCountry,

        distanceLength: "", // Existiert soweit ich weiß noch nicht in der Datenbank
        distanceTime: "", // Existiert soweit ich weiß noch nicht in der Datenbank

        contactId: jobofferDetails.contactId,
        contactFirstName: jobofferDetails.contactFirstName,
        contactLastName: jobofferDetails.contactLastName,
        contactEmail: jobofferDetails.contactEmail,
        contactPhoneNumber: jobofferDetails.contactPhone,

        salaryMinimum: jobofferDetails.jobofferMinimumWage,
        salaryMaximum: jobofferDetails.jobofferMaximumWage,

        perks: "", // Wird aktuell bei getJobofferById noch nicht bereitgestellt
      });
    }
  }, [id, loadingJoboffer, errorRetrievingJoboffer, jobofferDetails]);

  /* ----------------------------------Unternehmensliste abrufen---------------------------------- */

  // Verwendung des Custom Hooks, um die Firmen- und Ladezustandsdaten zu holen
  const { listOfCompanies, loadingCompanies } = useCompanyData();

  /* ----------------------------------Input Formular Datenkonstrukt---------------------------------- */

  // Konstrukt, in dem die Daten gespeichert werden und welches nachher ans Backend gesendet wird (Standard ist jobofferInputData)
  const [formData, setFormData] = useState<JobofferFormData>(jobofferInputData);

  /* ----------------------------------Funktionen zum temporären Speichern der Daten---------------------------------- */

  // Wird bei jeder Änderung in einem TextField aufgerufen (an KI Bsp orientiert)
  const handleChange = (e: { target: { name: string; value: unknown } }) => {
    // Feldname und aktuellen Wert abfragen
    const { name, value } = e.target;
    // Wert neu zuweisen
    setFormData((prev) => ({
      ...prev, // alle bisherigen Werte behalten
      [name]: value, // nur das geänderte Feld überschreiben
    }));
  };

  /* ----------------------------------Funktionen zum Senden der Daten---------------------------------- */

  // Wird beim Absenden der Daten ans Backend ausgeführt (an KI Bsp orientiert)
  const handleSubmit = async (id?: string | number) => {
    // Wenn neue Appointments enthalten sind, dann deren Ids auf leere Strings setzen:
    // Ids neuer Appontments beginnen mit 'new_',
    // die Ids alter Appointments (ohne 'new_') bleiben unverändert,
    // damit kann im Backend unterschieden werden, welche Appointments zu bearbeiten sind und welche hinzugefügt werden müssen
    const tmpAppointments = formData.appointments; // temporäre Kopie der Appointments mit der gearbeitet wird
    if (tmpAppointments) {
      formData.appointments = removeIdForNewAppointments(tmpAppointments); // setzen der geänderten Appointments
    }

    // Debugging: Appointments nach dem Entfernen der IDs
    console.log(
      "Appointments nach dem Entfernen der IDs: ",
      formData.appointments
    );

    // Speichern der geänderten Daten (um sicher zu gehen dass Änderung gespeichert ist)
    setFormData(formData);

    // Debugging
    console.log("Joboffer gesendet: Daten an Backend: ", formData);

    // Wenn eine Id vorhanden ist: Bearbeiten der Daten
    if (id) {
      // Debugging: Daten der Appointments vor bearbeiten der Ids
      console.log(
        "Appointments vor dem Entfernen der IDs: ",
        formData.appointments
      );

      // Versuch die Daten zu Senden
      try {
        const response = await applicationTrackerApi.put(
          "http://localhost:8080/joboffer/editForm", // Backend Schnittstelle
          formData, // zu sendende Daten (automatisch als JSON)
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Antwort vom Server auslesen
        console.log("Server response:", response.data);

        if (response.status === 201 || response.status === 200) {
          window.close();
        }
      } catch (error) {
        // Axios-Fehlerbehandlung
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
    // Wenn keine Id vorhanden ist: Hinzufügen der Daten
    else {
      // Debugging
      console.log("Daten an Backend: ", formData);
      // Versuch die Daten zu Senden
      try {
        const response = await applicationTrackerApi.post(
          "http://localhost:8080/joboffer/inputForm", // Backend Schnittstelle
          formData, // zu sendende Daten (automatisch als JSON)
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Antwort vom Server auslesen
        console.log("Server response:", response.data);

        if (response.status === 201 || response.status === 200) {
          window.close();
        }
      } catch (error) {
        // Axios-Fehlerbehandlung
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
  };

  // Funktion, die beim Click auf den Senden Button ausgeführt wird
  const sendButtonClicked = () => {
    console.log("Senden-Button wurde geklickt!");
    handleSubmit(id);
    // window.close();
  };

  /* ----------------------------------Input Formular---------------------------------- */

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignContent: "center",
          padding: 2,
        }}
      >
        {/* ----------------------------------Vorgang---------------------------------- */}
        <Typography variant="h5"> {action} </Typography>

        {/* ----------------------------------Titel der Stelle---------------------------------- */}
        <Paper component="form">
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ flexWrap: "wrap" }}
          >
            <Box minWidth={TitleWidth}>
              <Typography>Stellenbezeichnung </Typography>
            </Box>
            {/* ---------------Textfeld Stelle--------------- */}
            <Box flex={1}>
              <TextField
                // Darstellung
                // KI: Textfeld soll flexibel groß sein, aber Umbruch bei kleinen Bildschirmen ermöglichen
                fullWidth
                id="JobofferName"
                label="Titel der Stellenausschreibung"
                variant="outlined"
                // Zuweisung der Daten für Übergabe
                name="jobofferName"
                value={formData.jobofferName}
                onChange={handleChange}
                // Input
                slotProps={{
                  input: {},
                }}
              />
            </Box>
          </Stack>
        </Paper>

        {/* ----------------------------------Unternehmen---------------------------------- */}
        <Paper component="form">
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ flexWrap: "wrap" }}
          >
            <Box minWidth={TitleWidth}>
              <Typography>Unternehmen</Typography>
            </Box>

            {/* ---------------Autocomplete-Textfeld Unternehmen--------------- */}
            <Box flex={1}>
              {/* Während Unternehmensliste noch geladen wird: */}
              {loadingCompanies ? (
                <TextField
                  // KI: Textfeld soll flexibel groß sein, aber Umbruch bei kleinen Bildschirmen ermöglichen
                  fullWidth
                  label="Unternehmen"
                  placeholder="Lade Firmen..."
                  variant="outlined"
                  disabled
                />
              ) : (
                /* Nachdem Unternehmensliste geladen wurde: */
                // Darstellung Autocomplete
                <Autocomplete
                  freeSolo // Benutzer kann auch eigene Eingaben machen
                  id="CompanyName"
                  // KI Fehlerverbesserung --------
                  // Dropdown Auswahl (Liste an Unternehmen)
                  options={listOfCompanies.map((company) => company.name)} // Nur die Namen der Unternehmen anzeigen
                  //getOptionLabel={(option) => option} // Einfach nur den Namen anzeigen
                  value={formData.companyName || ""} // Wenn es einen Wert gibt, zeige ihn an, sonst leer
                  onChange={(_event, newValue) => {
                    // Wenn der Benutzer einen Namen auswählt
                    const selectedName = newValue || ""; // Entweder den ausgewählten Wert nehmen oder sonst leer lassen
                    // Finde das Unternehmen anhand des eingegebenen Namens (um Id wieder zu bekommen für Zuweisung)
                    const selectedCompany = listOfCompanies.find(
                      (c) => c.name === selectedName
                    );
                    // Zuweisen der Daten
                    setFormData((prev) => ({
                      ...prev,
                      companyName: selectedName,
                      companyId: selectedCompany ? selectedCompany.id : "", // Falls keine Firma gefunden, ID leer lassen
                    }));
                  }}
                  // Ende Fehlerverbesserung -------
                  // KI: Textfeld soll flexibel groß sein, aber Umbruch bei kleinen Bildschirmen ermöglichen
                  fullWidth
                  // Wenn kein Unternehmen ausgewählt ist, soll eins eingegeben werden können
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // Darstellung des Textfelds
                      label="Unternehmen"
                      // Zuweisung der Daten für Übergabe (falls Text eingegeben wurde und nicht mit Autocomplete ausgefüllt)
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      // Input
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          type: "search",
                        },
                      }}
                    />
                  )}
                />
              )}
            </Box>
          </Stack>
        </Paper>
        {/* ----------------------------------Unternehmensbeschreibung---------------------------------- */}
        <Paper component="form">
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ flexWrap: "wrap" }}
          >
            <Box minWidth={TitleWidth}>
              <Typography>Kurzbeschriebung der Stelle</Typography>
            </Box>
            {/* ---------------Textfeld Beschriebung--------------- */}
            <Box flex={1}>
              <TextField
                // Darstellung
                id="JobofferDescription"
                //label="Beschreibung der Stelle"
                placeholder="Beschreibung der Stelle"
                variant="outlined"
                multiline
                minRows={5}
                fullWidth
                // Zuweisung der Daten für Übergabe
                name="jobofferDescription"
                value={formData.jobofferDescription}
                onChange={handleChange}
                // Input
                slotProps={{
                  input: {},
                }}
              />
            </Box>
          </Stack>
        </Paper>
        {/* ----------------------------------Termine---------------------------------- */}
        <Paper component="form">
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ flexWrap: "wrap" }}
          >
            <Box minWidth={TitleWidth}>
              <Typography>Termine</Typography>
            </Box>
            {/* ---------------Externe Komponente zur Datumserstellung--------------- */}
            <Box flex={1}>
              <AddAppointments
                // Übergabe des Appointment Arrays
                appointments={
                  formData.appointments ? formData.appointments : []
                }
                // KI: verarbeitet Änderungen der Daten der untergeordneten Lomponenete
                // und ändert die Formular Daten hier dementsprechend ab
                onAppointmentChange={(tmpAppointments) =>
                  setFormData({ ...formData, appointments: tmpAppointments })
                }
              />
            </Box>
          </Stack>
        </Paper>
        {/* ----------------------------------Adresse---------------------------------- */}
        <Paper component="form">
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ flexWrap: "wrap" }}
          >
            <Box minWidth={TitleWidth}>
              <Typography paddingBottom={1}>Adresse</Typography>
            </Box>
            {/* ---------------Textfelder--------------- */}
            <Box flex={1}>
              <Stack
                direction="row"
                spacing={1}
                paddingLeft={1}
                paddingBottom={1}
              >
                {/* ---------------Straße--------------- */}
                <TextField
                  // Darstellung
                  id="AddressStreet"
                  label="Straße"
                  //placeholder="Straße"
                  variant="outlined"
                  sx={{ m: 1, width: "80%" }}
                  // Zuweisung der Daten für Übergabe
                  name="addressStreet"
                  value={formData.addressStreet}
                  onChange={handleChange}
                  // Input
                  slotProps={{
                    input: {},
                  }}
                />
                {/* ---------------Hausnummer--------------- */}
                <TextField
                  // Darstellung
                  id="AddressStreetNumber"
                  label="Hausnummer"
                  //placeholder="Hausnummer"
                  variant="outlined"
                  sx={{ m: 1, width: "20%" }}
                  // Zuweisung der Daten für Übergabe
                  name="addressStreetNumber"
                  value={formData.addressStreetNumber}
                  onChange={handleChange}
                  // Input
                  slotProps={{
                    input: {},
                  }}
                />
              </Stack>
              {/* ---------------Postleitzahl--------------- */}
              <Stack padding={1} direction="row" spacing={1} paddingLeft={1}>
                <TextField
                  // Darstellung
                  id="AddressPostcode"
                  label="Postleitzahl"
                  //placeholder="Postleitzahl"
                  variant="outlined"
                  sx={{ m: 1, width: "20%" }}
                  // Zuweisung der Daten für Übergabe
                  name="addressZipCode"
                  value={formData.addressZipCode}
                  onChange={handleChange}
                  // Input
                  slotProps={{
                    input: {},
                  }}
                />
                {/* ---------------Stadt--------------- */}
                <TextField
                  // Darstellung
                  id="AddressCity"
                  label="Ort"
                  //placeholder="Ort"
                  variant="outlined"
                  sx={{ m: 1, width: "80%" }}
                  // Zuweisung der Daten für Übergabe
                  name="addressCity"
                  value={formData.addressCity}
                  onChange={handleChange}
                  // Input
                  slotProps={{
                    input: {},
                  }}
                />
              </Stack>
              {/* ---------------Land--------------- */}
              <TextField
                // Darstellung
                id="AddressCountry"
                label="Land"
                //placeholder="Land"
                variant="outlined"
                sx={{ m: 1, width: "100%" }}
                // Zuweisung der Daten für Übergabe
                name="addressCountry"
                value={formData.addressCountry}
                onChange={handleChange}
                // Input
                slotProps={{
                  input: {},
                }}
              />
            </Box>
          </Stack>
        </Paper>

        {/* ----------------------------------Distanz---------------------------------- */}
        <Paper component="form">
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <Box minWidth={TitleWidth}>
              <Typography>Distanz</Typography>
            </Box>
            {/* ---------------Textfelder--------------- */}

            {/* ---------------Distanz als Strecke--------------- */}
            <Box flex={1}>
              <TextField
                // Darstellung
                id="AddressDistance"
                label="Distanz"
                variant="outlined"
                sx={{ m: 1, width: "48%" }}
                // Zuweisung der Daten für Übergabe
                name="distanceLength"
                value={formData.distanceLength}
                onChange={handleChange}
                // Input
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">km</InputAdornment>
                    ),
                  },
                }}
              />
              {/* ---------------Distanz als Zeit--------------- */}
              <TextField
                // Darstellung
                id="AddressDistanceTime"
                label="Fahrtzeit"
                variant="outlined"
                sx={{ m: 1, width: "49%" }}
                // Zuweisung der Daten für Übergabe
                name="distanceTime"
                value={formData.distanceTime}
                onChange={handleChange}
                // Input
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">Stunden</InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Stack>
        </Paper>
        {/* ----------------------------------Kontaktperson---------------------------------- */}
        <Paper component="form">
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ flexWrap: "wrap" }}
          >
            <Box minWidth={TitleWidth}>
              <Typography paddingBottom={1}>Kontaktperson</Typography>
            </Box>
            {/* ---------------Textfelder--------------- */}
            <Box flex={1}>
              <Stack
                direction="row"
                spacing={1}
                paddingLeft={1}
                paddingBottom={1}
              >
                {/* ---------------Vorname--------------- */}
                <TextField
                  // Darstellung
                  id="ContactFirstName"
                  label="Vorname"
                  variant="outlined"
                  sx={{ m: 1, width: "49%" }}
                  // Zuweisung der Daten für Übergabe
                  name="contactFirstName"
                  value={formData.contactFirstName}
                  onChange={handleChange}
                  // Input
                  slotProps={{
                    input: {},
                  }}
                />
                {/* ---------------Nachname--------------- */}
                <TextField
                  // Darstellung
                  id="ContactLastName"
                  label="Nachname"
                  variant="outlined"
                  sx={{ m: 1, width: "49%" }}
                  // Zuweisung der Daten für Übergabe
                  name="contactLastName"
                  value={formData.contactLastName}
                  onChange={handleChange}
                  // Input
                  slotProps={{
                    input: {},
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={1} paddingLeft={1} paddingTop={1}>
                {/* ---------------Emails--------------- */}
                <TextField
                  // Darstellung
                  id="ContactEmail"
                  label="Email"
                  variant="outlined"
                  sx={{ m: 1, width: "49%" }}
                  // Zuweisung der Daten für Übergabe
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  // Input
                  slotProps={{
                    input: {},
                  }}
                />
                {/* ---------------Telefonnummer--------------- */}
                <TextField
                  // Darstellung
                  id="ContactPhoneNumber"
                  label="Telefonnummer"
                  variant="outlined"
                  sx={{ m: 1, width: "49%" }}
                  // Zuweisung der Daten für Übergabe
                  name="contactPhoneNumber"
                  value={formData.contactPhoneNumber}
                  onChange={handleChange}
                  // Input
                  slotProps={{
                    input: {},
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Paper>
        {/* ----------------------------------Gehalt---------------------------------- */}
        <Paper component="form">
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ flexWrap: "wrap" }}
          >
            <Box minWidth={TitleWidth}>
              <Typography paddingBottom={1}>Gehaltsspielraum</Typography>
            </Box>
            {/* ---------------Textfelder--------------- */}
            <Box flex={1}>
              <Stack direction="row" spacing={1} paddingLeft={1}>
                {/* ---------------Minimum Gehalt--------------- */}
                <TextField
                  // Darstellung
                  id="SalaryMinimum"
                  label="Minimum"
                  variant="outlined"
                  sx={{ m: 1, width: "49%" }}
                  // Zuweisung der Daten für Übergabe
                  name="salaryMinimum"
                  value={formData.salaryMinimum}
                  onChange={handleChange}
                  // Input
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">€</InputAdornment>
                      ),
                    },
                  }}
                />
                <Typography alignContent="center">bis</Typography>
                {/* ---------------Maximum Gehalt--------------- */}
                <TextField
                  // Darstellung
                  id="SalaryMaximum"
                  label="Maximum"
                  variant="outlined"
                  sx={{ m: 1, width: "49%" }}
                  // Zuweisung der Daten für Übergabe
                  name="salaryMaximum"
                  value={formData.salaryMaximum}
                  onChange={handleChange}
                  // Input
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">€</InputAdornment>
                      ),
                    },
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Paper>
        {/* ----------------------------------Perks---------------------------------- */}
        <Paper component="form">
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ flexWrap: "wrap" }}
          >
            <Box minWidth={TitleWidth}>
              <Typography>Perks und Benefits</Typography>
            </Box>
            {/* ---------------Textfeld Perks--------------- */}
            <Box flex={1}>
              <TextField
                // Darstellung
                id="Perks"
                //label="Perks"
                placeholder="Perks"
                variant="outlined"
                multiline
                minRows={5}
                sx={{ m: 1, width: "98%" }}
                // Zuweisung der Daten für Übergabe
                name="perks"
                value={formData.perks}
                onChange={handleChange}
                // Input
                slotProps={{
                  input: {},
                }}
              />
            </Box>
          </Stack>
        </Paper>
        {/* ----------------------------------Mitarbeiteranzahl---------------------------------- */}
        <Paper component="form">
          <Stack direction={"row"} alignItems={"center"}>
            <Box minWidth={TitleWidth}>
              <Typography>Größe des Unternehmens</Typography>
            </Box>
            {/* ---------------Textfeld Mitarbeiter--------------- */}
            <Box flex={1}>
              <TextField
                // Darstellung
                id="NumberOfEmployees"
                label="Anzahl Mitarbeiter"
                variant="outlined"
                sx={{ m: 1, width: "98%" }}
                // Zuweisung der Daten für Übergabe
                name="companyEmployees"
                value={formData.companyEmployees}
                onChange={handleChange}
                // Input
                slotProps={{
                  input: {},
                }}
              />
            </Box>
          </Stack>
        </Paper>
        {/* ----------------------------------Notizen---------------------------------- */}
        <Paper component="form">
          <Stack direction={"row"} alignItems={"center"}>
            <Box minWidth={TitleWidth}>
              <Typography>Persönliche Notizen</Typography>
            </Box>
            {/* ---------------Textfeld Notizen--------------- */}
            <Box flex={1}>
              <TextField
                // Darstellung
                id="PersonalNotes"
                //label="Notizen"
                placeholder="Notizen"
                variant="outlined"
                multiline
                minRows={5}
                sx={{ m: 1, width: "98%" }}
                // Zuweisung der Daten für Übergabe
                name="personalNotes"
                value={formData.personalNotes}
                onChange={handleChange}
                // Input
                slotProps={{
                  input: {},
                }}
              />
            </Box>
          </Stack>
        </Paper>

        {/* ----------------------------------Senden Button---------------------------------- */}
        <Box
          sx={{
            "& > :not(style)": {
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            },
          }}
        >
          <ButtonGroup
            buttons={[
              {
                label: "Senden",
                icon: <Send />,
                iconPosition: "end",
                onClick: () => {
                  sendButtonClicked();
                },
              },
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default AddJobofferForm;
