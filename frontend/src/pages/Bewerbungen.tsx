import CardGrid from "../components/Grid";
import TestButtonGroup from "../components/TestButtonGroup";
import { Delete, Add } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { useJobofferData } from "../functions/getAllJoboffersForOverview";
// axios: Bibliothek, um HTTP-Requests (GET, POST, PUT, DELETE …) zu machen

//-------------------------------------Seite----------------------------------------------
const Bewerbungen: React.FC = () => {
  const { listOfJoboffers, loading, error } = useJobofferData();

  // Umwandeln auf Typ den ActionAreaCard erwartet
  const listOfJoboffersForCard = listOfJoboffers.map((joboffer) => ({
    id: joboffer.jobofferId,
    title: joboffer.jobofferName,
    description1: joboffer.companyName || "Kein Unternehmen angegeben", // Standardwert falls null, undefined order leerer String
    description2: joboffer.nextAppointment || "Es steht kein Termin an.", // Standardwert falls null, undefined order leerer String
    image: joboffer.companyImage || "", // Standardwert falls null, undefined order leerer String
  }));

  // Falls noch Daten geladen werden, dies auf der Seite ausgeben
  if (loading) {
    return <div>Loading...</div>;
  }
  // Falls ein Fehler auftrat, den auf der Seite ausgeben
  if (error) {
    return <div>{error}</div>;
  }

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
          <TestButtonGroup
            buttons={[
              {
                label: "Löschen",
                icon: <Delete />,
                iconPosition: "start",
                onClick: () => {
                  deleteButtonClicked();
                },
              },
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
      <CardGrid data={listOfJoboffersForCard} />
    </div>
  );
};

export default Bewerbungen;

//-------------------------------------Hilfsfunktionen----------------------------------------------
// Funktion, die beim Click auf den Löschen Button ausgeführt wird
const deleteButtonClicked = () => {
  console.log("Löschen-Button wurde geklickt!");
};

// Funktion, die beim Click auf den Hinzufügen Button ausgeführt wird
const addButtonClicked = () => {
  console.log("Hinzufügen-Button wurde geklickt!");
  window.open("/formular"); // Zum öffnen in einer anderen Seite
  //window.location.replace('/home'); // Zum öffnen auf dieser Seite
};
