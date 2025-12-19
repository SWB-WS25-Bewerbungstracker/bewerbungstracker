import CardGrid from "../components/Grid";
import CustomButtonGroup from "../components/ButtonGroup";
import { Add } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import {
  useOverviewOfAllJoboffers,
  type JobofferOverview,
} from "../functions/getAllJoboffersForOverview";
// axios: Bibliothek, um HTTP-Requests (GET, POST, PUT, DELETE …) zu machen

//-------------------------------------Seite----------------------------------------------
const Bewerbungen: React.FC = () => {
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
      <Stack
        padding={2}
        direction={"row"}
        spacing={"auto"}
        width={"100%"}
        alignItems={"center"}
      >
        <h1>Bewerbungen</h1>
        <Box>
          <CustomButtonGroup
            buttons={[
              {
                label: "Hinzufügen",
                icon: <Add />,
                iconPosition: "start",
                onClick: () => {
                  addButtonClicked();
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
  );
};

export default Bewerbungen;

//-------------------------------------Hilfsfunktionen----------------------------------------------

// Funktion, die beim Click auf den Hinzufügen Button ausgeführt wird
const addButtonClicked = () => {
  console.log("Hinzufügen-Button wurde geklickt!");
  window.open("/formular"); // Zum öffnen in einer anderen Seite
  //window.location.replace('/home'); // Zum öffnen auf dieser Seite
};
