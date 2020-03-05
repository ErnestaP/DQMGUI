import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';

interface PlotPopoverProps {
  name: string;
  open: boolean;
  handleClose: any;
  anchor: any;
  run: string;
  dataset: string;
  selected_directory: string[];
  addImage(image: any): string;
}

export const PlotMenu = ({
  name,
  open,
  handleClose,
  anchor,
  run,
  dataset,
  selected_directory,
  addImage }: PlotPopoverProps) => {

  return (
    <Popover
      id={name}
      open={open}
      anchorEl={anchor}
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
      <List>
        <ListItem button onClick={() => {
          addImage({
            run: run,
            dataset: dataset,
            selected_directory: selected_directory,
            name: name
          })
          handleClose()
        }}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add" />
        </ListItem>
      </List>
    </Popover>)
}