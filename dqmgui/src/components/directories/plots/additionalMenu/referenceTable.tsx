import * as React from 'react';
import { Table, Grid, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Form, FormSpy } from 'react-final-form';

import ReferenceTableRow from './referenceTableRow'
import { connect } from 'react-redux';
import { setDataForOverlay, getDataForOverlay } from '../../../ducks/plots/reference';
import { formatDataForValidate, formInitialValues } from '../../../utils'
import { referenceTableFieldNamesParts } from '../../../constants'

interface ReferenceTableProps {
  setDataForOverlay(data: any): void;
}

class ReferenceTable extends React.Component<ReferenceTableProps> {
  state = {
    initialValues: {}
  }

  setInitialValues = (initialValues) => {
    this.setState({
      initialValues: initialValues
    })
  }

  render() {
    const { setDataForOverlay } = this.props

    return (
      <Form
        onSubmit={() => { }}
        initialValues={formInitialValues(this.props.dataForOverlay)}
        // validate={values =>{
        //   console.log(formatDataForValidate(values))
        // }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}
            id='viewDetailsMenu'
            style={{ width: '100%' }}
          >
            <FormSpy subscription={{ values: true }}
              onChange={(e) => {
                console.log(e)
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
                </TableRow>
                <ReferenceTableRow />
              </Table>
            </Grid>
          </form>
        )} />
    )
  }
}
export default connect(
  (state: any) => ({
    dataForOverlay: getDataForOverlay(state)
  }),
  (dispatch => ({
    setDataForOverlay(data) {
      dispatch(setDataForOverlay(data))
    }
  }))
)(ReferenceTable)