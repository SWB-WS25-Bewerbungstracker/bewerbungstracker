// https://mui.com/material-ui/api/card-action-area/
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'; // Zum Formatieren von Date-Objekten

// Damit variable Werte (Props) verwendet werden können
interface ActionAreaCardProps {
  title: string; // Titel der Karte
  image: string; // URL des Bildes
  date: Date | string; // Das Datum, das entweder ein Date-Objekt oder ein String sein kann
  link: string; // Der Link, auf den beim Klicken auf die Karte navigiert wird
}

// Die eigentliche ActionAreaCard-Komponente, die die Props erhält und eine Karte rendert
const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ title, image, date, link = "/firmenansicht" }) => {
  // Überprüfen, ob das Datum ein Date-Objekt ist und formatieren, wenn ja
  const formattedDate = date instanceof Date
    ? format(date, 'dd-MM-yyyy HH:mm')  // Formatieren des Date-Objekts
    : date;  // Wenn es schon ein String ist, bleibt es unverändert

  
  return (
    <Card sx={{ 
      maxWidth: '100%', // macht die Karte flexibel groß (je nach Containergröße)
      boxSizing: 'border-box', // sorgt dafür, dass Padding und Border nicht die Gesamtbreite überschreiten
      //display: 'flex', // Flexbox aktivieren
      flexDirection: 'column', // Inhalte vertikal anordnen
       }}>
        {/* Link-Komponente von react-router-dom, um auf eine andere Seite zu navigieren, wenn die Karte angeklickt wird */}
        <Link to={link }style={{ textDecoration: 'none' }}> 
            <CardActionArea>
                 {/* Bild der Karte */}
                <CardMedia
                  component="img"
                  height="140" // Bildhöhe
                  image={image} // Bild-URL
                  alt={title} // Alt-Text für das Bild
                />
                <CardContent>
                  {/* Titel der Karte */}
                  <Typography gutterBottom variant="h5" component="div">
                      {title}
                  </Typography>
                   {/* Datum, das formatiert in der Beschreibung angezeigt wird */}
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Nächster Termin: {formattedDate} 
                  </Typography>
                </CardContent>
            </CardActionArea>
        </Link>
    </Card>
  );
}

export default ActionAreaCard;