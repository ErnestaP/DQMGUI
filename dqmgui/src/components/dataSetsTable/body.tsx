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
            <React.Fragment key={name}>
              <RunsRow samplesGroup={samplesGroup} name={name} index={index}/>
            </React.Fragment>
          )
        }
        )
      }
    </TableBody >
  )
}

export default SearchResultTableBody
