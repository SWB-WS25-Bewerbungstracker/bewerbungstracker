import CalendarAllDates from '../components/Calendar';
import { useState } from "react";
import Rabbit from '../components/TerminList';
import { Stack } from "@mui/material";
import CustomButtonGroup from "../components/ButtonGroup";
import { Add } from "@mui/icons-material";
import { Box } from "@mui/material";

    const Termine: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ width: '100%', minHeight:"85vh", display:"flex", flexDirection:"column",}}>

            {/* ----- Leiste oben mit Button ----- */}
            <Stack
                padding={2}
                direction="row"
                alignItems="center"
                width="100%"
                justifyContent="flex-end"
                spacing={2}
                sx={{flexShrink:0,}}
                marginBottom={1}
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
            </Stack>

            {/* ----- Komponenten der Seitte ----- */}
        <Box sx={{
            display: 'flex',
            flex:"1",
            backgroundColor: '',
            minHeight:0,
            gap: "1vw",
            px:3,
            flexDirection:{xs:"column",md:"row",}
        }}>
            <Box sx={{
                px:0,
                width: { xs: "100%", md: "40%" },
                flexShrink:0,
                minHeight: 0,
                minWidth: "10rem"
            }}>
                <CalendarAllDates/>
            </Box>
            <Box sx={{
                px:0,
                minHeight:0,
                overflowY:"auto",
                display:"flex",
                flex: "1",
                maxHeight:"75vh"
            }}>
                <Rabbit open={open} handleClose={handleClose}/>
            </Box>
        </Box>
      </Box>

    );
};


export default Termine;
