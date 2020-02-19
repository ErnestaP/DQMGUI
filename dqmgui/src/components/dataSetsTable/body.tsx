import * as React from 'react'
import { TableBody, TableRow, TableCell, Grid, withStyles, Button } from '@material-ui/core'

import { compose, findIndex, append } from 'ramda'
import { SampleDataInerface } from '../ducks/header/interfaces'
import RunsAmountButton from './runsAmountButton'
import RunsRow from './runsRow'
import { connect } from 'react-redux'

import { setSelectedDataSet, getSelectedDataSet } from "../ducks/table/selectedDataSet"
import { setDataSet, setRun } from "../ducks/header/setPaths"
import Runs from './runs'

interface SearchResultTableProps {
  samplesGroup: SampleDataInerface,
  classes: any,
  toggleDialog(value: boolean): void;
  selectedDataSet: string | null;
  setSelectedDataSet(dataSet: string): void;
  setRun(run: number): void;
}

const styles: any = (theme) => ({
  chip: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.grey[500],
      color: theme.palette.common.white
    }
  },
  buttons: {
    fontSize: '0.725rem',
    height: 'fit-content',
    '&:hover': {
      background: theme.palette.secondary.dark,
      color: theme.palette.common.white
    }
  },
  clicked: {
    fontWeight: 'bold'
  },
  dataSetCell: {
    width: '100%',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.725rem',
    height: 'fit-content',
    padding: '8px !important'
  },
  cellWrapper: {
    paddingBottom: 4
  },
  chipSeparator: {
    padding: 4,
  },
  
  gridContainer:{
    display: 'grid',
    gridTemplateColumns: '',
    gridGap: 2,
    padding: 10,
  }
})

class SearchResultTableBody extends React.Component<SearchResultTableProps> {
  state = ({
    name: ''
  })

  setName(name) {
    this.setState({
      name: name
    });
  }

  render() {
    const { samplesGroup, classes, setSelectedDataSet, setRun } = this.props

    return (
      <TableBody>
        {
          Object.keys(samplesGroup).map((name: string) => {
            const runs = Object.keys(samplesGroup[name].runs)
            return (
              <React.Fragment key={name}>
                <TableRow >
                  <TableCell className={classes.dataSetCell} >
                    <Grid
                      item>
                      {name}
                    </Grid>
                    <Grid item id={name} className="grid-container">

                    </Grid>
                  </TableCell>
                  <TableCell>
                    <div className="runButton" 
                      onClick={(e) => {
                        setSelectedDataSet(name)
                        let cell = document.getElementById(name)
                        const runDiv = document.createElement("DIV")
                        runDiv.style.padding="4px"
                        runDiv.style.width="fit-content"

                        const btn = document.createElement("BUTTON")
                        btn.innerHTML = "^"
                        btn.onclick = () => {
                          while (cell?.firstChild) {
                            cell.removeChild(cell.firstChild)
                          }
                        }
                        cell?.appendChild(btn)
                        runs.map(run => {
                          runDiv.innerHTML = run
                          cell?.appendChild(runDiv.cloneNode(true))
                        })
                      }}
                    >
                      {runs.length}
                    </div>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            )
          }
          )
        }
      </TableBody >
    )
  }
}

export default compose(
  connect(
    undefined,
    (dispatch: any) => ({
      setSelectedDataSet(dataSet: string) {
        dispatch(setSelectedDataSet(dataSet))
        dispatch(setDataSet(dataSet))
      },
      setRun(run) {
        dispatch(setRun(run))
      }
    }),
  ),
  withStyles(styles)
)(SearchResultTableBody)
