import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { pathOr } from 'ramda';

interface PlotPopoverProps {
  open: boolean;
  handleClose: any;
  anchor: any;
  addImage(image: any): string;
  removeImage(name: string): void;
  removeStats(name: string): void;
  removedStats: string[];
  addStats(name: string): void;
  selectedImagesNames: string[];
  imageUrlPropsObject: any;
}

const getName = (imageUrlPropsObject: any) => pathOr('', ['name'], imageUrlPropsObject)
const isStatsRemoved = (removedStats: any, name: string) => removedStats.indexOf(name) > -1 ? true : false
const isPlotAddedToList = (selectedImagesNames: any, name: string) => selectedImagesNames.indexOf(name) > -1 ? true : false

export const PlotMenu = ({
  open,
  handleClose,
  anchor,
  addImage,
  removeImage,
  removeStats,
  removedStats,
  selectedImagesNames,
  imageUrlPropsObject,
  addStats }: PlotPopoverProps) => {

  const name: string = getName(imageUrlPropsObject)
  const isItRemoved = isStatsRemoved(removedStats, name)
  const isItAddedToList = isPlotAddedToList(selectedImagesNames, name)

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
        {isItAddedToList ?
          <ListItem button onClick={() => {
            removeImage(name)
            handleClose()
          }}>
            <ListItemIcon>
              <RemoveIcon />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </ListItem>
          :
          <ListItem button onClick={() => {
            addImage(imageUrlPropsObject)
            handleClose()
          }}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItem>
        }
        {
          isItRemoved ?
            <ListItem button onClick={() => {
              addStats(name)
              handleClose()
            }}>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Add stats" />
            </ListItem>
            :
            <ListItem button onClick={() => {
              removeStats(name)
              handleClose()
            }}>
              <ListItemIcon>
                <RemoveCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Remove stats" />
            </ListItem>
        }
      </List>
    </Popover>)
}