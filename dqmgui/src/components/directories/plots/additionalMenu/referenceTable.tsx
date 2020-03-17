import * as React from 'react';
import { Table, Grid, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Form, FormSpy } from 'react-final-form';

import ReferenceTableRow from './referenceTableRow'
import { connect } from 'react-redux';
import { setDataForOverlay } from '../../../ducks/plots/reference';

interface ReferenceTableProps {
  setDataForOverlay(data: any): void;
}

const ReferenceTable = ({ selectAll, setDataForOverlay, ...props }: ReferenceTableProps) => {

  return (
    <Form
      onSubmit={() => { }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}
          id='viewDetailsMenu'
          style={{ width: '100%' }}
        >
          <FormSpy subscription={{ values: true }}
            onChange={(e) => {
              setDataForOverlay(e.values)
              }} />
          <Grid item xs={12} container>
            <Table>
              <TableRow>
                <TableCell>
                  Selected
              </TableCell>
                <TableCell>
                  Run
              </TableCell>
                <TableCell>
                  Dataset
              </TableCell>
                <TableCell>
                  Label
              </TableCell>
                <TableCell>
                  Actions
              </TableCell>
              </TableRow>
              <ReferenceTableRow selectAll={selectAll} />
            </Table>
          </Grid>
        </form>
      )} />
  )
}

export default connect(
  undefined,
  (dispatch => ({
    setDataForOverlay(data) {
      dispatch(setDataForOverlay(data))
    }
  }))
)(ReferenceTable)