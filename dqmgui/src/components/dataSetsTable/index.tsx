import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Paper, withStyles, StyledComponentProps } from '@material-ui/core'
import { pathOr } from 'ramda'

import ContentTable from './table'
import { getSamplesByDataSet } from '../ducks/header/fetchSamples'
import { SampleDataInerface } from '../ducks/header/interfaces'

interface TablesProps extends StyledComponentProps {
  samplesGroups: SampleDataInerface[];
  isOpen: boolean;
  content: string[];
}

const styles = (theme: any) => ({
  samplesGroupsWrapper: {
    width: '100%'
  },
  paper: {
    margin: '8px',
    width: 'calc(100% - 16px)'
  }
})

const Tables = ({ isOpen, content, classes, runs, ...props }: TablesProps) => {
  return (
    <Grid container className={pathOr('', ['samplesGroupsWrapper'], classes)}>
      {
        pathOr([], ['samplesGroups'], props).map((samplesGroup: SampleDataInerface) =>
          <Grid item xs={12} key={samplesGroup.type}>
            <Paper className={classes.paper}>
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
      samplesGroups: getSamplesByDataSet(state),
    }),
    undefined
  ), withStyles(styles)
)(Tables)