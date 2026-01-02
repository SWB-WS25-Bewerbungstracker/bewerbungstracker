import AddJobofferForm from "../components/AddJoboffer";
import { useParams } from "react-router-dom";
import ButtonGroup from "../components/ButtonGroup.tsx";
import { Stack } from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";
import SomeForm from "../feature/SomeForm.tsx";

const FormularBewerbungHinzufuegen: React.FC = () => {
  // KI: Extrahiere die ID aus der URL
  const { id } = useParams<{ id: string }>(); // Die ID kommt als URL-Parameter

  // Navigation zwischen Seiten ermöglichen
  // const navigate = useNavigate();

  return (
    <div>
      <Stack padding={2} justifyContent={"space-between"}>
        <ButtonGroup
          buttons={[
            {
              label: "Abbrechen und zurück zur Übersicht",
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
        <ButtonGroup
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
      {/*Altes Formular: <AddJobofferForm id={id} /> */}
      <SomeForm id={id}/>
    </div>
  );
};

export default FormularBewerbungHinzufuegen;
