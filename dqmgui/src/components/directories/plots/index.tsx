import * as React from 'react'
import { Grid, withStyles, IconButton, Icon } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { SizeProps } from 'src/app/interfaces'
import { request_for_images } from '../api'
import { isEmpty } from 'ramda'
import AdditionalPlots from './additionalPlots';
import SizeChanger from './sizeChanger';

interface PlotsProps {
  dataset: string;
  run: string;
  selected_directory: string[],
  names: string[],
  size: SizeProps
}

const styles = (theme) => ({
  biggerPlot: {
    width: '50%',
    height: '100vh',
    overflowY: 'scroll',
    dipslay: 'flex',
    justifyContent: 'center',
    display: 'block'

  },
  add: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  name: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  sizeChanger: {
    paddingLeft: 16,
    paddingBottom: 4
  },
  plotWrapper: {
    width: 'fit-content',
    padding: '2px',
  },
  selectedPlot: {
    border: `2px solid ${theme.palette.primary.light}`
  },
  image: {
    '&:hover': {
      border: `2px solid ${theme.palette.grey[300]}`
    },
  }
})

const isSelectedPlot = (plotsList, plotName) => {
  const names = plotsList.map(plot => plot.name)
  if (names.indexOf(plotName) > -1) {
    return true
  }
  return false
}

class Plots extends React.Component<PlotsProps> {
  state = ({
    selectedImages: []
  })

  addImage = (imageProps: any) => {
    const copy: any[] = [...this.state.selectedImages]
    copy.push(imageProps)
    this.setState({
      selectedImages: copy
    })
  }

  showOneImage = (imageProps: any) => {
    this.setState({
      selectedImages: [imageProps]
    })
  }

  removeImage = (imageUrl: string) => {
    let copy: string[] = [...this.state.selectedImages]
    console.log(copy, imageUrl)
    copy = copy.filter(item => item.name !== imageUrl)
    this.setState({
      selectedImages: copy
    })
  }

  render() {
    const { dataset, run, selected_directory, names, size, classes } = this.props

    return (
      <Grid item container direction="row">
        <Grid item container direction="row" className={`${!isEmpty(this.state.selectedImages) && classes.biggerPlot}`} >
          <Grid item xs={12} className={classes.sizeChanger}>
            <SizeChanger />
          </Grid>
          <Grid item container justify="space-evenly">
            {names.map((name) => {
              return <Grid container direction="column"
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
                  >{name}</Grid>
                  <Grid item className={classes.add}>
                    <IconButton>
                      <AddCircleOutlineIcon onClick={() =>
                        this.addImage({
                          run: run,
                          dataset: dataset,
                          selected_directory: selected_directory,
                          name: name
                        })
                      } />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item
                  onClick={(e) => {
                    this.showOneImage({
                      run: run,
                      dataset: dataset,
                      selected_directory: selected_directory,
                      name: name
                    })
                  }}
                  style={{
                    width: `${Object.values(size)[0] + 32}px`,
                    height: `${Object.values(size)[1] + 32}px`,
                  }}
                >
                  <img className={`${classes.image} ${isSelectedPlot(this.state.selectedImages, name) && classes.selectedPlot}`} src={request_for_images(run, dataset, selected_directory, name, size)} />
                </Grid>
              </Grid>
            }
            )}
          </Grid>
        </Grid>
        {
          !isEmpty(this.state.selectedImages) &&
          <AdditionalPlots
            selectedImages={this.state.selectedImages}
            removeImage={this.removeImage}
          />
        }
      </Grid >
    )
  }
}

export default withStyles(styles)(Plots)