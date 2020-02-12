import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from '@material-ui/core'

import ContentTable from './table'
import { getSamples } from '../ducks/header/fetchSamplesByDataset'
import { SampleDataInerface } from '../ducks/header/interfaces'

interface TablesProps {
  samplesGroups: SampleDataInerface[]
}

const Tables = ({ samplesGroups }: TablesProps) => {
  return (
    <Grid container spacing={8}>
      {
        samplesGroups.map((samplesGroup: any) =>
          <Grid item xs={12}>
            <ContentTable samplesGroup={samplesGroup} />
          </Grid>
        )
      }
    </Grid>
  )
}

export default compose(
  connect(
    (state: any) => ({
      samplesGroups: getSamples(state)
    }),
    undefined
  )
)(Tables)