import * as React from 'react'
import { Grid, withStyles, Size } from '@material-ui/core'

import SizeChangerOnAdditionalPlots from './sizeChangerOnAdditionalPlots';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getAdditionalPlotsSize, setSizeOnAdditionalPlots } from '../../ducks/plots/sizeChanger';
import { request_for_images } from '../api'
import { assoc } from 'ramda';

interface AdditionalPlotsProps {
  classes?: {
    biggerPlots: string
  },
  selectedImages: string[];
  removeImage(image: string): void
  setSizeOnAdditionalPlots(size: Size): void;
}

const styles = (theme: any) => {
  const headerHeight = document.getElementById('searchForm').clientHeight
  const directoriesHeight = document.getElementById('directoriesGrid').clientHeight

  return ({
    biggerPlots: {
      maxWidth: '50%',
      height: `calc(100vh - ${headerHeight}px - 24px - ${directoriesHeight}px )`,
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
}

class AdditionalPlots extends React.Component<AdditionalPlotsProps>{
  componentWillUnmount() {
    this.props.setSizeOnAdditionalPlots({
      w: 720,
      h: 541,
    })
  }

  render() {
    const { removeImage, selectedImages, classes, size } = this.props
    const imageWithSize = selectedImages.map((selectedImage: any) => assoc('size', size, selectedImage))

    return (
      <Grid item container className={classes.biggerPlots}>
        <Grid item xs={12} className={classes.sizeChanger}>
          <SizeChangerOnAdditionalPlots />
        </Grid>
        <Grid item container justify="center">
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
}

export default compose<any, any, any>(
  connect(
    (state: any) => ({
      size: getAdditionalPlotsSize(state)
    }),
    { setSizeOnAdditionalPlots },
  ),
  withStyles(styles),
)(AdditionalPlots)