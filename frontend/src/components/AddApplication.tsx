// https://mui.com/material-ui/react-text-field/
// https://mui.com/material-ui/api/text-field/
// https://mui.com/material-ui/react-autocomplete/#combo-box
import {
  Autocomplete,
  Box,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import TestButtonGroup from "./TestButtonGroup";
import axios from "axios";
import { useCompanyData } from "../functions/getAllCompaniesAndId";
import { Delete, Send } from "@mui/icons-material";
import AddDateAndTime from "./AddDateAndTime";

export default function AddApplicationForm(id?: number) {
  if (id) {
    //...
  }
  // Verwendung des Custom Hooks, um die Firmen- und Ladezustandsdaten zu holen
  const { listOfCompanies, loading } = useCompanyData();

  // Konstrukt, in dem die Daten gespeichert werden und welches nachher ans Backend gesendet wird
  const [formData, setFormData] = useState({
    // Default Werte
    jobofferName: "",
    companyId: "",
    companyName: "",
    jobofferDescription: "",
    appointmentDate: [] as string[], // Typ deklaration (mehrere Termine können so als Array gespeichert und übergeben werden)
    appointmentTime: "",
    addressStreet: "",
    addressStreetNumber: "",
    addressPostcode: "",
    addressCity: "",
    addressCountry: "",
    distanceLength: "",
    distanceTime: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhoneNumber: "",
    salaryMinimum: "",
    salaryMaximum: "",
    perks: "",
    numberOfEmployees: "",
    personalNotes: "",
  });

  // KI Callback, um das kombinierte Datum aus AddDateAndTime zu empfangen
  const handleDateTimeSave = (combinedDate: string) => {
    setFormData((prevState) => ({
      ...prevState, // Behalte die alten Daten bei
      // appointmentDate: combinedDate, // Aktualisiere nur appointmentDate
      appointmentDate: [...prevState.appointmentDate, combinedDate], // die vorherigen Termine behalten und hinten den nächsten Termin anhängen
    }));
  };

  // KI: Termin löschen
  const handleDeleteAppointment = (index: number) => {
    setFormData((prevState) => {
      const updatedAppointments = [...prevState.appointmentDate]; // Termine abrufen
      updatedAppointments.splice(index, 1); // Termin an dem jeweiligen Index aus der Liste entfernen
      return { ...prevState, appointmentDate: updatedAppointments }; // restliche Termine übergeben
    });
  };

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

  // Wird beim Absenden der Daten ans Backend ausgeführt (an KI Bsp orientiert)
  const handleSubmit = async () => {
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
  };

  // Funktion, die beim Click auf den Senden Button ausgeführt wird
  const sendButtonClicked = () => {
    console.log("Senden-Button wurde geklickt!");
    handleSubmit();
  };

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
        <Paper component="form">
          <div>
            <Stack direction={"row"}>
              <Typography>
                Wie heißt die Stelle bei der Sie sich bewerben wollen?
              </Typography>
              <TextField
                // Darstellung
                id="JobofferName"
                //label="Titel der Stellenausschreibung"
                placeholder="Titel der Stellenausschreibung"
                variant="outlined"
                sx={{ m: 1, width: "98%" }}
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
          </div>
        </Paper>
        <Paper component="form">
          <div>
            <Typography>
              Welches Unternehmen hat die Stelle ausgeschrieben?
            </Typography>
            {loading ? (
              <TextField
                sx={{ m: 1, width: "98%" }}
                label="Lade Firmen..."
                variant="outlined"
                disabled
              />
            ) : (
              <Autocomplete
                // Darstellung Autocomplete
                freeSolo // Benutzer kann eigene Eingaben machen
                id="CompanyName"
                // KI Fehlerverbesserung --------
                // Dropdown Auswahl (Liste an Unternehmen)
                options={listOfCompanies.map((company) => company.name)} // Nur die Namen der Unternehmen anzeigen
                //getOptionLabel={(option) => option} // Einfach nur den Namen anzeigen
                //value={formData.companyName || ""} // Wenn es einen Wert gibt, zeige ihn an, sonst leer
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
                // Ende KI Fehlerverbesserung -------
                sx={{ m: 1, width: "98%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // Zuweisung der Daten für Übergabe (falls Text eingegeben wurde und nicht mit Autocomplete ausgefüllt)
                    //label="Unternehmen"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Unternehmen"
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
          </div>
        </Paper>
        <Paper component="form">
          <div>
            <Typography>Kurzbeschriebung der Stelle</Typography>
            <TextField
              // Darstellung
              id="JobofferDescription"
              //label="Beschreibung der Stelle"
              placeholder="Beschreibung der Stelle"
              variant="outlined"
              multiline
              minRows={5}
              sx={{ m: 1, width: "98%" }}
              // Zuweisung der Daten für Übergabe
              name="jobofferDescription"
              value={formData.jobofferDescription}
              onChange={handleChange}
              // Input
              slotProps={{
                input: {},
              }}
            />
          </div>
        </Paper>
        <Paper component="form">
          <div>
            <Typography>Termine</Typography>
            {/* Datum und Zeit durch AddDateAndTime festlegen */}
            <AddDateAndTime onSave={handleDateTimeSave} />

            {/* KI: Anzeige des kombinierten Datums und der Zeit */}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Hinzugefügte Termine:
            </Typography>

            {/* KI: Liste der hinzugefügten Termine */}
            {formData.appointmentDate.length === 0 ? (
              /* Wenn noch keine Termine hinzugefügt wurden, dann daruaf hinweisen */
              <Typography variant="body2">
                Noch keine Termine hinzugefügt.
              </Typography>
            ) : (
              /* Wenn Termine vorgemerkt wurden, dann Liste der Termine anzeigen */
              <ul>
                {formData.appointmentDate.map(
                  (
                    appointment,
                    index /* Liste der Termine durchiterieren */
                  ) => (
                    <li key={index}>
                      <Stack
                        direction={"row"}
                        spacing={2}
                        padding={1}
                        alignItems={"center"}
                      >
                        <Typography variant="body1">
                          {new Date(appointment).toString()}{" "}
                          {/* Termin auflisten */}
                        </Typography>
                        <TestButtonGroup
                          buttons={[
                            /* Löschen Button für jeden Termin anzeigen*/
                            {
                              label: "Entfernen",
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
          </div>
        </Paper>
        <Paper component="form">
          <div>
            <Typography paddingBottom={1}>Adresse</Typography>
            <Stack
              direction="row"
              spacing={1}
              paddingLeft={1}
              paddingBottom={1}
            >
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
                value={formData.addressPostcode}
                onChange={handleChange}
                // Input
                slotProps={{
                  input: {},
                }}
              />
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
            <Typography paddingBottom={1}>
              <br></br>
              Distanz
            </Typography>
            <Stack direction="row" spacing={1} paddingLeft={1}>
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
          </div>
        </Paper>
        <Paper component="form">
          <div>
            <Typography paddingBottom={1}>Kontaktperson</Typography>
            <Stack
              direction="row"
              spacing={1}
              paddingLeft={1}
              paddingBottom={1}
            >
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
          </div>
        </Paper>
        <Paper component="form">
          <div>
            <Typography paddingBottom={1}>Gehaltsspielraum</Typography>
            <Stack direction="row" spacing={1} paddingLeft={1}>
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
          </div>
        </Paper>
        <Paper component="form">
          <div>
            <Typography>Perks und Benefits</Typography>
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
          </div>
        </Paper>
        <Paper component="form">
          <div>
            <Typography>Größe des Unternehmens</Typography>
            <TextField
              // Darstellung
              id="NumberOfEmployees"
              //label="Anzahl Mitarbeiter"
              placeholder="Anzahl Mitarbeiter"
              variant="outlined"
              sx={{ m: 1, width: "98%" }}
              // Zuweisung der Daten für Übergabe
              name="numberOfEmployees"
              value={formData.numberOfEmployees}
              onChange={handleChange}
              // Input
              slotProps={{
                input: {},
              }}
            />
          </div>
        </Paper>
        <Paper component="form">
          <div>
            <Typography>Persönliche Notizen</Typography>
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
          </div>
        </Paper>
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
          {/* Senden Button */}
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
}
