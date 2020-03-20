import * as React from 'react'
import { Grid, withStyles, IconButton, Icon } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { compose } from 'ramda'

import { SizeProps } from 'src/app/interfaces'
import { request_for_images } from '../api'
import { isEmpty, assoc } from 'ramda'
import AdditionalPlots from './additionalPlots';
import SizeChanger from './sizeChanger';
import PlotMenu from './menu'
import AdditionalMenu from './additionalMenu';
import { connect } from 'react-redux';
import { getDataForOverlay, getPosition, getNormalization } from '../../ducks/plots/reference';
import Plot from './plot'
import { getSize } from '../../ducks/plots/sizeChanger';

interface PlotsProps {
  plots: any[];
  size: SizeProps,
  classes: {
    biggerPlot: string,
    add: string;
    name: string;
    sizeChanger: string,
    plotWrapper: string;
    selectedPlot: string;
    image: string;
  },
  overlay: string;
  runsForOverlay: any[]
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

  setName = (name: string) => {
    this.setState({
      name: name
    })
  }

  render() {
    const {
      plots,
      size,
      classes,
      overlay,
      runsForOverlay,
    } = this.props

    const selectedPlot = this.state.name && plots[this.state.name]
    const names = Object.keys(plots)
    const anySelectedPlotsNames = names.filter(name => {
      if (plots[name].selected === true) {
        return name
      }
    })
    const anySelectedPlots = Object.keys(plots)
      .filter(key => anySelectedPlotsNames.includes(key))
      .reduce((obj, key) => {
        obj[key] = plots[key];
        return obj;
      }, {});

    return (
      <Grid item container direction="row">
        <Grid item container direction="row" className={`${!isEmpty(anySelectedPlots) && classes.biggerPlot}`} >
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
              open={this.state.openMenu}
              handleClose={this.closeMenu}
              anchor={this.state.anchorElMenu}
              plot={selectedPlot}
            />
            {names.map((name: any) => {
              return <Grid container direction="column"
                item
                key={plots[name].name}
                id={plots[name].name}
                className={`${classes.plotWrapper} `}
              >
                <Plot
                  openMenu={this.openMenu}
                  setAnchorEl={this.setAnchorEl}
                  setName={this.setName}
                  classes={classes}
                  size={size}
                  plot={plots[name]}
                  overlay={overlay}
                  runsForOverlay={runsForOverlay}
                />
              </Grid>
            }
            )}

          </Grid>
        </Grid>
        {
          !isEmpty(anySelectedPlots) &&
          <AdditionalPlots
            selectedImages={anySelectedPlots}
            overlay={overlay}
            runsForOverlay={runsForOverlay}
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
      size: getSize(state),
      normalization: getNormalization(state),
    }),
    undefined,
  ), withStyles(styles))
  (Plots)