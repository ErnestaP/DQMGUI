import * as React from 'react'
import { Grid, TableRow, TableCell } from '@material-ui/core'

import RenderRuns from './renderedRuns'

interface RunRowsProps {
  samplesGroup: any
  name: string
}

const runs_length = (runs: any[]) => Object.keys(runs).length

const setToLocalStorage = (datasetName: string) =>
  localStorage.setItem("dataSetName", datasetName)

const getFromLocalStorage = () =>
  localStorage.getItem("dataSetName")

class RunsRow extends React.Component<RunRowsProps>{
  update() {
    this.forceUpdate()
  }

  componentWillUnmount() {
    localStorage.clear();
  }

  componentWillMount() {
    localStorage.clear();
  }

  render() {
    const { samplesGroup, name, setDataset, dataSet } = this.props
    let dataSetName = getFromLocalStorage()

    return (
      <TableRow >
        <TableCell>
          {name}
          <Grid item id={name} className="grid-container">
            {dataSetName === name &&
              <RenderRuns
                dataSetName={dataSetName}
                runs={samplesGroup[name].runs}
              />
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
              if (dataSetName) {
                localStorage.clear()
                this.update()
              }
              if (dataSetName !== name) {
                setToLocalStorage(name)
                this.update()
              }
            }}
          >
            {runs_length(samplesGroup[name].runs)}
          </div>
        </TableCell>
      </TableRow >
    )
  }
}

export default RunsRow