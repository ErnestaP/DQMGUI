import * as React from 'react';
import { Grid, FormGroup, Checkbox, FormControlLabel, FormControl, FormLabel, withStyles } from '@material-ui/core';

import ReferenceTable from './referenceTable'
import PositionsSelectField from './position'
import { connect } from 'react-redux';
import {
  getNormalization,
  setNormalization,
  toggleAllCheckboxes,
  setPosition,
} from '../../../ducks/plots/reference';
import { compose } from 'ramda';

interface AdditionalMenuProps {
  setNormalization(checked: boolean): void,
  checkedNormalization: boolean,
  classes: {
    viewDetailsMenu: string,
    separator: string;
  },
  toggleAllCheckboxes(value: boolean): any
  setPosition(position: string): void;
}

const styles = (theme: any) => ({
  viewDetailsMenu: {
    background: theme.palette.common.addtionalTable,
    padding: 8,
  },
  separator: {
    padding: 8
  },
})

class AdditionalMenu extends React.Component<AdditionalMenuProps> {
  componentDidMount() {
    this.props.setPosition('overlay')
  }

  componentWillUnmount() {
    this.props.setPosition('')
  }

  render() {
    const { setNormalization,
      checkedNormalization,
      classes,
      toggleAllCheckboxes,
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
                  // onChange={(e) => {
                  //   toggleAllCheckboxes(e.target.checked)
                  // }}
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
          <ReferenceTable />
        </Grid>
      </Grid>
    )
  }
}
export default compose<any, any, any>(
  connect(
    (state: any) => ({
      checkedNormalization: getNormalization(state),
    }),
    (dispatch: any) => ({
      setNormalization(value: boolean) {
        dispatch(setNormalization(value))
      },
      toggleAllCheckboxes(value: boolean) {
        dispatch(toggleAllCheckboxes(value))
      },
      setPosition(position: string) {
        dispatch(setPosition(position))
      }
    })
  ),
  withStyles(styles),
)(AdditionalMenu)