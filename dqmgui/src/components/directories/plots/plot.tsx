import * as React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { request_for_images } from '../api'

interface PlotProps {
  classes: {
    plotWrapper: string;
    name: string;
  },
  openMenu(): void;
  setAnchorEl(event: any): void;
  setName(name: string): void;
  showOneImage(url: any): void;
  isSelectedPlot(plot: any): boolean,
  size: any;
}

export const Plot = ({
  openMenu,
  setAnchorEl,
  setName,
  showOneImage,
  isSelectedPlot,
  classes,
  size,
  name,
  imageUrlPropsObject,
  selectedImages
}: PlotProps) => {

  return (
    <Grid container direction="column"
      item
      key={name}
      id={name}
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
            setName(name)
          }} >
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item
        onClick={(e) => {
          showOneImage(imageUrlPropsObject)
        }}
        style={{
          width: `${Object.values(size)[0] + 32}px`,
          height: `${Object.values(size)[1] + 32}px`,
        }}
      >
        <img className={`${classes.image} ${isSelectedPlot(selectedImages, name)
          && classes.selectedPlot}`}
          src={request_for_images(imageUrlPropsObject)} />
      </Grid>
    </Grid>)
}