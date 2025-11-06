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
    <Card sx={{ maxWidth: 345 }}>
        <Link to={link }style={{ textDecoration: 'none' }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image={image}
                alt="Image"
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