import * as React from 'react'
import { Table, TableHead, TableCell, TableRow, withStyles, Typography } from '@material-ui/core'
import { pathOr } from 'ramda'

import SearchResultTableBody from './body'
import { datasetParts } from '../constants'
import { SampleDataInerface } from '../ducks/header/interfaces'
import { typesTranlsation } from '../../translation/typesTranslation'

interface SearchResultTableProps {
  samplesGroup: SampleDataInerface;
  classes: any;
}

const styles = (theme: any) => ({
  header: {
    background: theme.palette.secondary.light
  },
})

const SearchResultTable = ({ classes, ...props }: SearchResultTableProps) => {
  return (<Table className={classes.table}>
    <TableHead>
      <TableRow className={classes.header}>
        <TableCell >
          <Typography style={{ fontWeight: 'bold' }}>
            {typesTranlsation(pathOr('', ['samplesGroup', 'type'], props))}
          </Typography>
        </TableCell>
        <TableCell />
      </TableRow>
      <TableRow hover={true}>
        {datasetParts.map((part: string) =>
          <TableCell key={part} style={{ width: '100%', borderLeft: '1px solid lightgrey' }}> {part}</TableCell>
        )}
      </TableRow>
    </TableHead>
    <SearchResultTableBody
      samplesGroup={pathOr([], ['samplesGroup', 'items'], props)}
    />
  </Table>
  )
}

export default withStyles(styles)(SearchResultTable)