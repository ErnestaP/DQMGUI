import * as React from 'react';
import { Grid, FormGroup, Checkbox, FormControlLabel, FormControl, FormLabel, withStyles } from '@material-ui/core';

import { ReferenceTable } from './referenceTable'
import PositionsSelectField from './position'
import { connect } from 'react-redux';
import { getNormalization, setNormalization, setShowReferenceForAll, getShowReferenceForAll } from '../../../ducks/plots/reference';
import { compose } from 'ramda';
import { Form } from 'react-final-form';

interface AdditionalMenuProps {
  setNormalization(checked: boolean): void,
  checkedAllReference: boolean,
  checkedNormalization: boolean,
  setShowReferenceForAll(value: boolean): void,
  classes: {
    viewDetailsMenu: string,
  }
}

const styles = (theme) => ({
  viewDetailsMenu: {
    background: theme.palette.common.addtionalTable
  },
  separator: {
    padding: 8
  },
})

const AdditionalMenu: React.FC<AdditionalMenuProps> = ({
  setNormalization,
  checkedAllReference,
  checkedNormalization,
  setShowReferenceForAll,
  classes,
  ...props }) => {
  const [normalize, setNormalize] = React.useState(false)
  const [showReferenceForAllState, setShowingReferenceForAllState] = React.useState(false)

  return (
    <Grid container item className={classes.viewDetailsMenu}>
      <Form onSubmit={() => { }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}
            id="viewDetails"
            style={{ width: '100%' }}
          >
            <React.Fragment>
              <FormControl component="fieldset">
                <FormLabel component="legend">Reference</FormLabel>
                <FormGroup row>
                  <Grid item className={classes.separator}>
                    <PositionsSelectField />
                  </Grid>
                  <Grid item className={classes.separator}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={checkedAllReference} onChange={() => {
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
            </React.Fragment>
          </form>
        )} />
    </Grid>
  )
}

export default compose<any, any, any>(
  connect(
    (state: any) => ({
      checkedNormalization: getNormalization(state),
      checkedAllReference: getShowReferenceForAll(state)
    }),
    { setNormalization, setShowReferenceForAll },
  ),
  withStyles(styles),
)(AdditionalMenu)