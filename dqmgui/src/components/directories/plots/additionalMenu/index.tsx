import * as React from 'react';
import { Grid, FormGroup, Checkbox, FormControlLabel, FormControl, FormLabel, withStyles } from '@material-ui/core';

import ReferenceTable from './referenceTable'
import PositionsSelectField from './position'
import { connect } from 'react-redux';
import {
  getNormalization,
  setNormalization,
  setShowReferenceForAll,
  getShowReferenceForAll,
  getNames,
  setDataForOverlay
} from '../../../ducks/plots/reference';
import { compose } from 'ramda';

interface AdditionalMenuProps {
  setNormalization(checked: boolean): void,
  checkedAllReference: boolean,
  checkedNormalization: boolean,
  setShowReferenceForAll(value: boolean): void,
  classes: {
    viewDetailsMenu: string,
    separator: string;
  }
  allPlotsNames: string[],
}

const styles = (theme: any) => ({
  viewDetailsMenu: {
    background: theme.palette.common.addtionalTable
  },
  separator: {
    padding: 8
  },
})

class AdditionalMenu extends React.Component<AdditionalMenuProps>{
  state = ({
    normalize: false,
    showReferenceForAllState: false,
    names: [],
    selectAll: false,
  })

  setNormalize = (state: boolean) => {
    this.setState({
      normalize: state
    })
  }

  setSelected = (state: boolean) => {
    this.setState({
      selected: state
    })
  }

  setShowingReferenceForAllState = (show: boolean) => {
    this.setState({
      showReferenceForAllState: show
    })
  }

  componentDidMount() {
    this.setState({
      names: this.props.allPlotsNames
    })
    // this.props.setDataForOverlay('Overlay')
  }

  render() {
    const { setNormalization,
      checkedAllReference,
      checkedNormalization,
      setShowReferenceForAll,
      classes,
    } = this.props

    return (
      <Grid container item xs={12} className={classes.viewDetailsMenu}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Reference</FormLabel>
          <FormGroup row>
            <Grid item className={classes.separator}>
              <PositionsSelectField />
            </Grid>
            <Grid item className={classes.separator}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedAllReference}
                    onChange={(e) => {
                      this.setSelected(e.target.checked)
                    }}
                  />
                }
                label="Show reference for all"
              />
            </Grid>
            <Grid item className={classes.separator}>
              <FormControlLabel
                control={
                  <Checkbox checked={checkedNormalization}
                    onChange={(e) => {
                      setNormalization(e.target.checked)
                    }}
                  />
                }
                label="Normalize"
              />
            </Grid>
          </FormGroup>
        </FormControl>
        <Grid container item xs={12} >
          <ReferenceTable selectAll={this.state.selectAll} />
        </Grid>
      </Grid>
    )
  }
}
export default compose<any, any, any>(
  connect(
    (state: any) => ({
      checkedNormalization: getNormalization(state),
      checkedAllReference: getShowReferenceForAll(state),
      allPlotsNames: getNames(state),
    }),
    (dispatch: any) => ({
      setNormalization(value: boolean) {
        dispatch(setNormalization(value))
      },
      setShowReferenceForAll(data) {
        dispatch(setShowReferenceForAll(data))
      },
      // setDataForOverlay(data) {
      //   dispatch(setDataForOverlay(data))
      // }
    })
  ),
  withStyles(styles),
)(AdditionalMenu)