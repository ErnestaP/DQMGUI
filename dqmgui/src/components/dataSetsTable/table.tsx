import * as React from 'react'
import { Table, TableHead, TableCell, TableRow, withStyles, Typography, Theme } from '@material-ui/core'
import { pathOr } from 'ramda'

import SearchResultTableBody from './body'
import { datasetParts } from '../constants'
import { SampleDataInerface } from '../ducks/header/interfaces'
import { typesTranlsation } from '../../translation/typesTranslation'
import { getSelectedDataSet } from '../ducks/table/selectedDataSet'
import { compose } from 'redux'
import { connect } from 'react-redux'

interface SearchResultTableProps {
  samplesGroup: SampleDataInerface;
  classes: any;
}

const styles: any = (theme: Theme) => ({
  header: {
    background: theme.palette.secondary.light,
    padding: '8px !important'
  },
  dataSetPartsWrapper: {
    width: '100%',
    fontFamily: 'Raleway, sans-serif'
  },
  type: {
    fontWeight: 'bold',
    fontSize: '0.725rem',
  },
})

const SearchResultTable = ({ classes,selectedDataSet,...props }: SearchResultTableProps) => {
  return (<Table>
    <TableHead>
      <TableRow className={classes.header}>
        <TableCell >
          <Typography className={classes.type}>
            {typesTranlsation(pathOr('', ['samplesGroup', 'type'], props))}
          </Typography>
        </TableCell>
        <TableCell />
      </TableRow>
      <TableRow hover={true}>
        {datasetParts.map((part: string) =>
          <TableCell
            key={part}
            className={classes.dataSetPartsWrapper}>
            {part}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
    <SearchResultTableBody
      samplesGroup={pathOr([], ['samplesGroup', 'items'], props)}
    >
{

}
    </SearchResultTableBody>
  </Table>
  )
}

export default compose(
  connect(
    (state: any) => ({
      selectedDataSet: getSelectedDataSet(state),
    }),
    undefined
  ), withStyles(styles)
)(SearchResultTable)