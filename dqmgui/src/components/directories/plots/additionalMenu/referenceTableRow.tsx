import * as React from 'react'
import { TableRow, TableCell, Grid, withStyles } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { Field } from 'react-final-form';
import { FormControl, Input, FormHelperText } from "@material-ui/core";

import TextField from '../../../common/textField'
import CheckBox from '../../../common/checkBox'
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { deleteDataForOverlay, getDataForOverlay, toggleCheckbox, setDataForOverlay } from '../../../ducks/plots/reference';

const isItChecked = (rowId, dataForOverlay) => {
  const findSelectedRow = dataForOverlay[rowId]['selected']

  if (findSelectedRow) {
    return findSelectedRow
  }
  return false
}

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

class ReferenceTableRow extends React.Component<ReferenceTableRowProps> {

  state = ({
    rows: [1, 2, 3, 4],
    checked: [],
  })

  render() {
    const { classes, dataForOverlay, toggleCheckbox } = this.props;

    return (
      <React.Fragment>
        {this.state.rows.map((row, index) => {

          return (
            <TableRow key={row}>
              <TableCell className={classes.noPadding}>
                <Grid item>
                  <Field
                    name={`selected_${row}`}
                    component={CheckBox}
                    type="checkbox"
                    onChange={(e) => toggleCheckbox(row, e.target.checked)}
                    checkboxProps={{
                      checked: isItChecked(row, dataForOverlay)
                    }}
                  />
                </Grid>
              </TableCell>
              <TableCell className={classes.noPadding}>
                <Field
                  name={`run_${row}`}
                >
                  {props =>
                    <div>
                      <TextField
                        name={props.input.name}
                        {...props.input}
                        {...props.onChange}
                        {...props.meta}
                      />
                    </div>
                  }
                </Field>
              </TableCell>
              <TableCell className={classes.noPadding}>
                <Field
                  name={`dataset_${row}`}
                >
                  {props =>
                    <div>
                      <TextField
                        name={props.input.name}
                        {...props.input}
                        {...props.onChange}
                        {...props.meta}
                      />
                    </div>
                  }
                </Field>
              </TableCell>
              <TableCell className={classes.noPadding}>
                <Field
                  name={`label_${row}`}
                >
                  {props =>
                    <div>
                      <TextField
                        name={props.input.name}
                        {...props.input}
                        {...props.onChange}
                        {...props.meta}
                      />
                    </div>
                  }
                </Field>
              </TableCell>
            </TableRow>)
        })
        }
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
      },
      toggleCheckbox(id: string, value: boolean) {
        dispatch(toggleCheckbox(id, value))
      },
      setDataForOverlay(data: any, id: string) {
        dispatch(setDataForOverlay(data, id))
      }
    })
  ),
  withStyles(styles))
  (ReferenceTableRow)


