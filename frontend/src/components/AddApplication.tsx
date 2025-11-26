// https://mui.com/material-ui/react-text-field/
// https://mui.com/material-ui/api/text-field/
// https://mui.com/material-ui/react-autocomplete/#combo-box 
import { Autocomplete, Box, Container, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import TestButtonGroup from "./TestButtonGroup";
import axios from "axios";

/* Vllt Später für gloables Axios Setup?
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json";
 */

// Liste aller Firmen
const listeAllerFirmen = [
    'a', 
    'b',
    'c',
    'd',
    'e',
    'f',
]

export default function AddApplicationForm() {

    // Konstrukt, in dem die Daten gespeichert werden und welches nachher ans Backend gesendet wird
    const [formData, setFormData] = useState({
        jobofferName: "",
        companyName: "",
        jobofferDescription: "",
        appointmentDate: "",
        appointmentTime: "",
        addressStreet: "",
        addressStreetNumber: "",
        addressPostcode: "",
        addressCity: "",
        distanceLength: "",
        distanceTime: "",
        contactName: "",
        contactEmail: "",
        contactPhoneNumber: "",
        salaryMinimum: "",
        salaryMaximum: "",
        perks: "",
        numberOfEmployees: "",
        personalNotes: "",

    });

    // Wird bei jeder Änderung in einem TextField aufgerufen (an KI Bsp orientiert)
    const handleChange = (e: { target: { name: string; value: unknown; }; }) => {
        // Feldname und aktuellen Wert abfragen
        const { name, value } = e.target;
        // Wert neu zuweisen
        setFormData((prev) => ({
        ...prev,        // alle bisherigen Werte behalten
        [name]: value   // nur das geänderte Feld überschreiben
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
                formData,              // zu sendende Daten (automatisch als JSON) 
                {
                    headers: {
                        "Content-Type": "application/json"   
                    },
            });
            // Antwort vom Server auslesen
            console.log("Server response:", response.data);

        } catch (error) {
            // Axios-Fehlerbehandlung 
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    } 

    // Funktion, die beim Click auf den Senden Button ausgeführt wird
    const sendButtonClicked = () => {
        console.log('Senden-Button wurde geklickt!');
        handleSubmit();
    };


  return (
    <>
    <Container>
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    border: "thin solid",
                    borderRadius: "16px",
                    padding: 2,
            }}}
        >
            <div>
                <Typography>
                    Wie heißt die Stelle bei der Sie sich bewerben wollen?
                </Typography>
                <TextField
                    // Darstellung
                    id="JobofferName"
                    label="Titel der Stellenausschreibung"
                    variant="outlined"
                    sx={{ m: 1, width: '98%' }}
                    // Zuweisung der Daten für Übergabe
                    name="jobofferName"
                    value={formData.jobofferName}
                    onChange={handleChange}
                    // Input
                    slotProps={{
                        input: {},
                    }} />
            </div>
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    border: "thin solid",
                    borderRadius: "16px",
                    padding: 2,
            }}}
        >
            <div>
                <Typography>
                    Welches Unternehmen hat die Stelle ausgeschrieben?
                </Typography>
                <Autocomplete
                    // Darstellung Autocomplete
                    freeSolo // Benutzer Input ist nicht auf die vorgegebenen Möglichkeiten beschränkt
                    id="CompanyName"
                    options={listeAllerFirmen} // Vorgeschlagene Unternehmen
                    sx={{ m: 1, width: '98%' }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // Zuweisung der Daten für Übergabe
                            label="Unternehmen"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            // Input
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    type: 'search'
                                }
                            }} 
                        />
                    )} 
                />
            </div>
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    border: "thin solid",
                    borderRadius: "16px",
                    padding: 2,
            }}}
        >
            <div>
                <Typography>
                    Kurzbeschriebung der Stelle
                </Typography>
                <TextField
                    // Darstellung
                    id="JobofferDescription"
                    label="Beschreibung der Stelle"
                    variant="outlined"
                    multiline
                    minRows={5}
                    sx={{ m: 1, width: '98%' }}
                    // Zuweisung der Daten für Übergabe
                    name="jobofferDescription"
                    value={formData.jobofferDescription}
                    onChange={handleChange}
                    // Input
                    slotProps={{
                        input: {},
                    }}/>
            </div>
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    border: "thin solid",
                    borderRadius: "16px",
                    padding: 2,
            }}}
        >
            <div>
                <Typography>
                    Termine
                </Typography>
                <Stack  direction="row" 
                        spacing={1} 
                        paddingLeft={1}>
                    <TextField
                        // Darstellung
                        id="AppointmentDate"
                        label="Datum"
                        variant="outlined"
                        sx={{ m: 1, width: '49%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {},
                        }}/>
                    <TextField
                        // Darstellung
                        id="AppointmentTime"
                        label="Zeit"
                        variant="outlined"
                        sx={{ m: 1, width: '49%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {},
                        }}/>
                </Stack>
            </div>
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    border: "thin solid",
                    borderRadius: "16px",
                    padding: 2,
            }}}
        >
            <div>
                <Typography>
                    Adresse
                </Typography>
                <Stack  direction="row" 
                        spacing={1} 
                        paddingLeft={1}
                        paddingBottom={1}>
                    <TextField
                        // Darstellung
                        id="AddressStreet"
                        label="Straße"
                        variant="outlined"
                        sx={{ m: 1, width: '79%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="addressStreet"
                        value={formData.addressStreet}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {},
                        }} />
                    <TextField
                        // Darstellung
                        id="AddressStreetNumber"
                        label="Hausnummer"
                        variant="outlined"
                        sx={{ m: 1, width: '29%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="addressStreetNumber"
                        value={formData.addressStreetNumber}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {},
                        }} />
                </Stack>
                <Stack direction="row" spacing={1} paddingLeft={1}>
                    <TextField
                        // Darstellung
                        id="AddressPostcode"
                        label="Postleitzahl"
                        variant="outlined"
                        sx={{ m: 1, width: '49%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="addressPostcode"
                        value={formData.addressPostcode}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {},
                        }} />
                    <TextField
                        // Darstellung
                        id="AddressCity"
                        label="Ort"
                        variant="outlined"
                        sx={{ m: 1, width: '49%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="addressCity"
                        value={formData.addressCity}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {},
                        }} />
                </Stack>
                <Typography>
                    <br></br>
                    Distanz
                </Typography>
                <Stack direction="row" spacing={1} paddingLeft={1}>
                    <TextField
                        // Darstellung
                        id="AddressDistance"
                        label="Distanz"
                        variant="outlined"
                        sx={{ m: 1, width: '49%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="distanceLength"
                        value={formData.distanceLength}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">km</InputAdornment>
                            },
                        }} />
                    <TextField
                        // Darstellung
                        id="AddressDistanceTime"
                        label="Fahrtzeit"
                        variant="outlined"
                        sx={{ m: 1, width: '49%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="distanceTime"
                        value={formData.distanceTime}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">Stunden</InputAdornment>
                            },
                        }} />
                </Stack>
            </div>
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    display: "flex-wrap",
                    width: '100%',
                    border: "thin solid",
                    borderRadius: "16px",
                    padding: 2,
            }}}
        >
            <div>
                <Typography>
                    Kontaktperson
                </Typography>
                <TextField
                    // Darstellung
                    id="ContactName"
                    label="Name"
                    variant="outlined"
                    sx={{ m: 1, width: '98%' }}
                    // Zuweisung der Daten für Übergabe  
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    // Input
                    slotProps={{
                        input: {},
                    }} />
                <Stack  direction="row" 
                        spacing={1} 
                        paddingLeft={1}
                        paddingTop={1}>
                    <TextField
                        // Darstellung
                        id="ContactEmail"
                        label="Email"
                        variant="outlined"
                        sx={{ m: 1, width: '49%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {},
                        }} />
                    <TextField
                        // Darstellung
                        id="ContactPhoneNumber"
                        label="Telefonnummer"
                        variant="outlined"
                        sx={{ m: 1, width: '49%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="contactPhoneNumber"
                        value={formData.contactPhoneNumber}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {},
                        }} />
                </Stack>
            </div>
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    display: "flex-wrap",
                    width: '100%',
                    border: "thin solid",
                    borderRadius: "16px",
                    padding: 2,
            }}}
        >
            <div>
                <Typography>
                    Gehaltsspielraum
                </Typography>
                <Stack  direction="row" 
                        spacing={1} 
                        paddingLeft={1}
                        paddingTop={1}>
                    <TextField
                        // Darstellung
                        id="SalaryMinimum"
                        label="Minimum"
                        variant="outlined"
                        sx={{ m: 1, width: '49%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="salaryMinimum"
                        value={formData.salaryMinimum}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">€</InputAdornment>
                            },
                        }} />
                    <Typography alignContent="center">
                        bis
                    </Typography>
                    <TextField
                        // Darstellung
                        id="SalaryMaximum"
                        label="Maximum"
                        variant="outlined"
                        sx={{ m: 1, width: '49%' }}
                        // Zuweisung der Daten für Übergabe  
                        name="salaryMaximum"
                        value={formData.salaryMaximum}
                        onChange={handleChange}
                        // Input
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">€</InputAdornment>
                            },
                        }} />
                </Stack>
            </div>
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    border: "thin solid",
                    borderRadius: "16px",
                    padding: 2,
            }}}
        >
            <div>
                <Typography>
                    Perks und Benefits
                </Typography>
                <TextField
                    // Darstellung
                    id="Perks"
                    label="Perks"
                    variant="outlined"
                    multiline
                    minRows={5}
                    sx={{ m: 1, width: '98%' }}
                    // Zuweisung der Daten für Übergabe
                    name="perks"
                    value={formData.perks}
                    onChange={handleChange}
                    // Input
                    slotProps={{
                        input: {},
                    }}/>
            </div>
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    border: "thin solid",
                    borderRadius: "16px",
                    padding: 2,
            }}}
        >
            <div>
                <Typography>
                    Größe des Unternehmens
                </Typography>
                <TextField
                    // Darstellung
                    id="NumberOfEmployees"
                    label="Anzahl Mitarbeiter"
                    variant="outlined"
                    sx={{ m: 1, width: '98%' }}
                    // Zuweisung der Daten für Übergabe
                    name="numberOfEmployees"
                    value={formData.numberOfEmployees}
                    onChange={handleChange}
                    // Input
                    slotProps={{
                        input: {},
                    }}/>
            </div>
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    border: "thin solid",
                    borderRadius: "16px",
                    padding: 2,
            }}}
        >
            <div>
                <Typography>
                    Persönliche Notizen
                </Typography>
                <TextField
                    // Darstellung
                    id="PersonalNotes"
                    label="Notizen"
                    variant="outlined"
                    multiline
                    minRows={5}
                    sx={{ m: 1, width: '98%' }}
                    // Zuweisung der Daten für Übergabe
                    name="personalNotes"
                    value={formData.personalNotes}
                    onChange={handleChange}
                    // Input
                    slotProps={{
                        input: {},
                    }}/>
            </div>
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "16px",
                    padding: 2,
                    boxShadow: "none",
            }}}
        >
            {/* Senden Button */}
            <TestButtonGroup buttons={[
                    { label: "Senden", onClick: () => { sendButtonClicked(); } }
                ]} 
            />
        </Box>
    </Container>  
    </>
  );
}


