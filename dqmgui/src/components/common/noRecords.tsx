import * as React from 'react'
import { Typography, withStyles, Table, TableCell, TableRow, TableHead, TableBody } from '@material-ui/core'
import { path } from 'ramda'

interface NotFoundInterface {
  classes?: {
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
          <TableCell className={path(['noRecords'], classes)}>
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
