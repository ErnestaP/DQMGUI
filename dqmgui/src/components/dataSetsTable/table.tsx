import * as React from 'react'
import { Table, TableHead, TableCell, TableRow, Grid } from '@material-ui/core'
import { pathOr } from 'ramda'

import SearchResultTableBody from './body'
import { datasetParts } from '../constants'
import { SampleDataInerface } from '../ducks/header/interfaces'
import { typesTranlsation } from '../../translation/typesTranslation'

interface SearchResultTableProps {
  samplesGroup?: SampleDataInerface;
}

export const SearchResultTable = ({ samplesGroup }: SearchResultTableProps) =>
  <Grid item>
    <Table>
      <TableHead>
        <TableRow style={{background: 'lightgrey'}}>
          <TableCell>
            {typesTranlsation(pathOr('', ['type'], samplesGroup))}
          </TableCell>
          <TableCell />
        </TableRow>
        {/* <TableRow hover={true}>
          {datasetParts.map((part: string) =>
            <TableCell
              key={part}>
              {part}
            </TableCell>
          )}
        </TableRow> */}
      </TableHead>
      <SearchResultTableBody
        samplesGroup={pathOr([], ['items'], samplesGroup)}
      />
    </Table>
  </Grid>


export default SearchResultTable