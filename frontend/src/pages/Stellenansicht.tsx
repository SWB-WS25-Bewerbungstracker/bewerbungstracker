import { useParams } from "react-router-dom"; // Zum Verarbeiten der mitgegeben Parameter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { useJobofferDetails } from "../functions/getJobofferById";
import { parseDateToString } from "../functions/parseDate";
import ButtonGroup from "../components/ButtonGroup.tsx";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import BusinessIcon from "@mui/icons-material/Business";

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

  console.log(JSON.stringify(jobofferDetails?.appointments, null, 2));

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
        <ButtonGroup
          buttons={[
            {
              label: "Zurück zur Übersicht",
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
        <ButtonGroup
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

      {/* ----------------------------Daten anzeigen---------------------------- */}
      <Box padding={2}>
        {/* ----------------------------Unternehmenslogo---------------------------- */}
        {/*
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          {jobofferDetails.companyLogo ? (
            <img
              src={jobofferDetails.companyLogo}
              alt="Bild des Unternehmens"
            />
          ) : (
            <SvgIcon
              component={BusinessIcon}
              sx={{ fontSize: "100px", color: "primary" }}
            />
          )}
        </Box>
        */}

        {/* ----------------------------Stellenname---------------------------- */}
        <Stack direction="column" spacing={2}>
          <Paper>
            <Typography variant="h1">{jobofferDetails.jobofferName}</Typography>
          </Paper>
          {/* ----------------------------Termine---------------------------- */}
          <Paper>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Box minWidth={TitleWidth}>
                <Typography variant="h5"> Termine </Typography>
              </Box>
              {/* Termien als Liste */}
              {/* Wenn Termine vorhanden sind, dann diese anzeigen, sonst drauf hinweisen, dass noch keine vermerkt wurden */}
              {jobofferDetails.appointments &&
              jobofferDetails.appointments.length > 0 ? (
                // KI Bugfixing: map läuft auch bei leerem Array, daher Prüfen ob Array Länge > 0 hat
                <ul>
                  {jobofferDetails.appointments.map((appointment) => {
                    return (
                      <li key={appointment.appointmentId}>
                        <Stack>
                          <Typography>{appointment.appointmentName}</Typography>
                          <Typography> {" am "}</Typography>
                          <Typography>
                            {parseDateToString(appointment.appointmentDate)}
                          </Typography>
                        </Stack>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div>
                  <Typography> keine Termine vermerkt </Typography>
                </div>
              )}
            </Stack>
          </Paper>
          {/* ----------------------------Beschreibung---------------------------- */}
          <Paper>
            <Typography variant="h5">Beschreibung</Typography>
            {jobofferDetails.jobofferDescription ? (
              <Typography variant="body1">
                {jobofferDetails.jobofferDescription}
              </Typography>
            ) : (
              <Typography> Noch keine Beschreibung angegeben </Typography>
            )}
          </Paper>
          {/* ----------------------------Rating---------------------------- */}
          <Paper>
            <Stack alignItems={"baseline"}>
              <Box minWidth={TitleWidth}>
                <Typography variant="h5"> Rating </Typography>
              </Box>
              {jobofferDetails.jobofferRating ? (
                <Typography variant="body1">
                  {jobofferDetails.jobofferRating}
                </Typography>
              ) : (
                <Typography> Noch kein Rating angegeben</Typography>
              )}
            </Stack>
          </Paper>
          {/* ----------------------------Gehalt---------------------------- */}
          <Paper>
            <Stack alignItems={"baseline"}>
              <Box minWidth={TitleWidth}>
                <Typography variant="h5"> Gehalt </Typography>
              </Box>
              {jobofferDetails.jobofferMinimumWage &&
              jobofferDetails.jobofferMaximumWage ? (
                <Typography variant="body1">
                  {jobofferDetails.jobofferMinimumWage}
                  {"€ bis "}
                  {jobofferDetails.jobofferMaximumWage}
                  {"€"}
                </Typography>
              ) : jobofferDetails.jobofferMinimumWage ||
                jobofferDetails.jobofferMaximumWage ? (
                <Typography variant="body1">
                  {jobofferDetails.jobofferMinimumWage ||
                    jobofferDetails.jobofferMaximumWage}
                  €
                </Typography>
              ) : (
                <Typography> Noch kein Gehaltsspielraum angegeben</Typography>
              )}
            </Stack>
          </Paper>
          {/* ----------------------------Unternehmen und Mitarbeiteranzahl---------------------------- */}
          <Paper>
            {jobofferDetails.companyName ? (
              <Stack direction={"row"}>
                <Box minWidth={TitleWidth}>
                  <Typography variant="h5">
                    {jobofferDetails.companyName}
                  </Typography>
                </Box>

                {jobofferDetails.companyEmployees ? (
                  <Stack alignItems={"baseline"}>
                    <Box minWidth={TitleWidth}>
                      <Typography variant="body1">
                        Mitarbeiteranzahl:
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {jobofferDetails.companyEmployees}
                    </Typography>
                  </Stack>
                ) : (
                  <Typography></Typography>
                )}
              </Stack>
            ) : (
              <Typography> Noch kein Unternehmen angegeben</Typography>
            )}
          </Paper>
          {/* ----------------------------Adresse---------------------------- */}
          <Paper>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Box minWidth={TitleWidth}>
                <Typography variant="h5"> Adresse </Typography>
              </Box>
              {jobofferDetails.addressId ? (
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
              ) : (
                <Typography> Noch keine Adresse angegeben</Typography>
              )}
            </Stack>
          </Paper>
          {/* ----------------------------Adresse---------------------------- */}
          <Paper>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Box minWidth={TitleWidth}>
                <Typography variant="h5"> Kontaktperson </Typography>
              </Box>
              {jobofferDetails.contactId ? (
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
              ) : (
                <Typography> Noch keine Kontaktperson angegeben</Typography>
              )}
            </Stack>
          </Paper>
          {/* ----------------------------Adresse---------------------------- */}
          <Paper>
            <Stack direction={"column"}>
              <Typography variant="h5">Notizen: </Typography>
              {jobofferDetails.jobofferNotes ? (
                <Typography variant="body1">
                  {jobofferDetails.jobofferNotes}
                </Typography>
              ) : (
                <Typography> Noch keine Notizen vermerkt</Typography>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </>
  );
};

export default Stellenansicht;
