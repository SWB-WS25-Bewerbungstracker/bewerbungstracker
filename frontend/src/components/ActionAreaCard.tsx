// https://mui.com/material-ui/react-card/
// https://mui.com/material-ui/api/card-action-area/
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import { SvgIcon } from '@mui/material';

// Damit variable Werte (Props) verwendet werden können
export interface ActionAreaCardProps {
  id: string | number; // Id der Karte
  title: string; // Titel der Karte
  description_1?: string; // Beschreibung, die entweder ein Date-Objekt oder ein String sein kann
  description_2?: string; // Beschreibung, die entweder ein Date-Objekt oder ein String sein kann
  image?: string; // URL des Bildes
}

// Die eigentliche ActionAreaCard-Komponente, die die Props erhält und eine Karte rendert
export default function ActionAreaCard({ id, title, image, description_1 = '', description_2 = ''}: ActionAreaCardProps) {

  // Card Component
  return (
    <Card sx={{ 
      maxWidth: '100%', // macht die Karte flexibel groß (je nach Containergröße)
      height: '100%',
      display: 'flex',
      boxSizing: 'border-box', // sorgt dafür, dass Padding und Border nicht die Gesamtbreite überschreiten
      flexDirection: 'column', // Inhalte vertikal anordnen
      justifyContent: 'space-between',
       }}>
        {/* Interaktionsbereich der Karte */}
        <CardActionArea sx={{ height: '100%'}}>
          {/* Link-Komponente von react-router-dom, um auf eine andere Seite zu navigieren, wenn die Karte angeklickt wird.
              Dort soll der Id für eine gezielte Get-Anfage zum jeweiligen Inhalt verewndet werden -> id mitgeben */}
          <Link to={`/stellenansicht/${id}`} style={{ textDecoration: 'none' }}> 
            {/* Bild der Karte */}
            {/* Wenn ein Bild übergeben wurde, soll das angezeigt werden, ansonsten ein Icon (an KI Vorschlag angelehnt) */}
            {image ? (
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={title}
              />
            ) : (
              /*Icon der Angezeigt werden soll, wenn es kein Bild gibt */
              <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '140px' }}>
                <SvgIcon component={BusinessIcon} sx={{ fontSize: '100px', color: 'primary' }} />
              </CardContent>
            ) 
            }
            {/* Textbereich der Karte */}
            <CardContent
              sx={{ 
                // Inhalte vertikal anordnen
                display: 'flex', 
                flexDirection: 'column',
                // Ränder und Padding bei der Größe beachten
                boxSizing: 'border-box',
                // Abstandstyp zwischen den Inhalten
                justifyContent: 'space-between' 
                
              }}>
              {/* Titel der Karte */}
                <Typography variant='h6'>
                  {title}
                </Typography>
              {/* Beschreibung */}
              <div style={{
                  //display: 'flex', 
                  //flexDirection: 'column',
                  //justifyContent: 'flex-end',
                  //position: 'absolute', // Text soll mit kleinem Abstand am unteren Kartenende stehen
                  //bottom: 10,  
                }}>
                <Typography variant="subtitle1">
                  {/*Damit Leerzeilen ausgegeben werden, wenn nichts übergeben wurde */}
                  {description_1.trim() === '' ? <br /> : description_1}
                  
                </Typography>
                <Typography variant="body1">
                   {description_2.trim() === '' ? <br /> : description_2} 
                </Typography>
              </div>
            </CardContent>
          </Link>
        </CardActionArea>
    </Card>
  );
}