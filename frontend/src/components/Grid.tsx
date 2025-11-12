// https://mui.com/material-ui/react-grid/
// https://mui.com/material-ui/api/grid/
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ActionAreaCard from './ActionAreaCard';
import { type ActionAreaCardProps } from './ActionAreaCard';

// Props, die CardGrid erwartet = Array von "CardData"-Objekten
interface CardGridProps {
  data: ActionAreaCardProps[];
}

// Haupt-Komponente, die das Grid enthält
export default function CardGrid({ data }: CardGridProps) {
  return (
    <Box sx={{ 
      width: '100%', // volle Bildschirmbreite
      boxSizing: 'border-box', // Padding bei der Berechnung der Gesamtbreite berücksichtigen
      padding: 2 // Padding für den ganzen Container außenrum
      }}> 
      <Grid 
      container // Grid-Container in dem die einzelnen Grid-Items sich befinden   
      sx={{ display: 'flex', flexWrap: 'wrap'}} // Flexbox-Layout damit die Zeile der Karten umbricht, wenn der Platz nicht ausreicht (wrap)
      >
        {/* Grid-Element für Karten */}
        {/* Durchlaufen des übergebenen Daten-Array und erstellen der Karten */}
          {data.map((item, index) => (
            <Grid 
            key={index} // Schlüssel für jedes Grid-Element
            size={{ xs: 12, sm: 6, md: 4 }} // Größe des Grids je nach Bildschirmgröße
            padding={1} // Padding für jedes einzelne Grid-Element
            >
                <ActionAreaCard // eine Komponente, die eine Karte darstellt
                key={index} // Schlüssel für jede Karte
                title={item.title} // Titel der Karte
                image={item.image} // Bild-URL für die Karte
                description={item.description} // Datum für die Beschreibung in der Karte
                link={item.link} // Link, der mit der Karte verbunden ist
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
