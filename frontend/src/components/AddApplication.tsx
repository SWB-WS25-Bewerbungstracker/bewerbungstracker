// https://mui.com/material-ui/react-text-field/
// https://mui.com/material-ui/api/text-field/
import { Autocomplete, Box, Container, InputAdornment, TextField, Typography } from "@mui/material";
const listeAllerFirmen = [
    'a', 
    'b',
    'c',
    'd',
    'e',
    'f',
]

export default function AddApplicationForm() {
  return (
    <Container>
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
            noValidate
            autoComplete="off"
            width={'100%'}
        >
            <div>
                <Typography variant="h6">
                    Wie heißt die Stelle bei der sie sich bewerben wollen?
                </Typography>
               <TextField
                    id="outlined-basic"
                    label="Titel der Stellenausschreibung"
                    variant="outlined"
                    sx={{ m: 1, width: '100%' }}
                    slotProps={{
                        input: {},
                    }}
                /> 
            </div>
            <div>
                <Typography variant="h6">
                    Welches Unternehmen hat die Stelle ausgeschrieben?
                </Typography>
                <Autocomplete
                    disablePortal
                    options={listeAllerFirmen}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Unternehmen" />}
                />
                <TextField
                    id="outlined-basic"
                    label="Unternehmen"
                    variant="outlined"
                    sx={{ m: 1, width: '100%' }}
                    slotProps={{
                        input: {},
                    }}
                /> 
            </div>
            
        </Box>
    </Container>
  );
}