import * as React from 'react'
import { Field } from 'react-final-form'
import { Grid, withStyles } from '@material-ui/core';

import TextField from '../common/textField'
import { mustBeMoreThan } from '../common/validation';

const styles = (theme: any) => ({
  searchFields: {
    padding: '0px !important',
    paddingRight: '8px !important'
  },
})

interface SearchByDatasetProps {
  classes: any
}

const SearchByDataset = ({classes}: SearchByDatasetProps) => {
  return (
    <Grid item xs={2} className={classes.searchFields}>
      <Field
        name="searchField"
        placeholder="Search by Data set"
        fullWidth
        component={TextField}
        validate={mustBeMoreThan(3)}
      />
    </Grid>
  )
}

export default withStyles(styles)(SearchByDataset)