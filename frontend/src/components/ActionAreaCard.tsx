// https://mui.com/material-ui/react-card/
// https://mui.com/material-ui/api/card-action-area/
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import { format, parse } from 'date-fns'; // Zum Formatieren von Date-Objekten

import BusinessIcon from '@mui/icons-material/Business';
import { SvgIcon } from '@mui/material';

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
  id: string | number; // Id der Karte
  title: string; // Titel der Karte
  description_1?: string; // Beschreibung, die entweder ein Date-Objekt oder ein String sein kann
  description_2?: Date | string; // Beschreibung, die entweder ein Date-Objekt oder ein String sein kann
  image?: string; // URL des Bildes
  //link?: string; // Der Link, auf den beim Klicken auf die Karte navigiert wird
}

// Die eigentliche ActionAreaCard-Komponente, die die Props erhält und eine Karte rendert
export default function ActionAreaCard({ id, title, image, description_1 = ' ', description_2 = ' '}: ActionAreaCardProps) {
  
  // Überprüfen, ob die Beschreibung ein Date-Objekt ist und formatieren, wenn ja
  if (description_2 instanceof Date) {
     description_2 = 'Nächster Termin: ' + format(description_2, 'dd-MM-yyyy HH:mm')
  } 
  // KI: Überprüfen, ob die Beschreibung ein String im Date-Format ist und formatieren, wenn ja
  else if (typeof description_2 === 'string') {
    const parsedDate = parseDateFromString(description_2);
    if (parsedDate) {
      description_2 = 'Nächster Termin: ' + format(parsedDate, 'dd-MM-yyyy HH:mm');
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
          {/* Link-Komponente von react-router-dom, um auf eine andere Seite zu navigieren, wenn die Karte angeklickt wird.
              Dort soll der Id für eine gezielte Get-Anfage zum jeweiligen Inhalt verewndet werden -> id mitgeben */}
          <Link to={`/stellenansicht/${id}`} style={{ textDecoration: 'none' }}> 
            {/* Bild der Karte */}
            {/* Wenn ein Bild übergeben wurde, soll das angezeigt werden, ansonsten ein Icon (an KI) */}
            {image ? (
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={title}
              />
            ) : (
              <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '140px' }}>
                <SvgIcon component={BusinessIcon} sx={{ fontSize: '100px', color: 'grey.500' }} />
              </CardContent>
            ) 
            }
            {/* Textbereich der Karte */}
            <CardContent
              sx={{ 
                display: 'flex', 
                height: '100%',
                flexDirection: 'column', // Inhalte vertikal anordnen
                boxSizing: 'border-box', 
              }}>
              {/* Titel der Karte */}
              <Typography gutterBottom variant="h5" component="div" sx={{paddingBottom: '24px'}}>
                {title}
              </Typography>
              {/* Beschreibung */}
              <div style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  position: 'absolute',  // Text soll mit kleinem Abstand am unteren Kartenende stehen
                  bottom: 10, 
                  marginTop: 'auto'
                }}>
                <Typography variant="body1" 
                  sx={{ 
                    color: 'text.primary', 
                    //flexDirection: 'column',
                    //justifyContent: 'flex-end',
                    //position: 'absolute',  // Text soll mit kleinem Abstand am unteren Kartenende stehen
                    //bottom: 10 
                  }}>
                  {description_1} 
                  
                </Typography>
                <Typography variant="body2" 
                  sx={{ 
                    color: 'text.secondary', 
                    //flexDirection: 'column',
                    //justifyContent: 'flex-end',
                    //position: 'absolute',  
                    //bottom: 10,
                    textAlign: 'end' // Text soll rechtsbündig sein !FUNKTIONIERT NOCH NICHT!
                  }}>
                  {description_2}
                </Typography>
              </div>
            </CardContent>
          </Link>
        </CardActionArea>
    </Card>
  );
}