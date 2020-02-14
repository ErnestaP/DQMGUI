import * as React from 'react'
import { TableBody, TableRow, TableCell, Button, Chip, Grid, Tooltip, props, withStyles } from '@material-ui/core'

import { getSamples } from '../ducks/header/fetchSamplesByDataset'
import { compose, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { SampleDataInerface } from '../ducks/header/interfaces'

interface SearchResultTableProps {
  samplesGroup: SampleDataInerface,
  classes: any,
  toggleDialog(value: boolean): void;
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

class SearchResultTableBody extends React.Component<SearchResultTableProps>{
  state = ({
    clickedDataSet: null
  })

  setClickedDataSet = (name: string | null) => (
    this.setState({
      clickedDataSet: name
    })
  )

  render() {
    const { samplesGroup, classes } = this.props
    const dataSetNames = Object.keys(samplesGroup)

    return (
      <TableBody>
        {
          dataSetNames.map((name: string) => {
            const runs = samplesGroup && Object.keys(pathOr([], [name, 'runs',], samplesGroup))
            const runsObject = samplesGroup && (pathOr([], [name, 'runs',], samplesGroup))
            return (
              <React.Fragment key={name}>
                <TableRow >
                  <TableCell className={classes.dataSetCell}>
                    <Grid
                      className={`${this.state.clickedDataSet === name && classes.clicked}${classes.cellWrapper}`}
                      item>
                      {name}
                    </Grid>
                    {this.state.clickedDataSet === name &&
                      <Grid container item xs={12}>
                        {
                          runs.map(run => (
                            <Grid className={classes.chipSeparator} item key={run}>
                              <Tooltip
                                title={'Import version: ' + pathOr('', [run, 'importversion'], runsObject)}
                                aria-label="Import version">
                                <Chip
                                  key={run}
                                  label={run}
                                  className={classes.chip}
                                />
                              </Tooltip>
                            </Grid>
                          ))
                        }
                      </Grid>}
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined"
                      className={classes.buttons}
                      onClick={() => {
                        this.state.clickedDataSet === name ?
                          this.setClickedDataSet(null) :
                          this.setClickedDataSet(name)
                      }}>
                      {runs.length}
                    </Button>
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

export default compose<any, any, any>(
  connect(
    (state: any) => ({
      samples: getSamples(state),
    }),
    undefined,
  ),
  withStyles(styles)
)(SearchResultTableBody)