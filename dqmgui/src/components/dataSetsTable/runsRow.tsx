import * as React from 'react'
import { Grid, TableRow, TableCell } from '@material-ui/core'

import RenderRuns from './renderedRuns'

interface RunRowsProps {
  samplesGroup: any
  name: string
}

const runs_length = (runs: any[]) => Object.keys(runs).length

const RunsRow = ({ samplesGroup, name }: RunRowsProps) => {
  const [settedDataset, setDataset] = React.useState('')
  return (
    <TableRow >
      <TableCell>
        {name}
        <Grid item id={name} className="grid-container">
          {settedDataset === name &&
            <RenderRuns
              dataSetName={name}
              runs={samplesGroup[name].runs}
            />
          }
        </Grid>
      </TableCell>
      <TableCell>
        <div className="runButton"
          onClick={() => {
            name === settedDataset ?
              setDataset("") :
              setDataset(name)
          }}
        >
          {runs_length(samplesGroup[name].runs)}
        </div>
      </TableCell>
    </TableRow >
  )
}

export default RunsRow