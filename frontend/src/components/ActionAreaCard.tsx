import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'; // Zum Formatieren von Date-Objekten

interface ActionAreaCardProps {
  title: string;
  image: string;
  date: Date | string; 
  link: string;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ title, image, date, link = "/firmenansicht" }) => {
  // Überprüfen, ob das Datum ein Date-Objekt ist und formatieren, wenn ja
  const formattedDate = date instanceof Date
    ? format(date, 'dd-MM-yyyy HH:mm')  // Formatieren des Date-Objekts
    : date;  // Wenn es schon ein String ist, bleibt es unverändert

  
  return (
    <Card sx={{ 
      maxWidth: '100%', // macht die Karte flexibel
      flex: 1, // lässt die Karte flexibel wachsen
      boxSizing: 'border-box', // sorgt dafür, dass Padding und Border nicht die Breite überschreiten
      marginBottom: 2, // fügt Abstand nach unten hinzu
      display: 'flex', // Flexbox aktivieren
      flexDirection: 'column', // Inhalte vertikal anordnen
       }}>
        <Link to={link }style={{ textDecoration: 'none' }}>
            <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={image}
                  alt={title}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
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