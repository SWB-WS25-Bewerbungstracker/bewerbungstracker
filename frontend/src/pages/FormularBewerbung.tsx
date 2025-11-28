import { Container } from "@mui/material";
import AddApplicationForm from "../components/AddApplication";

const FormularBewerbungHinzufuegen: React.FC = () => {
  return (
    <div>
      { /*<AddDateAndTime/> */}
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