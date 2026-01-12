import {
    Box,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    FormControl,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";


export default function SettingsPage() {
    const { mode, setMode } = useColorScheme();
    return (
        <Box
            sx={{ p: 3,
                maxWidth: 400,
                display:"flex",
                alignItems: 'center',
            }}

        >
            <FormControl>
                <FormLabel id="theme-toggle">Theme</FormLabel>

                <RadioGroup
                    row
                    value={mode}
                    onChange={(event) =>
                        setMode(event.target.value as 'system' | 'light' | 'dark')}
                >
                    <FormControlLabel value="system" control={<Radio />} label="System" />
                    <FormControlLabel value="light" control={<Radio />} label="Hell" />
                    <FormControlLabel value="dark" control={<Radio />} label="Dunkel" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}