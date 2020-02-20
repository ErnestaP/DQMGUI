import * as React from 'react'
import { TableBody } from '@material-ui/core'

import { SampleDataInerface } from '../ducks/header/interfaces'
import { RunsRow } from './runsRow'

interface SearchResultTableProps {
  samplesGroup: SampleDataInerface[],
}

const SearchResultTableBody = ({ samplesGroup }: SearchResultTableProps) => {
  return (
    <TableBody>
      {
        Object.keys(samplesGroup).map((name: string) => {
          return (
            <React.Fragment key={name}>
              <RunsRow samplesGroup={samplesGroup} name={name} />
            </React.Fragment>
          )
        }
        )
      }
    </TableBody >
  )
}

export default SearchResultTableBody
