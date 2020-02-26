import * as React from 'react'
import { Table, TableHead, TableCell, TableRow } from '@material-ui/core'
import { pathOr } from 'ramda'

import SearchResultTableBody from './body'
import { datasetParts } from '../constants'
import { SampleDataInerface } from '../ducks/header/interfaces'
import { typesTranlsation } from '../../translation/typesTranslation'

interface SearchResultTableProps {
  samplesGroup?: SampleDataInerface;
}

export const SearchResultTable = ({ samplesGroup }: SearchResultTableProps) =>
  <Table>
    <TableHead>
      <TableRow >
        <TableCell>
          {typesTranlsation(pathOr('', ['type'], samplesGroup))}
        </TableCell>
        <TableCell />
      </TableRow>
      <TableRow hover={true}>
        {datasetParts.map((part: string) =>
          <TableCell
            key={part}>
            {part}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
    <SearchResultTableBody
      samplesGroup={pathOr([], ['items'], samplesGroup)}
    />
  </Table>


export default SearchResultTable