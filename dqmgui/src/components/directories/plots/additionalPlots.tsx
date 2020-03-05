import * as React from 'react'
import { Grid, withStyles } from '@material-ui/core'

import SizeChangerOnAdditionalPlots from './sizeChangerOnAdditionalPlots';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getAdditionalPlotsSize } from '../../ducks/plots/sizeChanger';
import { request_for_images } from '../api'
import { assoc } from 'ramda';

interface AdditionalPlotsProps {
  classes?: {
    biggerPlots: string
  },
  selectedImages: string[];
  removeImage(image: string): void
}

const styles = (theme: any) => ({
  biggerPlots: {
    width: '50%',
    height: '100vh',
    overflowY: 'scroll',
    display: 'block'
  },
  onePlot: {
    width: 'fit-content',
    height: 'fit-content'
  },
  sizeChanger: {
    height: 'fit-content'
  }
})

const AdditionalPlots = ({ removeImage, selectedImages, classes, size }: AdditionalPlotsProps) => {
  const imageWithSize = selectedImages.map((selectedImage: any) => assoc('size', size, selectedImage))

  return (
    <Grid item container className={classes.biggerPlots}>
      <Grid item xs={12} className={classes.sizeChanger}>
        <SizeChangerOnAdditionalPlots />
      </Grid>
      <Grid item container>
        {imageWithSize.map(image => {
          return (<Grid
            className={classes.onePlot}
            item
            onClick={() => removeImage(image.name)}>
            <img src={request_for_images(
              image.run,
              image.dataset,
              image.selected_directory,
              image.name,
              image.size)} />
          </Grid>)
        }
        )}
      </Grid>
    </Grid>
  )
}


export default compose<any, any, any>(
  connect(
    (state: any) => ({
      size: getAdditionalPlotsSize(state)
    }),
    undefined,
  ),
  withStyles(styles),
)(AdditionalPlots)