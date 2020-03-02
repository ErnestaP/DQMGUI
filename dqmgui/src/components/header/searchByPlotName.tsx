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

interface SearchByPlotByNameProps {
  classes: any
}

const SearchByPlotByName = ({ classes }: SearchByPlotByNameProps) => {
  return (
    <Field
      name="searchFieldByPlotName"
      placeholder="Search by Plot name"
      fullWidth
      component={TextField}
    />
  )
}

export default withStyles(styles)(SearchByPlotByName)