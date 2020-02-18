import * as React from 'react'
import { Grid } from '@material-ui/core'
import { setRun } from '../ducks/header/setPaths'
import { connect } from 'react-redux'
import { compose } from 'redux'

interface RunRowProps {
  run: string
  setRun(run: string): void;
}


const RunsRow = (props) => {
  return (
    <React.Component>
      {
        props.runs.map(run =>
          <span
            onClick={() => setRun(run)}
          // style={{ cursor: 'pointer' }} title={'Import version: ' + pathOr('', [run, 'importversion'], runsObject)}
          >
            {run}
          </span>
        )
      }
    </React.Component>
  )
}

export default connect(
  undefined,
  (dispatch: any) => ({
    setRun(run: number) {
      dispatch(setRun(run))
    }
  })
)(RunsRow)