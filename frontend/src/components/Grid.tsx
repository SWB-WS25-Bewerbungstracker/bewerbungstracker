
import React from 'react';
import ActionAreaCard from './ActionAreaCard';

const exampleCardData = [
  {
    name: 'FirmaName',
    logo: '/static/images/cards/company.jpg',
    date: 'dd-mm-yyyy hh:mm',
  },
];

const Grid: React.FC = () => {
  return (
    <div>
      {exampleCardData.map((data, index) => (
        <ActionAreaCard
          key={index}
          title={data.name}
          image={data.logo}
          date={data.date}
          link="/firmenansicht"
        />
      ))}
    </div>
  );
};

export default Grid;


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Grid() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={6}>
          <Item>1</Item>
        </Grid>
        <Grid size={6}>
          <Item>2</Item>
        </Grid>
        <Grid size={6}>
          <Item>3</Item>
        </Grid>
        <Grid size={6}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
