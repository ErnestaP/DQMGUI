import * as React from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'

import { getDataSet } from '../ducks/header/setPaths'

export const Runs = (props) => {
    return (<Grid container spacing={2}>
      {props.runs.map(
        (run: string) => <Grid item>
          {run}
        </Grid>
      )}
    </Grid>)
}

