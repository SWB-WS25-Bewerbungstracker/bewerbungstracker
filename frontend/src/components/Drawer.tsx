import { useState } from "react";
import { Drawer, Box, Typography, Divider, Button, Dialog, DialogContent } from "@mui/material";
import keycloak from "../keycloak";
import Profil from "../pages/Profil";
import Einstellungen from "../pages/Einstellungen";

interface SettingsDrawerProps {
    open: boolean;
    onClose: () => void;
}

const settings = [
    { name: "Mein Profil", dialog: "profil" },
    { name: "Einstellungen", dialog: "einstellungen" },
];

//patpat little Drawer
export default function MyLittleDrawer({ open, onClose }: SettingsDrawerProps) {

    //logout weitestgehend übernommen aus alter Datei.. sollte aber auf unser Login gehen nicht auf KC
    const handleLogout = () => {
        keycloak.logout();
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [visibleDialog, setVisibleDialog] = useState<"profil" | "einstellungen" | null>(null);

    const chooseDialogContent = () => {
        switch (visibleDialog) {
            case "profil":
                return <Profil />;
            case "einstellungen":
                return <Einstellungen />;
        }
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        width: "auto",
                        minWidth: 200,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "flex-start",
                        p: 2,
                    },
                }}
            >
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Einstellungen
                    </Typography>
                    <Divider sx={{ my: 1 }} />

                    {settings.map((setting) => (
                        <Button
                            key={setting.name}
                            fullWidth
                            sx={{ mb: 1 }}
                            onClick={() => {
                                setVisibleDialog(setting.dialog as "profil" | "einstellungen");
                                setOpenDialog(true);
                                onClose();
                            }} //vielleicht noch ne Abfrage einbauen oder so
                        >
                            {setting.name}
                        </Button>
                    ))}

                    <Divider sx={{ my: 1 }} />

                    <Button
                        onClick={handleLogout}
                        fullWidth
                        color="error"
                        sx={{ mt: 1 }}
                    >
                        Logout
                    </Button>
                </Box>
            </Drawer>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullWidth
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        minHeight: "70vh",
                        maxHeight: "90vh",
                    },
                }}
            >
                <DialogContent>
                    {chooseDialogContent()}
                </DialogContent>
            </Dialog>
        </>
    );
}
