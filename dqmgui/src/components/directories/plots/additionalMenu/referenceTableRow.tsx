import * as React from 'react'
import { Input, TableRow, TableCell, Icon, IconButton, Grid, withStyles, LinearProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { v4 as uuidv4 } from 'uuid';

import { RunInterface } from '../../../ducks/header/interfaces'
import TextField from '../../../common/textField'
import CheckBox from '../../../common/checkBox'
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { selectRunsInReference, removeRunsInReference, setDataForOverlay } from '../../../ducks/plots/reference'
import { getDataset } from '../../../ducks/header/setPaths';

interface ReferenceTableRowProps {
  classes: {
    noPadding: string,
  },
  setDataForOverlay(data: any): void;
  selectedDataset: string;
}

const styles = (theme: any) => ({
  noPadding: {
    padding: 0
  },
})

const generateId = () => uuidv4()

class ReferenceTableRow extends React.Component<ReferenceTableRowProps> {

  state = ({
    rows: { 1: { run: '', dataset: '', label: '' } },
    checked: [],
  })

  addRow = (id, data) => {
    let copy = this.state.rows
    copy[id] = data
    this.setState({
      rows: copy
    })
  }

  setID = () => {
    const id = generateId()
    this.setState({
      id: id
    })
  }

  removeRow = (id: string) => {
    let copy = this.state.rows
    delete copy[id]
    this.setState({
      rows: copy
    })
  }

  setDataset = (id, dataset) => {
    let copy = this.state.rows
    copy[id].dataset = dataset
    this.setState({
      rows: copy
    })
  }

  setRun = (id, run) => {
    let copy = this.state.rows
    copy[id].run = run
    this.setState({
      rows: copy
    })
  }

  setLabel = (id, label) => {
    let copy = this.state.rows
    copy[id].label = label
    this.setState({
      rows: copy
    })
  }

  render() {
    const { classes, setDataForOverlay } = this.props;
    const ids: string[] = Object.keys(this.state.rows)
    setDataForOverlay(this.state.rows)

    return (
      <React.Fragment>
        {ids.map((row, index) =>
          <TableRow key={row}>
            <TableCell className={classes.noPadding}>
              <Grid item>
                <CheckBox onChange={() => { }} />
              </Grid>
            </TableCell>
            <TableCell className={classes.noPadding}>
              <TextField onChange={(e) => { this.setRun(row, e) }} />
            </TableCell>
            <TableCell className={classes.noPadding}>
              <TextField onChange={(e) => { this.setDataset(row, e) }} />
            </TableCell>
            <TableCell className={classes.noPadding}>
              <TextField onChange={(e) => { this.setLabel(row, e) }} />
            </TableCell>
            <TableCell className={classes.noPadding}>
              <IconButton onClick={() =>
                this.removeRow(row)}>
                <Icon>
                  <RemoveIcon />
                </Icon>
              </IconButton>
            </TableCell>
          </TableRow>)
        }
        <IconButton onClick={() => {
          const id = generateId()
          this.setID();
          this.addRow(id, { run: '', dataset: '', label: '' })
        }}>
          <Icon>
            <AddIcon />
          </Icon>
        </IconButton>
      </React.Fragment >
    )
  }
}

export default compose<any, any, any>(
  connect(
    undefined,
    (dispatch) => ({
      selectRunsInReference(data: RunInterface) {
        dispatch(selectRunsInReference(data))
      },
      removeRunsInReference(data: RunInterface) {
        dispatch(removeRunsInReference(data))
      },
      setDataForOverlay(data) {
        dispatch(setDataForOverlay(data))
      }
    })
  ), withStyles(styles)
)(ReferenceTableRow)
