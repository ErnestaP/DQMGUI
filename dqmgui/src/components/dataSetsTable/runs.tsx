import * as React from 'react'
import { Grid } from '@material-ui/core'

interface RunsProps {
  runs: string[];
}

export const Runs = ({ runs }: RunsProps) => {
  return (<Grid container spacing={2}>
    {runs.map(
      (run: string) =>
        <Grid item
          key={run}>
          {run}
        </Grid>
    )}
  </Grid>)
}

