import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Paper } from '@material-ui/core'

import ContentTable from './table'
import { getSamples, isFetching } from '../ducks/header/fetchSamplesByDataset'
import { SampleDataInerface } from '../ducks/header/interfaces'
import { pathOr } from 'ramda'

interface TablesProps {
  samplesGroups: SampleDataInerface[];
  isOpen: boolean;
  content: string[];
}

const Tables = ({ isOpen, content, ...props }: TablesProps) => {
  return (
    <Grid container spacing={8} style={{ width: '100%' }}>
      {
        pathOr([], ['samplesGroups'], props).map((samplesGroup: SampleDataInerface) =>
          <Grid item xs={12} key={samplesGroup.type}>
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
    }),
    undefined
  )
)(Tables)