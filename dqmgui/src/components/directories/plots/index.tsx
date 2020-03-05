import * as React from 'react'
import { Grid, withStyles, IconButton, Icon } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { SizeProps } from 'src/app/interfaces'
import { request_for_images } from '../api'
import { isEmpty } from 'ramda'
import AdditionalPlots from './additionalPlots';
import SizeChanger from './sizeChanger';
import { PlotMenu } from './menu'

interface PlotsProps {
  dataset: string;
  run: string;
  selected_directory: string[],
  names: string[],
  size: SizeProps
}

const styles = (theme) => {
  const headerHeight = document.getElementById('searchForm').clientHeight
  const directoriesHeight = document.getElementById('directoriesGrid').clientHeight

  return ({
    biggerPlot: {
      maxWidth: '50%',
      // height: '100vh',
      height: `calc(100vh - ${headerHeight}px - 24px - ${directoriesHeight}px)`,
      overflowY: 'scroll',
      display: 'flex',
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
        border: `2px solid ${theme.palette.grey[500]}`
      },
    }
  })
}

const isSelectedPlot = (plotsList, plotName) => {
  const names = plotsList.map(plot => plot.name)
  if (names.indexOf(plotName) > -1) {
    return true
  }
  return false
}

class Plots extends React.Component<PlotsProps> {
  state = ({
    selectedImages: [],
    openMenu: false,
    anchorElMenu: null,
    name: '',
  })

  openMenu = () => {
    this.setState({
      openMenu: true
    })
  }

  setAnchorEl = (anchor) => {
    this.setState({
      anchorElMenu: anchor
    })
  }

  closeMenu = () => {
    this.setState({
      openMenu: false
    })
  }

  addImage = (imageProps: any) => {
    console.log(imageProps)
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

  setName = (name: string) => {
    this.setState({
      name: name
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
            <PlotMenu
              name={this.state.name}
              open={this.state.openMenu}
              handleClose={this.closeMenu}
              anchor={this.state.anchorElMenu}
              run={run}
              dataset={dataset}
              selected_directory={selected_directory}
              addImage={this.addImage}
            />
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
                      <MoreVertIcon onClick={(event) => {
                        this.openMenu()
                        this.setAnchorEl(event.currentTarget);
                        this.setName(name)
                      }
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