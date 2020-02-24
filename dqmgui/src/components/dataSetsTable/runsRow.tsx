import * as React from 'react'
import { Grid, TableRow, TableCell } from '@material-ui/core'

interface RunRowsProps {
  samplesGroup: any
  name: string
}

const renderRuns = (runs: string) => {
  return Object.keys(runs).map(run => {
    return <p style={{
      color: 'white',
      background: 'grey',
      borderRadius: '15px',
      display: "flex",
      justifyContent: 'center'
    }} key={run}>{run}</p>
  })
}

const runs_length = (runs: any[]) => Object.keys(runs).length

const RunsRow = ({ samplesGroup, name }: RunRowsProps) => {
  const [dataSetName, setName] = React.useState()

  return (
    <TableRow >
      <TableCell>
        <Grid item>
          {name}
        </Grid>
        <Grid item id={name} className="grid-container">
          {dataSetName === name && renderRuns(samplesGroup[name].runs)}
        </Grid>
      </TableCell>
      <TableCell>
        <div className="runButton"
          onClick={(e) => {
            dataSetName === name ?
              setName('')
              :
              setName(name)
          }}
        >
          {runs_length(samplesGroup[name].runs)}
        </div>
      </TableCell>
    </TableRow>
  )
}

export default RunsRow
