import * as React from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';

import ReferenceTableRow from './referenceTableRow'

interface ReferenceTableProps {

}

export const ReferenceTable = ({ ...props }: ReferenceTableProps) => {
  return (
    <Table>
      <TableRow>
        <TableCell>
          Selected
        </TableCell>
        <TableCell>
          Run
        </TableCell>
        <TableCell>
          Dataset
        </TableCell>
        <TableCell>
          Label
        </TableCell>
        <TableCell>
          Actions
        </TableCell>
      </TableRow>
      <ReferenceTableRow />
    </Table>)
}