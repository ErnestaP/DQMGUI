import * as React from 'react'
import { TableBody, TableRow, TableCell, Grid, withStyles, Button } from '@material-ui/core'

import { compose, pathOr } from 'ramda'
import { SampleDataInerface } from '../ducks/header/interfaces'
import RunsAmountButton from './runsAmountButton'
import RunsRow from './runsRow'
import { connect } from 'react-redux'
import { setRun } from '../ducks/header/setPaths'

import { setSelectedDataSet } from "../ducks/table/selectedDataSet"
import { setDataSet } from "../ducks/header/setPaths"

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
  }
})

const SearchResultTableBody = ({ samplesGroup, classes, selectedDataSet, setSelectedDataSet, setRun }: SearchResultTableProps) => {
  return (
    <TableBody>
      {
        Object.keys(samplesGroup).map((name: string) => {
          // const runs = samplesGroup && Object.keys(pathOr([], [name, 'runs',], samplesGroup))
          // const runsObject = samplesGroup && (pathOr([], [name, 'runs',], samplesGroup))
          return (
            <React.Fragment key={name}>
              <TableRow >
                <TableCell className={classes.dataSetCell} id={name}>
                  <Grid
                    className={`${selectedDataSet === name && classes.clicked}${classes.cellWrapper}`}
                    item>
                    {name}
                  </Grid>
                  {/* {name && <RunsRow
                    runs={Object.keys(samplesGroup[name].runs)}
                  />} */}
                  {/* {selectedDataSet === name &&
                    <Grid container item xs={12}>
                      {
                        runs.map(run => (
                          <Grid className={classes.chipSeparator} item key={run}>
                            <span 
                            onClick={() => setRun(run)}
                            style={{cursor: 'pointer'}}title={'Import version: ' + pathOr('', [run, 'importversion'], runsObject)}>
                              {run}
                            </span>
                          </Grid>
                        ))
                      }
                    </Grid>} */}
                </TableCell>
                <TableCell>
                  {/* <RunsAmountButton
                    name={name}
                    runs={(Object.keys(samplesGroup[name].runs).length)}
                  /> */}
                  <div className="runButton"
                    onClick={(e) => {
                      console.log(e.currentTarget)
                      setSelectedDataSet(name)
                    }}
                  >
                    {(Object.keys(samplesGroup[name].runs).length)}
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

export default compose(
  connect(
    undefined,
    (dispatch: any) => ({
      setSelectedDataSet(dataSet: string) {
        dispatch(setSelectedDataSet(dataSet))
        dispatch(setDataSet(dataSet))
      },
    }),
  ),
  withStyles(styles)
)(SearchResultTableBody)
