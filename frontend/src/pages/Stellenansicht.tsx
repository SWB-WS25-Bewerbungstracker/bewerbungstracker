import { useParams } from "react-router-dom"; // Zum Verarbeiten der mitgegeben Parameter
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useJobofferDetails } from "../functions/getJobofferById";
import { parseDateToString } from "../functions/parseDate";
import TestButtonGroup from "../components/TestButtonGroup";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const TitleWidth = "20%";

//-------------------------------------Seite----------------------------------------------
const Stellenansicht: React.FC = () => {
  // Extrahiere die ID aus der URL
  const { id } = useParams<{ id: string }>(); // Die ID kommt als URL-Parameter

  // Navigation zwischen Seiten ermöglichen
  const navigate = useNavigate();

  // Daten mithilfe externer Funktion laden
  const { jobofferDetails, loadingJoboffer, errorRetrievingJoboffer } =
    useJobofferDetails(id);
  // Prüfen ob überhaupt Daten empfangen wurden
  if (!jobofferDetails) {
    // sollte ein Leeres Array sein wenn keine Id mitgegeben wurde
    return <div>Keine Daten geladen...</div>;
  }
  // Falls noch Daten geladen werden, dies auf der Seite ausgeben
  if (loadingJoboffer) {
    return <div>Loading...</div>;
  }
  // Falls ein Fehler auftrat, den auf der Seite ausgeben
  if (errorRetrievingJoboffer) {
    return <div>{errorRetrievingJoboffer}</div>;
  }

  return (
    <>
      {/* Daten bearbeiten können */}
      <Stack padding={2} justifyContent={"space-between"}>
        <TestButtonGroup
          buttons={[
            {
              label: "Zurück zu Übersicht",
              icon: <ArrowBack />,
              iconPosition: "start",
              onClick: () => {
                console.log("Zurück Button wurde geklickt");
                //window.close();
                navigate("/bewerbungen");
              },
            },
          ]}
        />
        <TestButtonGroup
          buttons={[
            {
              label: "Bearbeiten",
              icon: <Edit />,
              iconPosition: "start",
              onClick: () => {
                console.log("Bearbeiten Button wurde geklickt");
                window.open(`/formular/${id}`);
              },
            },
            {
              label: "Löschen",
              icon: <Delete />,
              iconPosition: "start",
              onClick: () => {
                console.log("Löschen Button wurde geklickt");
                // Jeweiligen Behfel ans Backend Senden (Schnittstelle fehlt noch -> noch nicht implementiert);
              },
            },
          ]}
        />
      </Stack>

      {/* Daten anzeigen */}
      <Box padding={2}>
        <Stack direction="column" spacing={2}>
          <Paper>
            <Typography variant="h1">{jobofferDetails.jobofferName}</Typography>
          </Paper>
          <Paper>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Box minWidth={TitleWidth}>
                <Typography variant="h5"> Termine </Typography>
              </Box>
              {/* Termien als Liste */}
              <ul>
                {jobofferDetails.appointments.map((appointments) => {
                  return (
                    <li>
                      <Stack key={appointments.appointmentId}>
                        <Typography>{appointments.appointmentName}</Typography>
                        <Typography> {" am "}</Typography>
                        <Typography>
                          {parseDateToString(appointments.appointmentDate)}
                        </Typography>
                      </Stack>
                    </li>
                  );
                })}
              </ul>
            </Stack>
          </Paper>
          <Paper>
            <Typography variant="h5">Beschreibung</Typography>
            <Typography variant="body1">
              {" "}
              {jobofferDetails.jobofferDescription}{" "}
            </Typography>
          </Paper>
          <Paper>
            <Stack alignItems={"baseline"}>
              <Box minWidth={TitleWidth}>
                <Typography variant="h5"> Rating </Typography>
              </Box>
              <Typography variant="body1">
                {jobofferDetails.jobofferRating}
              </Typography>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction={"column"} spacing={0}>
              <Typography variant="h5">
                {jobofferDetails.companyName}
              </Typography>
              <Stack alignItems={"baseline"}>
                <Box minWidth={TitleWidth}>
                  <Typography variant="body1"> Mitarbeiteranzahl: </Typography>
                </Box>
                <Typography variant="body1">
                  {jobofferDetails.companyEmployees}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Box minWidth={TitleWidth}>
                <Typography variant="h5"> Adresse </Typography>
              </Box>
              <Stack direction={"column"} spacing={0}>
                <Stack direction={"row"}>
                  <Typography variant="body1">
                    {jobofferDetails.addressStreet}
                  </Typography>
                  <Typography variant="body1">
                    {jobofferDetails.addressStreetNumber}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography variant="body1">
                    {jobofferDetails.addressZipCode}
                  </Typography>
                  <Typography variant="body1">
                    {jobofferDetails.addressCity}
                  </Typography>
                  <Typography variant="body1">
                    {jobofferDetails.addressCountry}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Box minWidth={TitleWidth}>
                <Typography variant="h5"> Kontaktperson </Typography>
              </Box>
              <Stack direction={"column"} spacing={0}>
                <Typography variant="body1">
                  {jobofferDetails.contactFirstName +
                    " " +
                    jobofferDetails.contactLastName}
                </Typography>
                <Typography variant="body1">
                  {jobofferDetails.contactPhone}
                </Typography>
                <Typography variant="body1">
                  {jobofferDetails.contactEmail}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
          <Paper>
            <Stack direction={"column"}>
              <Typography variant="h5">Notizen: </Typography>
              <Typography variant="body1">
                {jobofferDetails.jobofferNotes}
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </>
  );
};

export default Stellenansicht;
