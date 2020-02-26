import * as React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { setPath } from '../ducks/header/setPaths'
import { Route } from 'react-router-dom'

interface RenderRows {
  setPath(path: string): void,
  runs: any,
  classes: {
    runs: string
  },
  dataSetName: string
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


const make_a_path = (dataset: string, run: string) => [dataset, run].join('/')

const RenderRuns = ({ setPath, runs, dataSetName, classes }: RenderRows) => {
  return (
    <Route render={({ history }) => (
      Object.keys(runs).map(run =>
        <p
          onClick={(e) => {
            setPath(make_a_path(dataSetName, run))
            history.replace(make_a_path(dataSetName, run))
            console.log(make_a_path(dataSetName, run))
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
    { setPath }
  ),
  withStyles(styles)
)(RenderRuns)