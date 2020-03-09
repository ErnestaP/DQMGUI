import * as React from 'react'
import { Input, TableRow, TableCell, Icon, IconButton, Checkbox, Grid, withStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { v4 as uuidv4 } from 'uuid';

import { ReferenceRowInterface } from 'src/components/ducks/header/interfaces'

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
  })

  addRow = (row: ReferenceRowInterface) => {
    const copy = [...this.state.rows]
    copy.push(row)
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
    let copy = [...this.state.rows]
    copy = copy.filter(item => item.id !== id)
    this.setState({
      rows: copy
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.state.rows.map((row, index) =>
          <TableRow>
            <TableCell className={classes.noPadding}>
              <Grid item>
                <Checkbox checked={true} onChange={() => {
                  { }
                }}
                />
              </Grid>
            </TableCell>
            <TableCell className={classes.noPadding}>
              <Input />
            </TableCell>
            <TableCell className={classes.noPadding}>
              <Input />
            </TableCell>
            <TableCell className={classes.noPadding}>
              <Input />
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
          setTimeout(() => this.addRow({ id: generateId(), run: '', dataset: '', label: '' }), 10);
        }}>
          <Icon>
            <AddIcon />
          </Icon>
        </IconButton>
      </React.Fragment >
    )
  }
}

export default withStyles(styles)(ReferenceTableRow)