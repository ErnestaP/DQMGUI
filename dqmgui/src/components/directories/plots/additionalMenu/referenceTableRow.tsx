import * as React from 'react'
import { Input, TableRow, TableCell, Icon, IconButton, Grid, withStyles, LinearProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { v4 as uuidv4 } from 'uuid';

import { ReferenceRowInterface } from '../../../ducks/header/interfaces'
import { Field } from 'react-final-form';
import TextField from '../../../common/textField'
import CheckBox from '../../../common/checkBox'
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { selectRunsInReference, removeRunsInReference } from '../../../ducks/plots/reference'

interface ReferenceTableRowProps {
  classes: {
    noPadding: string,
  }
}

const styles = (theme) => ({
  noPadding: {
    padding: 0
  },
})

const generateId = () => uuidv4()

class ReferenceTableRow extends React.Component<ReferenceTableRowProps> {
  state = ({
    rows: [{ id: generateId(), run: '', dataset: '', label: '' }],
    checked: [],
  })

  addRow = (row: ReferenceRowInterface) => {
    const copy = [...this.state.rows]
    copy.push(row)
    this.setState({
      rows: copy
    })
  }

  toggleChecking = () => {
    this.setState({
      checked: !this.state.checked,
    })
  }

  setID = () => {
    const id = generateId()
    this.setState({
      id: id
    })
  }

  removeRow = (id: string) => {
    let copy = [...this.state.rows]
    copy = copy.filter(item => item.id !== id)
    this.setState({
      rows: copy
    })
  }

  render() {
    const { classes, selectRunsInReference, removeRunsInReference } = this.props;

    return (
      <React.Fragment>
        {this.state.rows.map((row, index) =>
          <TableRow key={row.id}>
            <TableCell className={classes.noPadding}>
              <Grid item>
                <Field
                  name={`checkBox-${row.id}`}
                  component={CheckBox}
                  checkboxProps={{
                    value: JSON.stringify(row),
                  }}
                  onChange={(e) => {
                    console.log(e.target.checked)
                    if (e.target.checked) {
                      selectRunsInReference(JSON.parse(e.target.value))
                    } else {
                      removeRunsInReference(JSON.parse(e.target.value))
                    }
                  }}
                />
              </Grid>
            </TableCell>
            <TableCell className={classes.noPadding}>
              <Field
                name={`runField-${row.id}`}
                component={TextField}
              />
            </TableCell>
            <TableCell className={classes.noPadding}>
              <Field
                name={`dataset-${row.id}`}
                component={TextField}
              />
            </TableCell>
            <TableCell className={classes.noPadding}>
              <Field
                name={`label-${row.id}`}
                component={TextField}
              />
            </TableCell>
            <TableCell className={classes.noPadding}>
              <IconButton onClick={() =>
                this.removeRow(row.id)}>
                <Icon>
                  <RemoveIcon />
                </Icon>
              </IconButton>
            </TableCell>
          </TableRow>)
        }
        <IconButton onClick={() => {
          this.setID();
          this.addRow({ id: generateId(), run: '', dataset: '', label: '' })
        }}>
          <Icon>
            <AddIcon />
          </Icon>
        </IconButton>
        <LinearProgress />
      </React.Fragment >
    )
  }
}

export default compose<any, any, any>(
  connect(
    undefined,
    (dispatch) => ({
      selectRunsInReference(data) {
        dispatch(selectRunsInReference(data))
      },
      removeRunsInReference(data) {
        dispatch(removeRunsInReference(data))
      }
    })
  ), withStyles(styles)
)(ReferenceTableRow)
