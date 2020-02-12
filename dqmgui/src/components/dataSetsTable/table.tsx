import * as React from 'react'
import { Table, TableHead, TableCell, TableRow, withStyles } from '@material-ui/core'

import SearchResultTableBody from './body'
import { datasetParts } from '../constants'
import { SampleDataInerface } from '../ducks/header/interfaces'
import { typesTranlsation } from '../../translation/typesTranslation'

interface SearchResultTableProps {
  samplesGroup: SampleDataInerface;
  classes: any;
}

const styles = (theme) => ({
  header: {
    background: theme.palette.secondary.light
  },
})

const SearchResultTable = ({ samplesGroup, classes }: SearchResultTableProps) => {
  return (<Table className={classes.table}>
    <TableHead>
      <TableRow className={classes.header}>
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

export default withStyles(styles)(SearchResultTable)