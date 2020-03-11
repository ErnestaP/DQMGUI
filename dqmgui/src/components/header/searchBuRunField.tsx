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
    <Field
      name="searchFieldByRun"
      // subscription={{ data: true }}
      placeholder="Search by Run"
      fullWidth
      component={TextField}
    />
  )
}

export default withStyles(styles)(SearchByRun)