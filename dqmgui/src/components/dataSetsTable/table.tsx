import * as React from 'react'
import { Table, TableHead, TableCell, TableRow } from '@material-ui/core'

import SearchResultTableBody from './body'
import { datasetParts } from '../constants'
import { SampleDataInerface } from '../ducks/header/interfaces'
import { typesTranlsation } from '../../translation/typesTranslation'

interface SearchResultTableProps {
  samplesGroup: SampleDataInerface;
}

const SearchResultTable = ({ samplesGroup }: SearchResultTableProps) => {
  return (<Table>
    <TableHead>
      <TableRow style={{ background: 'green' }}>
        <TableCell>
          {typesTranlsation(samplesGroup.type)}
        </TableCell>
        <TableCell />
      </TableRow>
      <TableRow>
        {datasetParts.map((part: string) =>
          <TableCell key={part}> {part}</TableCell>
        )}
      </TableRow>
    </TableHead>
    <SearchResultTableBody samplesGroup={samplesGroup} />
  </Table>
  )
}

export default SearchResultTable