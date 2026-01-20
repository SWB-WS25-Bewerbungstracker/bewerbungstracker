import Button from "@mui/material/Button";
import { IconButton, Stack } from "@mui/material";
import type { ReactElement } from "react";

export interface ButtonGroupProps {
  buttons: {
    label: string;
    icon: ReactElement;
    iconPosition: string;
    onClick: (...args: unknown[]) => unknown;
  }[];
}

export default function CustomButtonGroup({
  buttons,
}: Readonly<ButtonGroupProps>) {
  return (
    <Stack direction={"row"} spacing={1}>
      {/* Flexible Anzahl an Buttons */}
      {buttons.map((b, i) =>
        // Wenn es ein Button mit Text ist
        b.label ? (
          <Button
            variant="contained"
            // Flexible Icons und Positionierung
            startIcon={b.iconPosition === "start" ? b.icon : undefined}
            endIcon={b.iconPosition === "end" ? b.icon : undefined}
            key={i}
            // Flexible Funktionen
            onClick={b.onClick}
          >
            {/* Flexible Bezeichnung*/}
            {b.label}
          </Button>
        ) : (
          // Wenn es nur ein Icon Button ist
          <IconButton
            key={i}
            onClick={b.onClick}
            // KI: Style wie die Buttons mit Text nur halt rund
            sx={{
              backgroundColor: "primary.main", // Hintergrundfarbe (gleich wie `contained` Button)
              color: "text.primary", // Textfarbe des Icons
              padding: 1, // Padding für den Button (optional)
              "&:hover": {
                // Hover-Effekte
                backgroundColor: "primary.dark", // Dunklere Hintergrundfarbe beim Hover
              },
            }}
          >
            {b.icon}
          </IconButton>
        ),
      )}
    </Stack>
  );
}
