import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Button, Grid, Menu, Popover, TextField } from '@material-ui/core';

import { workSpaces } from '../pseudoFields';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export const PinnedSubheaderList = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const subHeads = Object.keys(workSpaces)

  return (
    <Grid>
      <TextField
        disabled
        label="Workspaces"
        onClick={(e) =>
          handleClick(e)
        }>
      </TextField>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List className={classes.root} subheader={<li />}>
          {subHeads.map(subHead => (
            <li key={subHead} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader style={{color: 'black', fontWeight: 'bold'}}>{subHead}</ListSubheader>
                {Object.keys(workSpaces[subHead]).map(item => (
                  <ListItem key={subHead}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
      </Popover>
    </Grid>
  );
}