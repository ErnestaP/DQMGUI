import * as React from 'react'
import { Grid, TableRow, TableCell } from '@material-ui/core'
import { setRun } from '../ducks/header/setPaths'
import { connect } from 'react-redux'
import { compose } from 'redux'

interface RunRowsProps {
  samplesGroup: any
  name: string
}

const renderRuns = (runs: string) => {
  console.log('called')
  return Object.keys(runs).map(run => {
    return <p key={run}>{run}</p>
  })
}

export const RunsRow = ({ samplesGroup, name }: RunRowsProps) => {
  const [dataSetName, setName] = React.useState()
  console.log(samplesGroup)
  return (
    <TableRow >
      <TableCell>
        <Grid
          item>
          {name}
        </Grid>
        <Grid item id={name} className="grid-container">
          {dataSetName === name && renderRuns(samplesGroup[name].runs)}
        </Grid>
      </TableCell>
      <TableCell>
        <div className="runButton"
          onClick={(e) => {
            name === dataSetName ?
              setName('')
              :
              setName(name)
          }}
        >
          {/* {runs_length} */}
          hellooo
      </div>
      </TableCell>
    </TableRow>
  )
}