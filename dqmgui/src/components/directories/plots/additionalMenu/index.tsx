import * as React from 'react';
import { Grid, FormGroup, Checkbox, FormControlLabel, FormControl, FormLabel, withStyles } from '@material-ui/core';

import ReferenceTable from './referenceTable'
import PositionsSelectField from './position'
import { connect } from 'react-redux';
import { setPosition } from '../../../ducks/plots/reference';
import { normalizePlots, toggleStatsForAllPlots } from '../../../ducks/plots/setNames';
import { compose } from 'ramda';

interface AdditionalMenuProps {
  normalizePlots(checked: boolean): void,
  checkedNormalization: boolean,
  classes: {
    viewDetailsMenu: string,
    separator: string;
  },
  toggleStatsForAllPlots(value: boolean): any
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
  state = {
    checked: true
  }

  toggleNormalizeCheckbox = () => {
    this.setState({
      checked: !this.state.checked
    })
  }

  componentDidMount() {
    this.props.setPosition('overlay')
  }

  componentWillUnmount() {
    this.props.setPosition('')
  }


  render() {
    const { normalizePlots,
      toggleStatsForAllPlots,
      classes,
    } = this.props

    return (
      <Grid container item xs={12} className={classes.viewDetailsMenu}>
        <FormControl component="fieldset">
          <FormLabel component="legend">View Details</FormLabel>
          <FormGroup row>
            <Grid item className={classes.separator}>
              <PositionsSelectField />
            </Grid>
            <Grid item className={classes.separator}>
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={this.state.checked}
                    onChange={(e) => {
                      // this.toggleNormalizeCheckbox()
                      normalizePlots(e.target.checked)
                    }}
                  />
                }
                label="Normalize"
              />
            </Grid>
            <Grid item className={classes.separator}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      toggleStatsForAllPlots(!e.target.checked)
                    }}
                  />
                }
                label="Remove stats"
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
    undefined,
    (dispatch: any) => ({
      setPosition(position: string) {
        dispatch(setPosition(position))
      },
      normalizePlots(value: boolean) {
        dispatch(normalizePlots(value))
      },
      toggleStatsForAllPlots(value: boolean) {
        dispatch(toggleStatsForAllPlots(value))
      }
    })
  ),
  withStyles(styles),
)(AdditionalMenu)