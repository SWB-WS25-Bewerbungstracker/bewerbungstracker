import { useParams } from "react-router-dom"; // Zum Verarbeiten der mitgegeben Parameter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { useCompleteJobofferInformation } from "../functions/getJobofferById";
import { parseDateToString } from "../functions/parseDate";
import CustomButtonGroup from "../components/ButtonGroup";
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
  const {
    jobofferCompleteInformation,
    loadingStateJoboffer,
    errorRetrievingJoboffer,
  } = useCompleteJobofferInformation(id);

  console.debug(
    JSON.stringify(jobofferCompleteInformation?.appointments, null, 2)
  );

  // Prüfen ob überhaupt Daten empfangen wurden
  if (!jobofferCompleteInformation) {
    // sollte ein Leeres Array sein wenn keine Id mitgegeben wurde
    return <div>Keine Daten geladen...</div>;
  }
  // Falls noch Daten geladen werden, dies auf der Seite ausgeben
  if (loadingStateJoboffer) {
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
        <CustomButtonGroup
          buttons={[
            {
              label: "Zurück zur Übersicht",
              icon: <ArrowBack />,
              iconPosition: "start",
              onClick: () => {
                console.debug("Zurück Button wurde geklickt");
                //window.close();
                navigate("/bewerbungen");
              },
            },
          ]}
        />
        <CustomButtonGroup
          buttons={[
            {
              label: "Bearbeiten",
              icon: <Edit />,
              iconPosition: "start",
              onClick: () => {
                console.debug("Bearbeiten Button wurde geklickt");
                window.open(`/formular/${id}`);
              },
            },
            {
              label: "Löschen",
              icon: <Delete />,
              iconPosition: "start",
              onClick: () => {
                console.debug("Löschen Button wurde geklickt");
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
          {jobofferCompleteInformation.companyLogo ? (
            <img
              src={jobofferCompleteInformation.companyLogo}
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
            <Typography variant="h5">
              {jobofferCompleteInformation.jobofferName}
            </Typography>
          </Paper>
          {/* ----------------------------Termine---------------------------- */}
          <Paper>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Box minWidth={TitleWidth}>
                <Typography variant="h6"> Termine </Typography>
              </Box>
              {/* Termien als Liste */}
              {/* Wenn Termine vorhanden sind, dann diese anzeigen, sonst drauf hinweisen, dass noch keine vermerkt wurden */}
              {jobofferCompleteInformation.appointments &&
              jobofferCompleteInformation.appointments.length > 0 ? (
                // KI Bugfixing: map läuft auch bei leerem Array, daher Prüfen ob Array Länge > 0 hat
                <ul>
                  {jobofferCompleteInformation.appointments.map(
                    (appointment) => {
                      return (
                        <li key={appointment.appointmentId}>
                          <Stack>
                            <Typography>
                              {appointment.appointmentName}
                            </Typography>
                            <Typography> {" am "}</Typography>
                            <Typography>
                              {parseDateToString(appointment.appointmentDate)}
                            </Typography>
                          </Stack>
                        </li>
                      );
                    }
                  )}
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
            <Typography variant="h6">Beschreibung</Typography>
            {jobofferCompleteInformation.jobofferDescription ? (
              <Typography variant="body1">
                {jobofferCompleteInformation.jobofferDescription}
              </Typography>
            ) : (
              <Typography> Noch keine Beschreibung angegeben </Typography>
            )}
          </Paper>
          {/* ----------------------------Rating---------------------------- */}
          <Paper>
            <Stack alignItems={"baseline"}>
              <Box minWidth={TitleWidth}>
                <Typography variant="h6"> Rating </Typography>
              </Box>
              {jobofferCompleteInformation.jobofferRating ? (
                <Typography variant="body1">
                  {jobofferCompleteInformation.jobofferRating}
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
                <Typography variant="h6"> Gehalt </Typography>
              </Box>
              {jobofferCompleteInformation.jobofferMinimumWage &&
              jobofferCompleteInformation.jobofferMaximumWage ? (
                <Typography variant="body1">
                  {jobofferCompleteInformation.jobofferMinimumWage}
                  {"€ bis "}
                  {jobofferCompleteInformation.jobofferMaximumWage}
                  {"€"}
                </Typography>
              ) : jobofferCompleteInformation.jobofferMinimumWage ||
                jobofferCompleteInformation.jobofferMaximumWage ? (
                <Typography variant="body1">
                  {jobofferCompleteInformation.jobofferMinimumWage ||
                    jobofferCompleteInformation.jobofferMaximumWage}
                  €
                </Typography>
              ) : (
                <Typography> Noch kein Gehaltsspielraum angegeben</Typography>
              )}
            </Stack>
          </Paper>
          {/* ----------------------------Unternehmen und Mitarbeiteranzahl---------------------------- */}
          <Paper>
            {jobofferCompleteInformation.companyName ? (
              <Stack direction={"row"}>
                <Box minWidth={TitleWidth}>
                  <Typography variant="h6">
                    {jobofferCompleteInformation.companyName}
                  </Typography>
                </Box>

                {jobofferCompleteInformation.companyEmployees ? (
                  <Stack alignItems={"baseline"}>
                    <Box minWidth={TitleWidth}>
                      <Typography variant="body1">
                        Mitarbeiteranzahl:
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {jobofferCompleteInformation.companyEmployees}
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
                <Typography variant="h6"> Adresse </Typography>
              </Box>
              {jobofferCompleteInformation.addressId ? (
                <Stack direction={"column"} spacing={0}>
                  <Stack direction={"row"}>
                    <Typography variant="body1">
                      {jobofferCompleteInformation.addressStreet}
                    </Typography>
                    <Typography variant="body1">
                      {jobofferCompleteInformation.addressStreetNumber}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"}>
                    <Typography variant="body1">
                      {jobofferCompleteInformation.addressZipCode}
                    </Typography>
                    <Typography variant="body1">
                      {jobofferCompleteInformation.addressCity}
                    </Typography>
                    <Typography variant="body1">
                      {jobofferCompleteInformation.addressCountry}
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
                <Typography variant="h6"> Kontaktperson </Typography>
              </Box>
              {jobofferCompleteInformation.contactId ? (
                <Stack direction={"column"} spacing={0}>
                  <Typography variant="body1">
                    {jobofferCompleteInformation.contactFirstName +
                      " " +
                      jobofferCompleteInformation.contactLastName}
                  </Typography>
                  <Typography variant="body1">
                    {jobofferCompleteInformation.contactPhone}
                  </Typography>
                  <Typography variant="body1">
                    {jobofferCompleteInformation.contactEmail}
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
              <Typography variant="h6">Notizen: </Typography>
              {jobofferCompleteInformation.jobofferNotes ? (
                <Typography variant="body1">
                  {jobofferCompleteInformation.jobofferNotes}
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
