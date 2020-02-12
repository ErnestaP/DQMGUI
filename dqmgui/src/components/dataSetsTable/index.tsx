import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Paper } from '@material-ui/core'

import ContentTable from './table'
import { getSamples, isFetching } from '../ducks/header/fetchSamplesByDataset'
import { getisOpenDialog, getDialogContent } from '../ducks/dialog/openClose'
import { SampleDataInerface } from '../ducks/header/interfaces'
import Dialog from './dialog'
import Loader from '../common/loading'

interface TablesProps {
  samplesGroups: SampleDataInerface[];
  isOpen: boolean;
  content: string[];
}

const Tables = ({ samplesGroups, isOpen, content, isFetching }: TablesProps) => {
  return (
    <Grid container spacing={8} style={{ width: '100%', display: 'flex', justifyContent: "center" }}>
      <Dialog open={isOpen} runsList={content} />
      {
        isFetching ? <Loader isFetching={isFetching} />
          :
          samplesGroups.map((samplesGroup: any) =>
            <Grid item xs={12}>
              <Paper>
                <ContentTable samplesGroup={samplesGroup} />
              </Paper>
            </Grid>
          )
      }
    </Grid>
  )
}

export default compose(
  connect(
    (state: any) => ({
      samplesGroups: getSamples(state),
      isOpen: getisOpenDialog(state),
      content: getDialogContent(state),
      isFetching: isFetching(state),
    }),
    undefined
  )
)(Tables)