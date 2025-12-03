import { Container, Stack } from "@mui/material";
import AddApplicationForm from "../components/AddApplication";
import { useParams } from "react-router-dom";

const FormularBewerbungHinzufuegen: React.FC = () => {
  // KI: Extrahiere die ID aus der URL
  const { id } = useParams<{ id: string }>(); // Die ID kommt als URL-Parameter
  return (
    <div>
      <Stack padding={2} direction={"column"}>
        <h1> Bewerbung Hinzufügen </h1>
      </Stack>
      <AddApplicationForm id={id} />
    </div>
  );
};

export default FormularBewerbungHinzufuegen;
