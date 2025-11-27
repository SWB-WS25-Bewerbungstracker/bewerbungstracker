import { Container, Typography } from "@mui/material";
import AddApplicationForm from "../components/AddApplication";

const FormularBewerbungHinzufuegen: React.FC = () => {
  return (
    <div>
      <Container sx={{
        width: '100%',
        padding: 'auto',
      }}>
        <h1> Bewerbung Hinzufügen </h1>
      </Container>
      <AddApplicationForm/>
    </div>
  );
};

export default FormularBewerbungHinzufuegen; 