import * as React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { compose } from 'ramda';
import { connect } from 'react-redux'

import { pseudoRuns } from '../pseudoFields'
import { setRun } from '../ducks/header/setActiveTabs'

interface RunsProps {
  setRun(type: string): void;
}

const Runs = ({ setRun, ...props }: RunsProps) => {
  const runsValues = Object.values(pseudoRuns)

  return (
    <Grid>
      {runsValues.map((run: any) =>
        <Grid key={run} onClick={() => setRun(run)} >
          {run}
        </Grid>
      )}
    </Grid>
  );
}

export default compose(
  connect(
    undefined,
    (dispatch: any) => ({
      setRun(type: string) {
        dispatch(setRun(type))
      }
    })
  )
)(Runs)