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

interface SearchByDatasetProps {
  classes: any
}

const SearchByDataset = ({ classes }: SearchByDatasetProps) => {
  return (
    <Field
      name="searchField"                >
      {props =>
        <div>
          <TextField
            fullWidth
            name={props.input.name}
            placeholder="Search by Dataset"
            {...props.input}
            {...props.onChange}
            {...props.meta}
          />
        </div>
      }
    </Field>
  )
}

export default withStyles(styles)(SearchByDataset)