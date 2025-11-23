import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';



export default function ListItem() {
  return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="FirmaLogo" src="path-to-logo" />
        </ListItemAvatar>
        <ListItemText
          primary="FirmaName"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                dd.mm.yyyyy
              </Typography>
              {" — TerminTyp"}
            </React.Fragment>
          }
        />
      </ListItem>
  );
}