import { Box, Stack } from "@mui/material";
import CardGrid from "../components/Grid";
import CustomButtonGroup from "../components/ButtonGroup";
import { Add } from "@mui/icons-material";
import {
  useOverviewOfAllJoboffers,
  type JobofferOverview,
} from "../functions/getAllJoboffersForOverview";
import Rabbit from "../components/TerminList";
import { useState } from "react"; //die TerminListe

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
    }),
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: 2,
          marginBottom: 2,
          paddingTop: 2,
          spacing: 2,
        }}
      >
        <CustomButtonGroup
          buttons={[
            {
              label: "Hinzufügen",
              icon: <Add />,
              iconPosition: "start",
              onClick: handleOpen,
            },
          ]}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          px: 3,
          marginTop: 3,
        }}
      >
        <Rabbit open={open} handleClose={handleClose} height="32vh" />
      </Box>

      <div>
        <Stack
          paddingTop={2}
          paddingInline={2}
          direction={"row"}
          spacing={"auto"}
          width={"100%"}
          alignItems={"baseline"}
          justifyContent={"flex-end"}
        >
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
  console.debug("Joboffer-Hinzufügen-Button wurde geklickt!");
  window.open("/formular"); // Zum öffnen in einer anderen Seite
  //window.location.replace('/home'); // Zum öffnen auf dieser Seite
};
