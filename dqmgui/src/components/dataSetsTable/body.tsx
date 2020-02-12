import * as React from 'react'
import { TableBody, TableRow, TableCell, Button } from '@material-ui/core'

import { getSamples } from '../ducks/header/fetchSamplesByDataset'
import { compose } from 'ramda'
import { connect } from 'react-redux'

const SearchResultTableBody = ({ samplesGroup, ...props }) => {
  const dataSetNames = Object.keys(samplesGroup.items)
  return (
    <TableBody>
      {
        dataSetNames.map((name: string) =>
          <TableRow key={name}>
            <TableCell>
              {name}
            </TableCell>
            <TableCell>
              <Button variant="outlined">
                Runs
              </Button>
            </TableCell>
          </TableRow>
        )
      }
    </TableBody>
  )
}

export default compose(
  connect(
    (state: any) => ({
      samples: getSamples(state)
    }),
    undefined
  )
)(SearchResultTableBody)