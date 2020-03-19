import * as React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { request_for_images } from '../api'
import { compose, pathOr } from 'ramda';
import { connect } from 'react-redux';

import { setSelectedPlot } from '../../ducks/plots/setNames'

interface PlotProps {
  classes: {
    plotWrapper: string;
    name: string;
  },
  openMenu(): void;
  setAnchorEl(event: any): void;
  setName(name: string): void;
  size: any;
  name: string,
  plot: any,
  setSelectedPlot(name: string): void,
  runsForOverlay: any[]
  overlay: string
}

const Plot = ({
  openMenu,
  setAnchorEl,
  setName,
  classes,
  name,
  plot,
  setSelectedPlot,
  runsForOverlay,
  overlay,
  size,
}: PlotProps) => {

  return (
    <Grid container direction="column"
      item
      key={pathOr('', ['name'], plot)}
      id={pathOr('', ['name'], plot)}
      className={`${classes.plotWrapper} `}
    >
      <Grid item container className={classes.name}>
        <Grid item
          style={{
            width: `${Object.values(size)[0]}px`, textDecoration: 'underline',
            wordBreak: 'break-word'
          }}
        >
          {name}
        </Grid>
        <Grid item className={classes.add}>
          <IconButton onClick={(event) => {
            openMenu()
            setAnchorEl(event.currentTarget);
            setName(pathOr('', ['name'], plot))
          }} >
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item
        onClick={(e) => {
          setSelectedPlot(pathOr('', ['name'], plot))
        }}
        style={{
          width: `${Object.values(size)[0] + 32}px`,
          height: `${Object.values(size)[1] + 32}px`,
        }}
      >
        <img className={`${classes.image} ${plot.selected
          && classes.selectedPlot}`}
          src={request_for_images({
            plot: plot,
            overlay: overlay,
            size: size,
            runsForOverlay: runsForOverlay,
          })} />
      </Grid>
    </Grid>)
}

export default compose(
  connect(
    undefined,
    (dispatch: any) => ({
      setSelectedPlot(name: string) {
        dispatch(setSelectedPlot(name))
      }
    })
  )
)(Plot)