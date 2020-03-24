import * as React from 'react'
import { TableRow, TableCell, Grid, withStyles, TableBody, Checkbox } from '@material-ui/core';
import { Field } from 'react-final-form';

import TextField from '../../../common/textField'
import CheckBox from '../../../common/checkBox'
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { deleteDataForOverlay, getDataForOverlay, setDataForOverlay } from '../../../ducks/plots/reference';

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

  setChecked = (checked: string) => {
    const copy = [...this.state.checked]
    copy.push(checked)
    this.setState({
      checked: copy
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <TableBody>
        {this.state.rows.map((row, index) => {

          return (
            <TableRow key={row}>
              <TableCell className={classes.noPadding}>
                <Grid item>
                  <Field
                    name={`selected_${row}`}
                    component={CheckBox}
                    type="checkbox"
                  />
                </Grid>
              </TableCell>
              <TableCell className={classes.noPadding}>
                <Field
                  name={`run_${row}`}
                  required
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
      </TableBody>
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
      setDataForOverlay(data: any, id: string) {
        dispatch(setDataForOverlay(data, id))
      }
    })
  ),
  withStyles(styles))
  (ReferenceTableRow)


