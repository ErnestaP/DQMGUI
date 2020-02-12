import * as React from 'react'
import { TableBody, TableRow, TableCell } from '@material-ui/core'

import { getSamples } from '../ducks/header/fetchSamplesByDataset'
import { compose } from 'ramda'
import { connect } from 'react-redux'

const SearchResultTableBody = () => (
  <TableBody>

  </TableBody>
)

export default compose(
  connect(
    (state: any) => ({
      samples: getSamples(state)
    }),
    undefined
  )
)