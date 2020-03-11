import * as React from 'react';
import { Grid, FormGroup, Checkbox, FormControlLabel, FormControl, FormLabel, withStyles } from '@material-ui/core';
import { debounce } from "debounce";

import { ReferenceTable } from './referenceTable'
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
    names: []
  })

  setNormalize = (state: boolean) => {
    this.setState({
      normalize: state
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
  }

  render() {
    const { setNormalization,
      checkedAllReference,
      checkedNormalization,
      setShowReferenceForAll,
      classes,
    } = this.props

    return (
      <Grid container item className={classes.viewDetailsMenu}>
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
                    onChange={() => {
                      setShowingReferenceForAllState(!showReferenceForAllState)
                      setShowReferenceForAll(!showReferenceForAllState)
                    }}
                  />
                }
                label="Show reference for all"
              />
            </Grid>
            <Grid item className={classes.separator}>
              <FormControlLabel
                control={
                  <Checkbox checked={checkedNormalization} onChange={() => {
                    setNormalize(!normalize)
                    setNormalization(!normalize)
                  }}
                  />
                }
                label="Normalize"
              />
            </Grid>
          </FormGroup>
        </FormControl>
        <ReferenceTable />
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
    { setNormalization, setShowReferenceForAll, setDataForOverlay },
  ),
  withStyles(styles),
)(AdditionalMenu)