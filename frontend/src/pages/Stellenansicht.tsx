import { useParams, useNavigate } from "react-router-dom"; // Zum Verarbeiten der mitgegeben Parameter
import { Box, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { useCompleteJobofferInformation } from "../functions/getJobofferById";
import { parseDateToString } from "../functions/parseDate";
import CustomButtonGroup from "../components/ButtonGroup";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import applicationTrackerApi from "../services/api";
import BusinessIcon from "@mui/icons-material/Business";

const TitleMinWidth = "150px";
const TitleWidth = "25vw";

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
    JSON.stringify(jobofferCompleteInformation?.appointments, null, 2),
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

  // Funktion zum löschen der Joboffer
  async function deleteJoboffer(id: string | undefined) {
    if (id) {
      const joboffer_id = parseInt(id, 10);
      console.debug(`Joboffer Löschen für Id: ${joboffer_id}`);
      try {
        const response = await applicationTrackerApi.delete(
          `/joboffer/delete/${joboffer_id}`,
        );
        console.debug(`Status Joboffer Löschen: ${response.status}`);
        if (response.status === 200 || response.status === 204) {
          // redirect noch hinzufügen
          navigate(`/bewerbungen`);
        }
      } catch (error) {
        console.debug(
          `Beim Löschen der Joboffer ist ein Fehler aufgetreten: ${error}`,
        );
      }
    }
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
                deleteJoboffer(id);
              },
            },
          ]}
        />
      </Stack>

      {/* ----------------------------Daten anzeigen---------------------------- */}
      <Box padding={2}>
        {/* ----------------------------Unternehmenslogo---------------------------- */}

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

        {/* ----------------------------Stellenname---------------------------- */}
        <Stack direction="column" spacing={2}>
          <Paper sx={{ border: 1, borderColor: "primary.main" }}>
            <Typography variant="h5">
              {jobofferCompleteInformation.jobofferName}
            </Typography>
          </Paper>
          {/* ----------------------------Termine---------------------------- */}
          <Paper sx={{ border: 1, borderColor: "primary.main" }}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Box minWidth={TitleMinWidth} width={TitleWidth}>
                <Typography variant="h6"> Termine </Typography>
              </Box>
              {/* Termien als Liste */}
              {/* Wenn Termine vorhanden sind, dann diese anzeigen, sonst drauf hinweisen, dass noch keine vermerkt wurden */}
              {jobofferCompleteInformation.appointments &&
              jobofferCompleteInformation.appointments.length > 0 ? (
                // KI Bugfixing: map läuft auch bei leerem Array, daher Prüfen ob Array Länge > 0 hat
                <ul style={{ margin: 0, paddingLeft: 22 }}>
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
                    },
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
          <Paper sx={{ border: 1, borderColor: "primary.main" }}>
            <Stack alignItems={"baseline"}>
              <Box minWidth={TitleMinWidth} width={TitleWidth}>
                <Typography variant="h6">Beschreibung</Typography>
              </Box>
              {jobofferCompleteInformation.jobofferDescription ? (
                <Typography variant="body1">
                  {jobofferCompleteInformation.jobofferDescription}
                </Typography>
              ) : (
                <Typography> Noch keine Beschreibung angegeben </Typography>
              )}
            </Stack>
          </Paper>
          {/* ----------------------------Gehalt---------------------------- */}
          <Paper sx={{ border: 1, borderColor: "primary.main" }}>
            <Stack alignItems={"baseline"}>
              <Box minWidth={TitleMinWidth} width={TitleWidth}>
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
          <Paper sx={{ border: 1, borderColor: "primary.main" }}>
            {jobofferCompleteInformation.companyName ? (
              <Stack direction={"row"}>
                <Box minWidth={TitleMinWidth} width={TitleWidth}>
                  <Typography variant="h6">
                    {jobofferCompleteInformation.companyName}
                  </Typography>
                </Box>

                {jobofferCompleteInformation.companyEmployees ? (
                  <Stack alignItems={"baseline"}>
                    <Box minWidth={"20%"}>
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
          <Paper sx={{ border: 1, borderColor: "primary.main" }}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Box minWidth={TitleMinWidth} width={TitleWidth}>
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
          {/* ----------------------------Contact---------------------------- */}
          <Paper sx={{ border: 1, borderColor: "primary.main" }}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Box minWidth={TitleMinWidth} width={TitleWidth}>
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
          {/* ----------------------------Notizen---------------------------- */}
          <Paper sx={{ border: 1, borderColor: "primary.main" }}>
            <Stack alignItems={"baseline"}>
              <Box minWidth={TitleMinWidth} width={TitleWidth}>
                <Typography variant="h6">Notizen: </Typography>
              </Box>
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
