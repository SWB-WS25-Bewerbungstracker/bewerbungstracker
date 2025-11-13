// https://mui.com/material-ui/react-card/
// https://mui.com/material-ui/api/card-action-area/
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import { format, parse } from 'date-fns'; // Zum Formatieren von Date-Objekten


// KI: Funktion, die alle unterstützten Formate an Datum-Strings parst
const parseDateFromString = (str: string): Date | null => {
  const formats = [
    'dd-MM-yyyy', 
    'dd.MM.yyyy', 
    'dd-MM-yyyy HH:mm', 
    'dd.MM.yyyy HH:mm', 
    'yyyy-MM-dd', 
    'yyyy.MM.dd', 
    'yyyy-MM-dd HH:mm', 
    'yyyy.MM.dd HH:mm', 
  ];
  // Überprüfen, ob einer der Formate passt
  for (let formatStr of formats) {
    const parsedDate = parse(str, formatStr, new Date());
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate; // Rückgabe des Datums, wenn es gültig ist
    }
  }
  return null; // Wenn kein Format übereinstimmt
};

// Damit variable Werte (Props) verwendet werden können
export interface ActionAreaCardProps {
  title: string; // Titel der Karte
  image?: string; // URL des Bildes
  description?: Date | string; // Beschreibung, die entweder ein Date-Objekt oder ein String sein kann
  link?: string; // Der Link, auf den beim Klicken auf die Karte navigiert wird
}

// Die eigentliche ActionAreaCard-Komponente, die die Props erhält und eine Karte rendert
export default function ActionAreaCard({ title, image = ' ', description = ' ', link = './home' }: ActionAreaCardProps) {
  
  // Überprüfen, ob die Beschreibung ein Date-Objekt ist und formatieren, wenn ja
  if (description instanceof Date) {
     description = 'Nächster Termin: ' + format(description, 'dd-MM-yyyy HH:mm')
  } 
  // KI: Überprüfen, ob die Beschreibung ein String im Date-Format ist und formatieren, wenn ja
  else if (typeof description === 'string') {
    const parsedDate = parseDateFromString(description);
    if (parsedDate) {
      description = 'Nächster Termin: ' + format(parsedDate, 'dd-MM-yyyy HH:mm');
    }
  }
  
  // Card Component
  return (
    <Card sx={{ 
      maxWidth: '100%', // macht die Karte flexibel groß (je nach Containergröße)
      boxSizing: 'border-box', // sorgt dafür, dass Padding und Border nicht die Gesamtbreite überschreiten
      flexDirection: 'column', // Inhalte vertikal anordnen
      height: '100%',
       }}>
        {/* Interaktionsbereich der Karte */}
        <CardActionArea sx={{ height: '100%'}}>
          {/* Link-Komponente von react-router-dom, um auf eine andere Seite zu navigieren, wenn die Karte angeklickt wird */}
          <Link to={link } style={{ textDecoration: 'none' }}> 
            {/* Bild der Karte */}
            <CardMedia
              component="img"
              height="140" // Bildhöhe
              image={image} // Bild-URL
              alt={title} // Alt-Text für das Bild
            />
            {/* Textbereich der Karte */}
            <CardContent
              sx={{ 
                display: 'flex', 
                height: '100%',
                flexDirection: 'column', // Inhalte vertikal anordnen
                boxSizing: 'border-box', 
              }}>
              {/* Titel der Karte */}
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              {/* Beschreibung */}
              <Typography variant="body2" 
                sx={{ 
                  color: 'text.secondary', 
                  position: 'absolute',  // Text soll mit kleinem Abstand am unteren Kartenende stehen
                  bottom: 10 
                }}>
                {description} 
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
    </Card>
  );
}