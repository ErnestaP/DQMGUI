import * as React from 'react'
import { TableBody, TableRow, TableCell, Button, Chip, Grid, Tooltip, Fab, withStyles } from '@material-ui/core'

import { getSamples } from '../ducks/header/fetchSamplesByDataset'
import { compose, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { SampleDataInerface } from '../ducks/header/interfaces'

interface SearchResultTableProps {
  samplesGroup: SampleDataInerface,
  isOpen: boolean,
  toggleDialog(value: boolean): void;
}

const styles = (theme) => ({
  chip: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.grey[500],
      color: theme.palette.common.white
    }
  },
  buttons: {
    background: theme.palette.secondary.light,
    '&:hover': {
      background: theme.palette.secondary.dark,
      color: theme.palette.common.white
    }
  },
  clicked: {
    fontWeight: 'bold'
  }
})

class SearchResultTableBody extends React.Component<SearchResultTableProps>{
  state = ({
    clickedDataSet: null
  })

  setClickedDataSet = (name: string) => (
    this.setState({
      clickedDataSet: name
    })
  )

  render() {
    const { samplesGroup, isOpen, setDialogContent, toggleDialog, classes } = this.props
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
                  <TableCell style={{width: '100%', borderRight: '1px solid lightgrey'}}>
                    <Grid
                      style={{ paddingBottom: 4 }}
                      className={this.state.clickedDataSet === name && classes.clicked}
                      item>
                      {name}
                    </Grid>
                    {this.state.clickedDataSet === name &&
                      <Grid container item xs={12}>
                        {
                          runs.map(run => (
                            <Grid style={{ padding: 4 }} item key={run}>
                              <Tooltip title={'Import version: ' + pathOr('', [run, 'importversion'], runsObject)} aria-label="add">
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
      </TableBody>
    )
  }
}

export default compose(
  connect(
    (state: any) => ({
      samples: getSamples(state),
    }),
    undefined,
  ),
  withStyles(styles)
)(SearchResultTableBody)