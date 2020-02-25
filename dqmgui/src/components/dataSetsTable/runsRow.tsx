import * as React from 'react'
import { Grid, TableRow, TableCell, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'

import RenderRuns from './renderedRuns'
import { setDataset } from '../ducks/header/setPaths'


interface RunRowsProps {
  samplesGroup: any
  name: string
}

const runs_length = (runs: any[]) => Object.keys(runs).length

const RunsRow = ({ samplesGroup, name, setDataset }: RunRowsProps) => {
  const [dataSetName, setName] = React.useState()

  return (
    <TableRow >
      <TableCell>
        <Grid item>
          {name}
        </Grid>
        <Grid item id={name} className="grid-container">
          {dataSetName === name &&
            <RenderRuns runs={samplesGroup[name].runs} />
          }
        </Grid>
      </TableCell>
      <TableCell>
        <div className="runButton"
          onClick={(e) => {
            setDataset(name)
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

export default connect(
  undefined,
 {setDataset}
)(RunsRow)
