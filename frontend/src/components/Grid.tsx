// https://mui.com/material-ui/react-grid/
// https://mui.com/material-ui/api/grid/
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ActionAreaCard from './ActionAreaCard';

// Beispiel-Daten
const exampleCardData = [
  {
    name: 'FirmaName 1',
    logo: '',
    date: new Date('2025.01.01'),  // Beispiel für Date-Objekt
  },
  {
    name: 'FirmaName 2',
    logo: '',
    date: '2025.01.01 12:00',  // Beispiel für bereits formatierten String
  },
  {
    name: 'FirmaName 3',
    logo: '',
    date: 'yyyy-mm-dd hh:mm',
  },
  {
    name: 'FirmaName 4',
    logo: '',
    date: 'yyyy-mm-dd hh:mm',
  },
  {
    name: 'FirmaName 5',
    logo: '',
    date: 'yyyy-mm-dd hh:mm',
  },
  // Weitere Karten können hier hinzugefügt werden...
];

// Haupt-Komponente, die das Grid enthält
export default function CardGrid() {
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
          {exampleCardData.map((data, index) => (
            <Grid 
            key={index} // Schlüssel für jedes Grid-Element
            size={{ xs: 12, sm: 6, md: 4 }} // Größe des Grids je nach Bildschirmgröße
            padding={1} // Padding für jedes einzelne Grid-Element
            >
                <ActionAreaCard // eine Komponente, die eine Karte darstellt
                key={index} // Schlüssel für jede Karte
                title={data.name} // Titel der Karte
                image={data.logo} // Bild-URL für die Karte
                date={data.date} // Datum für die Beschreibung in der Karte
                link="/firmenansicht" // Link, der mit der Karte verbunden ist
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
