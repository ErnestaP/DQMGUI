import * as React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { setRun } from '../ducks/header/setPaths'

interface RenderRows {
  runs: any
  classes: {
    runs: string
  },
  setRun(run: string): void,
}

const styles = () => ({
  runs: {
    color: 'white',
    background: 'grey',
    borderRadius: '15px',
    display: "flex",
    cursor: 'pointer',
    justifyContent: 'center',
  }
})

const RenderRuns = ({ runs, classes, setRun }: RenderRows) =>
  <>
    {Object.keys(runs).map(run =>
      <p
        onClick={(e) => setRun(run)}
        className={classes.runs}
        key={run}>
        {run}
      </p>
    )}
  </>

export default compose(
  connect(
    undefined,
    { setRun }
  ),
  withStyles(styles)
)(RenderRuns)