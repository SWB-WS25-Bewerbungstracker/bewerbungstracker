import { useParams } from "react-router-dom";
import CustomButtonGroup from "../components/ButtonGroup";
import { Stack } from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";
import JobofferForm from "../feature/JobofferForm.tsx";

const FormularBewerbungHinzufuegen: React.FC = () => {
  // KI: Extrahiere die ID aus der URL
  const { id } = useParams<{ id: string }>(); // Die ID kommt als URL-Parameter

  // Navigation zwischen Seiten ermöglichen
  // const navigate = useNavigate();

  return (
    <div>
      <Stack padding={2} alignContent={"start"}>
        <CustomButtonGroup
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
      </Stack>
      {/*Altes Formular: <AddJobofferForm id={id} /> */}
      <JobofferForm id={id} />
    </div>
  );
};

export default FormularBewerbungHinzufuegen;
