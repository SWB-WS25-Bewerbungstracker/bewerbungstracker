import { Container, Stack } from "@mui/material";
import AddApplicationForm from "../components/AddApplication";

const FormularBewerbungHinzufuegen: React.FC = () => {
  return (
    <div>
      <Stack padding={2} direction={'column'}>
        <h1> Bewerbung Hinzufügen </h1>
      </Stack>
      <AddApplicationForm/>
    </div>
  );
};

export default FormularBewerbungHinzufuegen; 