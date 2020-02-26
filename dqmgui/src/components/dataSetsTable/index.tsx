import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Paper, withStyles } from '@material-ui/core'
import { pathOr, isEmpty, path } from 'ramda'

import { SearchResultTable as ContentTable } from './table'
import { getSamplesByDataset } from '../ducks/header/fetchSamples'
import { SampleDataInerface } from '../ducks/header/interfaces'
import NoRecords from '../../components/common/noRecords'

interface TablesProps {
  samplesGroups?: SampleDataInerface[];
  classes?: {
    samplesGroupsWrapper: string;
    paper: string;
  }
}

const styles = (theme: any) => ({
  samplesGroupsWrapper: {
  },
  paper: {
    width: 'calc(100% - 16px)'
  }
})

const Tables = ({ classes, ...props }: TablesProps) => {
  const samples = pathOr([], ['samplesGroups'], props)

  return (<React.Fragment>
    {isEmpty(samples) ? <NoRecords /> :
      samples.map((samplesGroup: SampleDataInerface) => (
        <Paper className={path(['paper'], classes)}>
          <ContentTable samplesGroup={samplesGroup} />
        </Paper>
      ))
    }
  </React.Fragment>)
}

export default compose(
  connect(
    (state: any) => ({
      samplesGroups: getSamplesByDataset(state),
    }),
    undefined
  ),
  withStyles(styles)
)(Tables)