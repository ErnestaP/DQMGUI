import * as React from 'react'
import { TableBody } from '@material-ui/core'

import { SampleDataInerface } from '../ducks/header/interfaces'
import RunsRow from './runsRow'

interface SearchResultTableProps {
  samplesGroup: SampleDataInerface[],
  index: number;
}

const SearchResultTableBody = ({ samplesGroup, index }: SearchResultTableProps) => {
  return (
    <TableBody>
      {
        Object.keys(samplesGroup).map((name: string) => {
          return (
            <RunsRow key={name} samplesGroup={samplesGroup} name={name} />
          )
        }
        )
      }
    </TableBody >
  )
}

export default SearchResultTableBody
