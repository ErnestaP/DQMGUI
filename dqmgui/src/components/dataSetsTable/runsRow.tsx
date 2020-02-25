import * as React from 'react'
import { Grid, TableRow, TableCell, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'

import RenderRuns from './renderedRuns'
import { setDataset, getDataset } from '../ducks/header/setPaths'
import { appendChildren, removeChildren } from './appendingChildren'


interface RunRowsProps {
  samplesGroup: any
  name: string
}

const runs_length = (runs: any[]) => Object.keys(runs).length

const RunsRow = ({ samplesGroup, name, setDataset, dataSet }: RunRowsProps) => {
  const [dataSetName, setName] = React.useState()
  const a = () => { console.log('sss'); return true }
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
            // console.log(document.getElementById(name))
            // if (dataSet) {
            //   removeChildren(dataSet)
            // }
            // if (name !== dataSet) {
            //   appendChildren(name, Object.keys(samplesGroup[name].runs), dataSet)
            // }

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
  // (state: any) => ({
  //   dataSet: getDataset(state)
  // }),
  undefined,
  { setDataset }
)(RunsRow)
