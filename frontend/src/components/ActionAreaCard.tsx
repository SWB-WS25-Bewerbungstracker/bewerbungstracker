// https://mui.com/material-ui/react-card/
// https://mui.com/material-ui/api/card-action-area/
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import { SvgIcon } from "@mui/material";

const imageHeight = "140px";

// Werte, die die Card erwartet/haben kann
export interface ActionAreaCardProps {
  id: string | number; // Id der Karte
  title: string; // Titel der Karte
  description1?: string; // Beschreibung 1 (z.B. Firma)
  description2?: string; // Beschreibung 2 (z.B. nächster Termin)
  image?: string; // URL des Bildes
}

// Die eigentliche ActionAreaCard-Komponente, die die Props erhält und eine Karte rendert
export default function ActionAreaCard({
  // erwartete Parameter + default Werte
  id,
  title,
  description1 = "",
  description2 = "",
  image = "",
}: ActionAreaCardProps) {
  // Debugging
  /*
  console.debug(
    "Daten an ActionAreaCard: ",
    "ID: ",
    id,
    "Title: ",
    title,
    "Description 1: ",
    description1,
    "Description 2: ",
    description2,
    "Image: ",
    image
  );
*/
  // Card Component
  return (
    <Card
      sx={{
        //maxWidth: "100%", // füllt komplette Breite aus
        height: "100%", // füllt komplette Höhe aus
        border:1,
        borderColor:"primary.main"
        //display: "flex", // macht die Karte flexibel groß (je nach Containergröße)
        //boxSizing: "border-box", // sorgt dafür, dass Padding und Border nicht die Gesamtbreite überschreiten
        //flexDirection: "column", // Inhalte vertikal anordnen
        //justifyContent: "space-between", // BUG: Sollte Bilde oben und Text unten ausrichten, aber greift nich nicht (vermutlich MUI Formatiereung überschreibt diese)
      }}
    >
      {/* Interaktionsbereich der Karte */}
      <CardActionArea sx={{ height: "100%" }}>
        {/* Link-Komponente, um auf eine andere Seite zu navigieren, wenn die Karte angeklickt wird.
              Dort soll der Id für eine gezielte Get-Anfage zum jeweiligen Inhalt verewndet werden -> id mitgeben */}
        <Link to={`/stellenansicht/${id}`} style={{ textDecoration: "none" }}>
          {/* Bild der Karte */}
          {/* Wenn ein Bild übergeben wurde, soll das angezeigt werden, ansonsten ein Icon (an KI Vorschlag angelehnt) */}
          {image ? (
            /* Bild das Angezeigt werden soll, wenn vorhanden */
            <CardMedia
              component="img"
              height={imageHeight}
              image={image}
              alt={title}
            />
          ) : (
            /* Icon der Angezeigt werden soll, wenn es kein Bild gibt */
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: imageHeight,
              }}
            >
              <SvgIcon
                component={BusinessIcon}
                sx={{ fontSize: "100px", color: "primary" }}
              />
            </CardContent>
          )}
          {/* Textbereich der Karte */}
          <CardContent
            sx={
              {
                // Inhalte vertikal anordnen
                // display: "flex",
                // flexDirection: "column",
                // Ränder und Padding bei der Größe beachten
                // boxSizing: "border-box",
                // Abstandstyp zwischen den Inhalten
                // justifyContent: "space-between",
              }
            }
          >
            {/* Titel der Karte */}
            <Typography variant="h6">{title}</Typography>
            {/* Beschreibung */}

            <Typography variant="subtitle1">
              {/*Damit Leerzeilen ausgegeben werden, wenn nichts übergeben wurde */}
              {description1.trim() === "" ? <br /> : description1}
            </Typography>
            <Typography variant="body1">
              {description2.trim() === "" ? <br /> : description2}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
