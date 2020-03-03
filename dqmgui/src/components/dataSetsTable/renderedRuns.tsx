import * as React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { setPath, setDataset, setRun } from '../ducks/header/setPaths'
import { Route } from 'react-router-dom'
import { make_a_path } from './utils'

interface RenderRows {
  setPath(path: string): void,
  runs: any,
  classes: {
    runs: string
  },
  dataSetName: string,
  set_dataset_and_run(dataset: string, run: string): void,
  setDataset(data_set: string): void,
  setRun(run: string): void,
}

const styles = (theme: any) => ({
  runs: {
    color: 'white',
    background: theme.palette.common.lightGrey,
    borderRadius: '15px',
    display: "flex",
    cursor: 'pointer',
    justifyContent: 'center',
  }
})

const RenderRuns = ({ setPath, runs, dataSetName, classes, setDataset, setRun }: RenderRows) => {
  return (
    <Route render={({ history }) => (
      Object.keys(runs).map(run =>
        <p
          onClick={(e) => {
            setPath(make_a_path(dataSetName, run))
            setDataset(dataSetName)
            setRun(run)
            history.replace(make_a_path(dataSetName, run))
          }}
          className={classes.runs}
          key={run}>
          {run}
        </p>
      )
    )}
    />
  )
}


export default compose(
  connect(
    undefined,
    { setPath, setRun, setDataset }
  ),
  withStyles(styles)
)(RenderRuns)