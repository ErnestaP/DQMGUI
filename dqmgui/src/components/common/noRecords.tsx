import * as React from 'react'
import { Typography, withStyles, Table, TableCell, TableRow, TableHead, TableBody } from '@material-ui/core'

interface NotFoundInterface {
  isFetching: boolean,
  classes: {
    noRecords: string
  }
}

const styles = (theme: any) => ({
  noRecords: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const NoRecords = ({ classes }: NotFoundInterface) => {
  return (
    <Table>
      <TableHead />
      <TableBody>
        <TableRow>
          <TableCell className={classes.noRecords}>
            <Typography>
              No Records Found
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
export default withStyles(styles)(NoRecords)
