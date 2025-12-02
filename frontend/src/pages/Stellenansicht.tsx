import { useParams } from "react-router-dom"; // Zum Verarbeiten der mitgegeben Parameter
import { useEffect, useState } from "react";
// useState: für den internen Zustand der Komponente (Unternehmensliste)
// useEffect: führt Code nach dem Rendern aus (z. B. Daten vom Backend laden)
import axios from "axios";
import { Box, Paper, Stack, Typography } from "@mui/material";
// axios: Bibliothek, um HTTP-Requests (GET, POST, PUT, DELETE …) zu machen

//-------------------------------------Interface----------------------------------------------
// Die Interface für die Daten, die von der Axios Anfrage zurückkommen sollten
interface JobofferDetails {
  jobofferId: number;
  jobofferTitle: string;
  jobofferDescription: string;
  jobofferRating: string;
  jobofferNotes: string;
  contactId: string;
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

//-------------------------------------Seite----------------------------------------------
const Stellenansicht: React.FC = () => {
  // Extrahiere die ID aus der URL
  const { id } = useParams<{ id: string }>(); // Die ID kommt als URL-Parameter

  // useState-Hooks
  // const [variableName, setMethodName] = useState<type>(initialState); // Element, dass das enthält, wird neu geladen, wenn sich die variable ändert
  //const [jobofferDetails, setJobofferDetails] = useState<unknown>(null); // Zustand für die Antwort vom Server
  const [joboffer, setJoboffer] = useState<JobofferDetails | null>(null); // Zustand für die Antwort vom Server
  const [loading, setLoading] = useState<boolean>(true); // Zustand, der anzeigt, ob die Daten noch geladen werden
  const [error, setError] = useState<string | null>(null); // Fehlerbeschreibung

  // useEffect-Hook
  // wird ausgeführt, wenn die Komponente zum ersten Mal gerendert wird
  useEffect(() => {
    if (id) {
      // Axios GET-Anfrage an das Backend senden
      axios
        // GET an Endpunkt mit Authentifizierungs-Cookie (wichtig: erst in http://localhost:8080/ einloggen)
        .get(`http://localhost:8080/joboffer/${id}`, { withCredentials: true })
        // Verarbeiten der Antwort vom Backend
        .then((response) => {
          console.log("Antwort vom Server:", response.data); // Debugging

          // Antwortdaten verarbeiten
          const extractedJoboffer: JobofferDetails = {
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
            addressStreetNumber:
              response.data.joboffer?.company.address.streetno,
            addressCity: response.data.joboffer?.company.address.city,
            addressZipCode: response.data.joboffer?.company.address.zip,
            addressCountry: response.data.joboffer?.company.address.country,
            appointments: (response.data.joboffer?.appointments || []).map(
              (appointment: {
                id: number;
                appointmentdate: string;
                appointmentname: string;
              }) => {
                // KI Bug Fix: nicht auf appointments = undefinded gecheckt, und daher hat map nicht funktioniert
                return {
                  appointmentId: appointment.id,
                  appointmentDate: appointment.appointmentdate,
                  appointmentName: appointment.appointmentname,
                };
              }
            ),
          };

          // Zustand mit den extrahierten Daten aktualisieren
          setJoboffer(extractedJoboffer);
          console.log(extractedJoboffer);
          // Ladezustand beenden
          setLoading(false);
        })
        .catch((err) => {
          // Fehlerbehandlung
          console.error("Fehler beim Laden der Unternehmensdaten:", err);
          console.log("Error Details:", err);
          if (err.response) {
            // Fehlerantwort vom Server (z.B. 404, 500)
            setError(
              `Fehler vom Server: ${err.response.status} - ${err.response.statusText}`
            );
          } else if (err.request) {
            // Keine Antwort vom Server (z.B. Netzwerkprobleme)
            setError("Keine Antwort vom Server erhalten.");
          } else {
            // Fehler in der Anfrage selbst
            setError("Fehler bei der Anfrage.");
          }
          setLoading(false);
        });
    }
  }, [id]);
  // Falls noch Daten geladen werden, dies auf der Seite ausgeben
  if (loading) {
    return <div>Loading...</div>;
  }
  // Falls ein Fehler auftrat, den auf der Seite ausgeben
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box padding={2}>
      <Typography variant="h1">Stellenansicht</Typography>
      <Typography variant="subtitle1">
        Hier werden Informationen über die Bewerbungsstelle angezeigt.
      </Typography>
      <Stack direction="column" spacing={2}>
        <Paper>
          <Typography variant="h1">{joboffer?.jobofferTitle}</Typography>
        </Paper>
        <Paper>
          <Typography variant="h5" color="initial">
            Beschreibung
          </Typography>
          <Typography variant="body1">
            {" "}
            {joboffer?.jobofferDescription}{" "}
          </Typography>
        </Paper>
        <Paper>
          <Typography variant="h5"> Rating </Typography>
          <Typography variant="body1">{joboffer?.jobofferRating}</Typography>
        </Paper>
        <Paper>
          <Stack direction={"column"} spacing={0}>
            <Typography variant="h5">{joboffer?.companyName}</Typography>
            <Stack alignItems={"baseline"}>
              <Typography variant="body1"> Mitarbeiteranzahl: </Typography>
              <Typography variant="body1">
                {joboffer?.companyEmployees}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
        <Paper>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography variant="h5"> Adresse: </Typography>
            <Stack direction={"column"} spacing={0}>
              <Stack direction={"row"}>
                <Typography variant="body1">
                  {joboffer?.addressStreet}
                </Typography>
                <Typography variant="body1">
                  {joboffer?.addressStreetNumber}
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography variant="body1">
                  {joboffer?.addressZipCode}
                </Typography>
                <Typography variant="body1">{joboffer?.addressCity}</Typography>
                <Typography variant="body1">
                  {joboffer?.addressCountry}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Paper>
          <h2> Notizen: </h2>
          <Typography variant="body1">{joboffer?.jobofferNotes}</Typography>
        </Paper>
        {/*}
          <Paper> 
            <h2> Kontakt: </h2>
            <Typography variant='body1'>{joboffer?.jobofferContactId}</Typography>
          </Paper>
          */}
      </Stack>
    </Box>
  );
};

export default Stellenansicht;
