import * as React from 'react'
import { Grid, withStyles, IconButton, Icon } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { compose } from 'ramda'

import { SizeProps } from 'src/app/interfaces'
import { request_for_images } from '../api'
import { isEmpty, assoc } from 'ramda'
import AdditionalPlots from './additionalPlots';
import SizeChanger from './sizeChanger';
import { PlotMenu } from './menu'
import AdditionalMenu from './additionalMenu';
import { connect } from 'react-redux';
import { getDataForOverlay, getPosition, getNormalization } from '../../ducks/plots/reference';

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
      height: `calc(100vh - ${headerHeight}px - 24px - ${directoriesHeight}px)`,
      overflowY: 'scroll',
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

const formUrlPropsObject = (run: string,
  dataset: string,
  selected_directory: string[],
  name: string,
  size: SizeProps,
  removestats = false,
  overlay = undefined,
  runsForOverlay = {},
  normalization = false,
) => (
    {
      run: run,
      dataset: dataset,
      selected_directory: selected_directory,
      name: name,
      size: size,
      removestats: removestats,
      overlay: overlay,
      runsForOverlay: runsForOverlay,
      normalization: normalization
    }
  )

class Plots extends React.Component<PlotsProps> {
  state = ({
    selectedImages: [],
    openMenu: false,
    anchorElMenu: null,
    name: '',
    imagesWithRemovedStats: [],
    selectedImagesNames: [],
    openAdditionalMenu: false,
  })

  openMenu = () => {
    this.setState({
      openMenu: true
    })
  }

  toggleAdditionalMenu = () => {
    this.setState({
      openAdditionalMenu: !this.state.openAdditionalMenu
    })
  }

  setAnchorEl = (anchor: any) => {
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
    const copy: any[] = [...this.state.selectedImages]
    const copyOfNames = [...this.state.selectedImagesNames]
    copyOfNames.push(imageProps.name)
    copy.push(imageProps)
    this.setState({
      selectedImages: copy,
      selectedImagesNames: copyOfNames,
    })
  }

  showOneImage = (imageProps: any) => {
    this.setState({
      selectedImages: [imageProps],
      selectedImagesNames: [imageProps.name]
    })
  }

  removeImage = (imageUrl: string) => {
    let copy: string[] = [...this.state.selectedImages]
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

  removeStats = (nameOfPlot: string) => {
    const copy: string[] = [...this.state.imagesWithRemovedStats]
    copy.push(nameOfPlot)
    this.setState({
      imagesWithRemovedStats: copy
    })
  }

  addStats = (nameOfPlot: string) => {
    let copy: string[] = [...this.state.imagesWithRemovedStats]
    copy = copy.filter(item => item !== nameOfPlot)
    this.setState({
      imagesWithRemovedStats: copy
    })
  }

  render() {
    const {
      dataset,
      run,
      selected_directory,
      names,
      size,
      classes,
      runsForOverlay,
      overlay,
      normalization, } = this.props

    return (
      <Grid item container direction="row">
        <Grid item container direction="row" className={`${!isEmpty(this.state.selectedImages) && classes.biggerPlot}`} >
          <Grid item xs={12} className={classes.sizeChanger} container spacing={4}>
            <Grid item>
              <IconButton onClick={() => {
                this.toggleAdditionalMenu()
              }} >
                <MoreVertIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <SizeChanger />
            </Grid>
            <Grid item container xs={12}>
              {this.state.openAdditionalMenu &&
                <AdditionalMenu />
              }
            </Grid>
          </Grid>
          <Grid item container justify="space-evenly">
            <PlotMenu
              imageUrlPropsObject={
                formUrlPropsObject(
                  run,
                  dataset,
                  selected_directory,
                  this.state.name,
                  null,
                  this.removeStats)}
              open={this.state.openMenu}
              handleClose={this.closeMenu}
              anchor={this.state.anchorElMenu}
              addImage={this.addImage}
              removeImage={this.removeImage}
              removeStats={this.removeStats}
              removedStats={this.state.imagesWithRemovedStats}
              addStats={this.addStats}
              selectedImagesNames={this.state.selectedImagesNames}
            />
            {names.map((name) => {
              const removeStats = this.state.imagesWithRemovedStats.indexOf(name) > -1 ? true : false
              const imageUrlPropsObject =
                formUrlPropsObject(run,
                  dataset,
                  selected_directory,
                  name,
                  size,
                  removeStats,
                  overlay,
                  runsForOverlay,
                  normalization)
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
                  >
                    {name}
                  </Grid>
                  <Grid item className={classes.add}>
                    <IconButton onClick={(event) => {
                      this.openMenu()
                      this.setAnchorEl(event.currentTarget);
                      this.setName(name)
                    }} >
                      <MoreVertIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item
                  onClick={(e) => {
                    this.showOneImage(imageUrlPropsObject)
                  }}
                  style={{
                    width: `${Object.values(size)[0] + 32}px`,
                    height: `${Object.values(size)[1] + 32}px`,
                  }}
                >
                  <img className={`${classes.image} ${isSelectedPlot(this.state.selectedImages, name)
                    && classes.selectedPlot}`}
                    src={request_for_images(imageUrlPropsObject)} />
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

export default compose(
  connect(
    (state: any) => ({
      runsForOverlay: getDataForOverlay(state),
      overlay: getPosition(state),
      normalization: getNormalization(state),
    }),
    undefined,
  ), withStyles(styles))
  (Plots)