import AddApplicationForm from "../components/AddApplication";
import { useNavigate, useParams } from "react-router-dom";
import TestButtonGroup from "../components/TestButtonGroup";
import { Stack } from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";

const FormularBewerbungHinzufuegen: React.FC = () => {
  // KI: Extrahiere die ID aus der URL
  const { id } = useParams<{ id: string }>(); // Die ID kommt als URL-Parameter

  // Navigation zwischen Seiten ermöglichen
  const navigate = useNavigate();

  return (
    <div>
      <Stack padding={2} justifyContent={"space-between"}>
        <TestButtonGroup
          buttons={[
            {
              label: "Abbrechen und zurück zu Übersicht",
              icon: <ArrowBack />,
              iconPosition: "start",
              onClick: () => {
                console.log("Zurück Button wurde geklickt");
                window.close();
                //navigate("/bewerbungen");
              },
            },
          ]}
        />
        <TestButtonGroup
          buttons={[
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
      <AddApplicationForm id={id} />
    </div>
  );
};

export default FormularBewerbungHinzufuegen;
