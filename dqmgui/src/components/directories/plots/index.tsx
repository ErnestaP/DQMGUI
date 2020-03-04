import * as React from 'react'
import { Grid, withStyles, IconButton, Icon } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { SizeProps } from 'src/app/interfaces'
import { request_for_images } from '../api'
import { isEmpty } from 'ramda'

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
    overflowY: 'scroll'
  },
  add: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  name: {
    display: 'flex',
    justifyContent: 'space-between'
  },
})

class Plots extends React.Component<PlotsProps> {
  state = ({
    selectedImages: []
  })

  addImage = (imageUrl: string) => {
    const copy: string[] = [...this.state.selectedImages]
    copy.push(imageUrl)
    this.setState({
      selectedImages: copy
    })
  }

  showOneImage = (imageUrl: string) => {
    this.setState({
      selectedImages: [imageUrl]
    })
  }

  removeImage = (imageUrl: string) => {
    let copy: string[] = [...this.state.selectedImages]
    copy = copy.filter(item => item !== imageUrl)
    this.setState({
      selectedImages: copy
    })
  }

  render() {
    const { dataset, run, selected_directory, names, size, classes } = this.props
    console.log()
    return (
      <Grid item container direction="row">
        <Grid item container direction="row" className={`${!isEmpty(this.state.selectedImages) && classes.biggerPlot}`} >
          {names.map((name) => {
            return <Grid container direction="column"
              item
              key={name}
              id={name}
              style={{ width: 'fit-content' }}
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
                      this.addImage(request_for_images(run, dataset, selected_directory, name, { w: 931, h: 600 }))
                    } />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item
                onClick={(e) => {
                  this.showOneImage(request_for_images(run, dataset, selected_directory, name, { w: 931, h: 600 }))
                }}
                style={{
                  width: `${Object.values(size)[0] + 32}px`,
                  height: `${Object.values(size)[1] + 32}px`,
                }}>
                <img src={request_for_images(run, dataset, selected_directory, name, size)} />
              </Grid>
            </Grid>
          }
          )}
        </Grid>
        {
          !isEmpty(this.state.selectedImages) &&
          <Grid item className={classes.biggerPlot}
          >
            {this.state.selectedImages.map(image =>
              <Grid item onClick={() => this.removeImage(image)}>
                <img src={image} />
              </Grid>
            )}
          </Grid>
        }
      </Grid >
    )
  }
}

export default withStyles(styles)(Plots)