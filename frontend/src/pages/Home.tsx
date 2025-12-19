import { Box, Paper, Stack, Typography } from "@mui/material";
import CardGrid from "../components/Grid";
import CustomButtonGroup from "../components/ButtonGroup";
import { Add } from "@mui/icons-material";
import {
  useOverviewOfAllJoboffers,
  type JobofferOverview,
} from "../functions/getAllJoboffersForOverview";
import Rabbit from "../components/TerminList"; //die TerminListe

const Home: React.FC = () => {
  const { listOfJoboffers, loading, error } = useOverviewOfAllJoboffers();

  // Umwandeln auf Typ den ActionAreaCard erwartet
  const listOfJoboffersForCard = (listOfJoboffers as JobofferOverview[]).map(
    (joboffer) => ({
      id: joboffer.jobofferId,
      title: joboffer.jobofferName,
      description1: joboffer.companyName || "Kein Unternehmen angegeben", // Standardwert falls null, undefined order leerer String
      description2: joboffer.nextAppointment || "Es steht kein Termin an.", // Standardwert falls null, undefined order leerer String
      image: joboffer.companyImage || "", // Standardwert falls null, undefined order leerer String
    })
  );

  return (
    <div>
      <Box padding={2}>
        <Typography variant="h4">Startseite</Typography>
        <Typography>
          Hier findest du alle deiner Stellenausschreibungen und Termine auf
          einen Blick
        </Typography>
      </Box>
      <Box padding={2}>
        <Typography variant="h6" paddingBottom={2}>
          Übersicht aller Termine
        </Typography>
        <Paper
          style={{
            width: "100%",
          }}
        >
          <Rabbit />
        </Paper>
      </Box>
      <div>
        <Stack
          paddingTop={2}
          paddingInline={2}
          direction={"row"}
          spacing={"auto"}
          width={"100%"}
          alignItems={"baseline"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6">
            Übersicht aller Stellenausschreibungen
          </Typography>
          <Box>
            <CustomButtonGroup
              buttons={[
                {
                  label: "Hinzufügen",
                  icon: <Add />,
                  iconPosition: "start",
                  onClick: () => {
                    addJobofferButtonClicked();
                  },
                },
              ]}
            />
          </Box>
        </Stack>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <CardGrid data={listOfJoboffersForCard} />
        )}
      </div>
    </div>
  );
};

export default Home;

//-------------------------------------Hilfsfunktionen----------------------------------------------

// Funktion, die beim Click auf den Hinzufügen Button ausgeführt wird
const addJobofferButtonClicked = () => {
  console.log("Joboffer-Hinzufügen-Button wurde geklickt!");
  window.open("/formular"); // Zum öffnen in einer anderen Seite
  //window.location.replace('/home'); // Zum öffnen auf dieser Seite
};
