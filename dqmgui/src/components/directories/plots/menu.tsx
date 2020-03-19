import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { pathOr } from 'ramda';
import { connect } from 'react-redux';

import { setSelectedPlots, removeSelectedPlot, removeStats, addStats } from '../../ducks/plots/setNames'

interface PlotPopoverProps {
  open: boolean;
  handleClose: any;
  anchor: any;
  setSelectedPlots(image: any): string;
  removeSelectedPlot(name: string): void;
  removeStats(name: string): void;
  removedStats: string[];
  addStats(name: string): void;
  plot: any;
}

const PlotMenu = ({
  open,
  handleClose,
  anchor,
  setSelectedPlots,
  removeSelectedPlot,
  addStats,
  plot,
  removeStats }: PlotPopoverProps) => {

  return (
    <Popover
      id={pathOr('', ['name'], plot)}
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
        {pathOr('', ['selected'], plot) ?
          <ListItem button onClick={() => {
            removeSelectedPlot(plot.name)
            handleClose()
          }}>
            <ListItemIcon>
              <RemoveIcon />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </ListItem>
          :
          <ListItem button onClick={() => {
            setSelectedPlots(plot.name)
            handleClose()
          }}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItem>
        }
        {
          !pathOr('', ['stats'], plot) ?
            <ListItem button onClick={() => {
              addStats(plot.name)
              handleClose()
            }}>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Add stats" />
            </ListItem>
            :
            <ListItem button onClick={() => {
              removeStats(plot.name)
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

export default connect(
  undefined,
  (dispatch: any) => ({
    setSelectedPlots(name: string) {
      dispatch(setSelectedPlots(name))
    },
    removeSelectedPlot(name: string) {
      dispatch(removeSelectedPlot(name))
    },
    removeStats(name: string) {
      dispatch(removeStats(name))
    },
    addStats(name: string) {
      dispatch(addStats(name))
    },
  })
)(PlotMenu) 