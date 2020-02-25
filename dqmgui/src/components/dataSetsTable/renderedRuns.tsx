import * as React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { setRun, getSelectedPathForApi, changeToDirectoriesRoute, getDataset } from '../ducks/header/setPaths'
import { Route } from 'react-router-dom'

interface RenderRows {
  runs: any
  classes: {
    runs: string
  },
  setRun(run: string): void,
  changeToDirectoriesRoute(): void;
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

const RenderRuns = ({ runs, classes, setRun, pathOfDirectories }: RenderRows) => {
  return (
    <Route render={({ history }) => (
      Object.keys(runs).map(run =>
        <p
          onClick={(e) => {
            setRun(run)
            history.replace("/" + run  + pathOfDirectories)
            console.log("/" + run  + pathOfDirectories +" setting new path to history")
          }}
          className={classes.runs}
          key={run}>
          {run}
        </p>
      )
    )} />)
}

export default compose(
  connect(
    (state: any) => {
      return ({
        pathOfDirectories: getDataset(state),
      })
    },
    { setRun, changeToDirectoriesRoute }
  ),
  withStyles(styles)
)(RenderRuns)