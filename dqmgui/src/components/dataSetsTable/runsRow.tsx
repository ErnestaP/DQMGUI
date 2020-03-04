import * as React from 'react'
import { Grid, TableRow, TableCell, withStyles } from '@material-ui/core'

import RenderRuns from './renderedRuns'

interface RunRowsProps {
  samplesGroup: any;
  name: string;
  classes: {
    datasetRow: string;
  }
}

const styles = (theme) => ({
  datasetRow: {
    width: '90%'
  },
  clicked: {
    fontWeght: 'bold'
  }
})

const runs_length = (runs: any[]) => Object.keys(runs).length

const RunsRow = ({ samplesGroup, name, classes }: RunRowsProps) => {
  const [settedDataset, setDataset] = React.useState('')

  return (
    <TableRow >
      <TableCell className={`${classes.datasetRow}`}>
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

export default withStyles(styles)(RunsRow)