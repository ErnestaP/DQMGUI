import * as React from 'react'
import { Field } from 'react-final-form'
import { Grid, withStyles } from '@material-ui/core';

import TextField from '../common/textField'

const styles = (theme: any) => ({
  searchFields: {
    padding: '0px !important',
    paddingRight: '8px !important'
  },
})

interface SearchByRunProps {
  classes: any
}

const SearchByRun = ({ classes }: SearchByRunProps) => {
  return (
    <Grid item xs={2} className={classes.searchFields}>
      <Field
        name="searchFieldByRun"
        placeholder="Search by Run"
        fullWidth
        component={TextField}
      />
    </Grid>
  )
}

export default withStyles(styles)(SearchByRun)