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
      width: '100%', 
      boxSizing: 'border-box', // Stellt sicher, dass Padding innerhalb der Breite der Box berücksichtigt wird
      padding: 2}}> {/* Padding für den Container */}
      <Grid 
      container 
      display={'flex'}        
      sx={{ display: 'flex', flexWrap: 'wrap'}} // Flexbox-Layout 
      >
        {/* Grid-Element für Karten */}
          {exampleCardData.map((data, index) => (
            <Grid 
            key={index}
            size={{ xs: 12, sm: 6, md: 4 }}
            padding={1}>
                <ActionAreaCard
                key={index}
                title={data.name}
                image={data.logo}
                date={data.date}
                link="/firmenansicht"
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
