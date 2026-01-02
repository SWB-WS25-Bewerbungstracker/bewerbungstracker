//import * as React from "react";
import { Drawer, Box, Typography, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";
import keycloak from "../keycloak";
import Einstellungen from "../pages/Einstellungen";

interface SettingsDrawerProps {
    open: boolean;
    onClose: () => void;
}

const settings = [
    { name: "Profil", path: "/profil" },
    { name: "Einstellungen", path: "/einstellungen" },
];


//patpat little Drawer
export default function MyLittleDrawer({ open, onClose }: SettingsDrawerProps) {
    const handleLogout = () => {
        keycloak.logout();
        window.location.href = "/login";
    };

    return (
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

                {settings.map((setting) =>
                    setting.name === "Einstellungen" ? (
                        <Button key={setting.name} fullWidth sx={{ mb: 1 }}>
                            {setting.name}
                        </Button>
                    ) : (
                        <Button
                            key={setting.name}
                            component={Link}
                            to={setting.path}
                            fullWidth
                            sx={{ mb: 1 }}
                            onClick={onClose} //Drawer schließen nur bei Profil
                        >
                            {setting.name}
                        </Button>
                    )
                )}

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
    );
}
