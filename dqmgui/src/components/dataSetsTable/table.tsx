import * as React from 'react'
import { Table, TableHead, TableCell, TableRow } from '@material-ui/core'

import { datasetParts } from '../constants'
const SearchResultTable = () => (
  <Table>
    <TableHead>
      <TableRow>
        {datasetParts.map((part: string) =>
          <TableCell key={part}> {part}</TableCell>
        )}
      </TableRow>
    </TableHead>
  </Table>
)

export default SearchResultTable