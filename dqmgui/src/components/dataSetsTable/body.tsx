import * as React from 'react'
import { TableBody, TableRow, TableCell, Button } from '@material-ui/core'

import { getSamples } from '../ducks/header/fetchSamplesByDataset'
import { compose, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { setDialogContent, setDialogState } from '../ducks/dialog/openClose'

const SearchResultTableBody = ({ samplesGroup, isOpen, setDialogContent, toggleDialog, ...props }) => {
  const dataSetNames = Object.keys(samplesGroup.items)
  return (
    <TableBody>
      {
        dataSetNames.map((name: string) =>
          <TableRow key={name} hover={true}>
            <TableCell>
              {name}
            </TableCell>
            <TableCell>
              <Button variant="outlined" onClick={() => {
                setDialogContent(
                  Object.keys(pathOr([], ['items', name, 'runs',], samplesGroup))
                )
                toggleDialog(true)
              }}>runs</Button>
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
      samples: getSamples(state),
    }),
    (dispatch: any) => ({
      setDialogContent(content: string) {
        dispatch(setDialogContent(content))
      },
      toggleDialog(isOpen: boolean) {
        dispatch(setDialogState(isOpen))
      }
    })
  )
)(SearchResultTableBody)