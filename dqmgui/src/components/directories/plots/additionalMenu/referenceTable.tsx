import * as React from 'react';
import { Table, Grid, TableCell, TableRow, TableHead } from '@material-ui/core';
import { Form, FormSpy } from 'react-final-form';

import ReferenceTableRow from './referenceTableRow'
import { connect } from 'react-redux';
import { setDataForOverlay, getDataForOverlay } from '../../../ducks/plots/reference';
import { formatDataForValidate, formInitialValues } from '../../../utils'
import { referenceTableFieldNamesParts } from '../../../constants'
import { assoc, isEmpty } from 'ramda';

interface ReferenceTableProps {
  setDataForOverlay(data: any): void;
}

class ReferenceTable extends React.Component<ReferenceTableProps> {
  state = {
    initialValues: {}
  }


  componentDidMount() {
    this.setState({
      initialValues: this.props.dataForOverlay
    })
  }

  render() {
    const { setDataForOverlay } = this.props

    return (
      <Form
        onSubmit={() => { }}
        initialValues={formInitialValues(this.state.initialValues)}
        // validate={values => {
        //   const errors = {}
        //   const runsObject = formatDataForValidate(values)
        //   const ids = Object.keys(runsObject)
        //   ids.filter(id => {
        //     // console.log(runsObject[id]['run'], runsObject)
        //     if (runsObject[id].selected === true && isEmpty(runsObject[id].run)) {
        //       const nameOfField = ['run', id].join('_')
        //       console.log(assoc(nameOfField, 'Required', errors), runsObject[id].run)

        //       return assoc(nameOfField, 'Required', errors)
        //     }
        //   })
        //   console.log(errors)
        //   return errors
        // }}
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
                <TableHead>
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
                </TableHead>
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