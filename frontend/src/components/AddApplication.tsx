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
import TestButtonGroup from "./TestButtonGroup";
import axios from "axios";
import { useCompanyData } from "../functions/getAllCompaniesAndId";
import { Delete, Edit, Send } from "@mui/icons-material";
import AddDateAndTime from "./AddDateAndTime";
import {
  useJobofferDetails,
  type Appointment,
} from "../functions/getJobofferById";
import { parseDateToString } from "../functions/parseDate";

const TitleWidth = "20%";

//-------------------------------------Interface----------------------------------------------
interface JobofferFormData {
  jobofferId: number | string; //!
  jobofferName: string;
  jobofferRating: number | string;
  jobofferDescription: string;
  personalNotes: string;

  companyId: number | string;
  companyName: string;
  companyEmployees: string;
  companyLogo: string; //!

  appointments: Appointment[]; // mehrere Termine können so als Array gespeichert und übergeben werden

  addressId: number | string; //!
  addressStreet: string;
  addressStreetNumber: string;
  addressZipCode: string;
  addressCity: string;
  addressCountry: string;

  distanceLength: string;
  distanceTime: string;

  contactId: number | string; //!
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhoneNumber: string;

  salaryMinimum: string;
  salaryMaximum: string;

  perks: string;
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
interface AddApplicationFormProps {
  id?: string; // Id soll optional sein
}

//-------------------------------------Komponente----------------------------------------------

const AddApplicationForm: React.FC<AddApplicationFormProps> = ({ id }) => {
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
        companyEmployees: jobofferDetails.companyEmployees.toString(),
        companyLogo: "", // Existiert noch nicht in der Datenbank

        appointments: jobofferDetails.appointments,

        addressId: jobofferDetails.addressId,
        addressStreet: jobofferDetails.addressStreet,
        addressStreetNumber: jobofferDetails.addressStreetNumber,
        addressZipCode: jobofferDetails.addressZipCode.toString(),
        addressCity: jobofferDetails.addressCity,
        addressCountry: jobofferDetails.addressCountry,

        distanceLength: "", // Existiert soweit ich weiß noch nicht in der Datenbank
        distanceTime: "", // Existiert soweit ich weiß noch nicht in der Datenbank

        contactId: jobofferDetails.contactId,
        contactFirstName: jobofferDetails.contactFirstName,
        contactLastName: jobofferDetails.contactLastName,
        contactEmail: jobofferDetails.contactEmail,
        contactPhoneNumber: jobofferDetails.contactPhone,

        salaryMinimum: "", // Wird aktuell bei getJobofferById noch nicht bereitgestellt
        salaryMaximum: "", // Wird aktuell bei getJobofferById noch nicht bereitgestellt

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

  /* ----------------------------------Termine verarbeiten---------------------------------- */

  // KI Tipp: Flags die das Bearbeiten von Terminen ermöglichen
  const [editAppointment, setAppointmentEditMode] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState<
    number | null
  >(null); // Um den Index zu speichern

  // Das kombinierte Datum aus AddDateAndTime hinzufügen, sowie AppointmentName
  const handleAppointmentSave = (appointment: Appointment, index?: number) => {
    // Termin speichern (hinzufügen bzw. ändern)
    setFormData((prevState) => {
      let updatedAppointments;

      if (appointment.appointmentId) {
        // Wenn es eine appointmentId gibt, handelt es sich um ein Update (Bearbeiten eines bestehenden Termins)
        updatedAppointments = prevState.appointments.map(
          (existingAppointment) =>
            existingAppointment.appointmentId === appointment.appointmentId
              ? appointment // Ersetze den existierenden Termin durch den bearbeiteten
              : existingAppointment // Andernfalls bleibt der Termin unverändert
        );
      } else if (index != null || index != undefined) {
        // KI: Falls der Termin noch keine Id hat, aber einen Index
        updatedAppointments = [...prevState.appointments];
        updatedAppointments[index] = appointment; // Ersetze den Termin anhand des Index
      } else {
        // Falls es sich um einen neuen Termin ohen Id oder Index handelt:
        // Kopieren der bestehenden Termine um diese zu bearbeiten
        // und hinten den neuen Termin anfügen
        updatedAppointments = [...prevState.appointments, appointment];
      }
      return {
        // der restliche Zustand bleibt unverändert
        ...prevState,
        // und nur die appointments werden aktualisier
        appointments: updatedAppointments,
      };
    });
    // Zurücksetzen der Flags zum Bearbeiten
    setAppointmentEditMode(false);
    setSelectedAppointment(null);
    setSelectedAppointmentIndex(null);
  };

  // Termin bearbeiten
  const handleAppointmentEdit = (index: number, appointment: Appointment) => {
    // KI Tip: Flags zur sicherheit nochmal richtig setzen
    setSelectedAppointment(appointment);
    setAppointmentEditMode(true);
    setSelectedAppointmentIndex(index); // Speichern des Index
    /*
    setFormData((prevState) => {
      // Kopieren der bestehenden Termine um diese zu bearbeiten
      const updatedAppointments = [...prevState.appointments];
      // zu bearbeitenden Termin ersetzen
      updatedAppointments.splice(index, 1, appointment);
      // der restliche Zustand bleibt unverändert
      // und nur die appointments werden aktualisiert
      return { ...prevState, appointments: updatedAppointments };
    });
    */
  };

  // KI: Termin löschen
  const handleDeleteAppointment = (index: number) => {
    setFormData((prevState) => {
      // Kopieren der bestehenden Termine um diese zu bearbeiten
      const updatedAppointments = [...prevState.appointments];
      // Entfernen eines Elements am angegebenen Index
      updatedAppointments.splice(index, 1);
      // der restliche Zustand bleibt unverändert
      // und nur die appointments werden aktualisiert
      return { ...prevState, appointments: updatedAppointments };
    });
  };

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
  const handleSubmit = async (id?: number) => {
    // Wenn eine Id vorhanden ist: Bearbeiten der Daten
    if (id) {
      // Debugging
      console.log("Jobofferänderung: Daten an Backend: ", formData);
      // Versuch die Daten zu Senden
      try {
        const response = await axios.post(
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
        const response = await axios.post(
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
    handleSubmit();
    window.close();
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
            <TextField
              // Darstellung
              // KI: Textfeld soll flexibel groß sein, aber Umbruch bei kleinen Bildschirmen ermöglichen
              sx={{
                //Auf kleinen Bildschirmen nimmt das Textfeld maximal 100% der Breite ein, anonsten flexibel groß
                width: { xs: "100%", sm: "auto" },
                flexGrow: 1, // Textfeld nimmt den verbleibenden Platz ein
                minWidth: 200, // verhindert, dass das Textfeld zu schmal wird
              }}
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
            {/* Während Unternehmensliste noch geladen wird: */}
            {loadingCompanies ? (
              <TextField
                // KI: Textfeld soll flexibel groß sein, aber Umbruch bei kleinen Bildschirmen ermöglichen
                sx={{
                  //Auf kleinen Bildschirmen nimmt das Textfeld maximal 100% der Breite ein, anonsten flexibel groß
                  width: { xs: "100%", sm: "auto" },
                  flexGrow: 1, // Textfeld nimmt den verbleibenden Platz ein
                  minWidth: 200, // verhindert, dass das Textfeld zu schmal wird
                }}
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
                sx={{
                  //Auf kleinen Bildschirmen nimmt das Textfeld maximal 100% der Breite ein, anonsten flexibel groß
                  width: { xs: "100%", sm: "auto" },
                  flexGrow: 1, // Textfeld nimmt den verbleibenden Platz ein
                  minWidth: 200, // verhindert, dass das Textfeld zu schmal wird
                }}
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
            <TextField
              // Darstellung
              id="JobofferDescription"
              //label="Beschreibung der Stelle"
              placeholder="Beschreibung der Stelle"
              variant="outlined"
              multiline
              minRows={5}
              sx={{
                //Auf kleinen Bildschirmen nimmt das Textfeld maximal 100% der Breite ein, anonsten flexibel groß
                width: { xs: "100%", sm: "auto" },
                flexGrow: 1, // Textfeld nimmt den verbleibenden Platz ein
                minWidth: 200, // verhindert, dass das Textfeld zu schmal wird
              }}
              // Zuweisung der Daten für Übergabe
              name="jobofferDescription"
              value={formData.jobofferDescription}
              onChange={handleChange}
              // Input
              slotProps={{
                input: {},
              }}
            />
          </Stack>
        </Paper>
        {/* ----------------------------------Termine---------------------------------- */}
        <Paper component="form">
          <Typography>Termine</Typography>
          {/* ---------------Externe Komponente zur Datumserstellung--------------- */}
          {/* Datum und Zeit durch AddDateAndTime festlegen */}
          <AddDateAndTime
            // onSave={handleAppointmentSave}
            onSave={(appointment: Appointment, index?: number) =>
              handleAppointmentSave(appointment, index)
            }
            editMode={editAppointment}
            appointmentData={selectedAppointment}
            index={selectedAppointmentIndex}
          />
          {/* ---------------Anzeige der Termine--------------- */}
          {/* KI: Anzeige des kombinierten Datums und der Zeit */}
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Hinzugefügte Termine:
          </Typography>

          {/* KI: Liste der hinzugefügten Termine */}
          {formData.appointments.length === 0 ? (
            /* Wenn noch keine Termine hinzugefügt wurden, dann daruaf hinweisen */
            <Typography variant="body2">
              Noch keine Termine hinzugefügt.
            </Typography>
          ) : (
            /* Wenn Termine vorgemerkt wurden, dann Liste der Termine anzeigen */
            <ul>
              {formData.appointments.map(
                (appointment, index /* Liste der Termine durchiterieren */) => (
                  <li key={index}>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      padding={1}
                      alignItems={"center"}
                    >
                      <Typography variant="body1">
                        {parseDateToString(
                          appointment.appointmentDate.toString()
                        ) +
                          " Terminname: " +
                          appointment.appointmentName +
                          " ID: " +
                          appointment.appointmentId}
                        {/* Termin auflisten */}
                      </Typography>
                      <TestButtonGroup
                        buttons={[
                          /* Bearbeiten Button für jeden Termin anzeigen*/
                          {
                            label: "",
                            icon: <Edit />,
                            iconPosition: "start",
                            onClick: () => {
                              // Setze den Index für den Bearbeitungsmodus und gebe die bestehenden Werte weiter
                              handleAppointmentEdit(index, appointment);
                              //setAppointmentEditMode(true);
                              //setSelectedAppointment(appointment);
                            },
                          } /* Löschen Button für jeden Termin anzeigen*/,
                          {
                            label: "",
                            icon: <Delete />,
                            iconPosition: "start",
                            onClick: () => {
                              handleDeleteAppointment(index);
                            },
                          },
                        ]}
                      />
                    </Stack>
                  </li>
                )
              )}
            </ul>
          )}
        </Paper>
        {/* ----------------------------------Adresse---------------------------------- */}
        <Paper component="form">
          <Typography paddingBottom={1}>Adresse</Typography>
          {/* ---------------Textfelder--------------- */}
          <Stack direction="row" spacing={1} paddingLeft={1} paddingBottom={1}>
            {/* ---------------Straße--------------- */}
            <TextField
              // Darstellung
              id="AddressStreet"
              label="Straße"
              //placeholder="Straße"
              variant="outlined"
              sx={{ m: 1, width: "79%" }}
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
              sx={{ m: 1, width: "29%" }}
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
              sx={{ m: 1, width: "29%" }}
              // Zuweisung der Daten für Übergabe
              name="addressPostcode"
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
              sx={{ m: 1, width: "79%" }}
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
            sx={{ m: 1, width: "98%" }}
            // Zuweisung der Daten für Übergabe
            name="addressCountry"
            value={formData.addressCountry}
            onChange={handleChange}
            // Input
            slotProps={{
              input: {},
            }}
          />
        </Paper>

        {/* ----------------------------------Distanz---------------------------------- */}
        <Paper component="form">
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <Box minWidth={TitleWidth}>
              <Typography>Distanz</Typography>
            </Box>
            {/* ---------------Textfelder--------------- */}

            {/* ---------------Distanz als Strecke--------------- */}
            <TextField
              // Darstellung
              id="AddressDistance"
              label="Distanz"
              variant="outlined"
              sx={{ m: 1, width: "49%" }}
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
          </Stack>
        </Paper>
        {/* ----------------------------------Kontaktperson---------------------------------- */}
        <Paper component="form">
          <Typography paddingBottom={1}>Kontaktperson</Typography>
          {/* ---------------Textfelder--------------- */}
          <Stack direction="row" spacing={1} paddingLeft={1} paddingBottom={1}>
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
        </Paper>
        {/* ----------------------------------Gehalt---------------------------------- */}
        <Paper component="form">
          <Typography paddingBottom={1}>Gehaltsspielraum</Typography>
          {/* ---------------Textfelder--------------- */}
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
        </Paper>
        {/* ----------------------------------Perks---------------------------------- */}
        <Paper component="form">
          <Typography>Perks und Benefits</Typography>
          {/* ---------------Textfeld Perks--------------- */}
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
        </Paper>
        {/* ----------------------------------Mitarbeiteranzahl---------------------------------- */}
        <Paper component="form">
          <Stack direction={"row"} alignItems={"center"}>
            <Box minWidth={TitleWidth}>
              <Typography>Größe des Unternehmens</Typography>
            </Box>
            {/* ---------------Textfeld Mitarbeiter--------------- */}
            <TextField
              // Darstellung
              id="NumberOfEmployees"
              label="Anzahl Mitarbeiter"
              variant="outlined"
              sx={{ m: 1, width: "98%" }}
              // Zuweisung der Daten für Übergabe
              name="numberOfEmployees"
              value={formData.companyEmployees}
              onChange={handleChange}
              // Input
              slotProps={{
                input: {},
              }}
            />
          </Stack>
        </Paper>
        {/* ----------------------------------Notizen---------------------------------- */}
        <Paper component="form">
          <Typography>Persönliche Notizen</Typography>
          {/* ---------------Textfeld Notizen--------------- */}
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
          <TestButtonGroup
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

export default AddApplicationForm;
