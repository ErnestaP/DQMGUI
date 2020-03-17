import * as React from 'react'
import { Input, TableRow, TableCell, Icon, IconButton, Grid, withStyles, LinearProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { v4 as uuidv4 } from 'uuid';
import { Field } from 'react-final-form';

import TextField from '../../../common/textField'
import CheckBox from '../../../common/checkBox'
import { connect } from 'react-redux';
import { compose, path, pathOr } from 'ramda';
import { deleteDataForOverlay, getDataForOverlay } from '../../../ducks/plots/reference';

const isItChecked = (rowId, dataForOverlay) => dataForOverlay.find(data => {
  if (pathOr('', ['id'], data) === rowId) {
    return pathOr('', ['selected'], data)
  }
  return false
})

interface ReferenceTableRowProps {
  classes: {
    noPadding: string,
  },
  selectedDataset: string;
  deleteDataForOverlay(data: any): any
}

const styles = (theme: any) => ({
  noPadding: {
    padding: 0
  },
})

const generateId = () => uuidv4()

class ReferenceTableRow extends React.Component<ReferenceTableRowProps> {

  state = ({
    rows: [1],
    checked: [],
  })

  addRow = (id) => {
    let copy = [...this.state.rows]
    copy.push(id)
    this.setState({
      rows: copy
    })
  }

  removeRow = (id: string) => {
    let copy = [...this.state.rows]
    const filtered = copy.filter(rowID => rowID !== id)
    this.setState({
      rows: filtered
    })
  }

  render() {
    const { classes, deleteDataForOverlay, dataForOverlay } = this.props;

    return (
      <React.Fragment>
        {this.state.rows.map((row, index) =>
          <TableRow key={row}>
            <TableCell className={classes.noPadding}>
              <Grid item>
                <Field
                  name={`selected_${row}`}
                  component={CheckBox}
                  type="checkbox"
                  // onChange= {{}}
                  // checkboxProps={{
                  //   checked: isItChecked(row, dataForOverlay)
                  // }}
                />
              </Grid>
            </TableCell>
            <TableCell className={classes.noPadding}>
              <Field
                name={`run_${row}`}
                component={TextField}
              />
            </TableCell>
            <TableCell className={classes.noPadding}>
              <Field
                name={`dataset_${row}`}
                component={TextField}
              />
            </TableCell>
            <TableCell className={classes.noPadding}>
              <Field
                name={`label_${row}`}
                component={TextField}
              />
            </TableCell>
            <TableCell className={classes.noPadding}>
              <IconButton onClick={() => {
                this.removeRow(row)
                deleteDataForOverlay(row)
              }}>
                <Icon>
                  <RemoveIcon />
                </Icon>
              </IconButton>
            </TableCell>
          </TableRow>)
        }
        <IconButton onClick={() => {
          const id = generateId()
          this.addRow(id)
        }}>
          <Icon>
            <AddIcon />
          </Icon>
        </IconButton>
      </React.Fragment >
    )
  }
}

export default compose(
  connect(
    (state: any) => ({
      dataForOverlay: getDataForOverlay(state)
    }),
    (dispatch: any) => ({
      deleteDataForOverlay(id) {
        dispatch(deleteDataForOverlay(id))
      }
    })
  ),
  withStyles(styles))
  (ReferenceTableRow)


