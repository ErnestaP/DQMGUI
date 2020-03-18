import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Paper, withStyles, Grid } from '@material-ui/core'
import { pathOr, isEmpty, path } from 'ramda'
import { withSnackbar } from 'notistack';

import ContentTable from './table'
import { SampleDataInerface } from '../ducks/header/interfaces'
import NoRecords from '../common/noRecords'
import { request } from './api'
import { formatDataset } from './utils'
import { getSearchFieldByRun, getSearchFieldByDataset } from '../ducks/table/form'
import { setLoader } from '../ducks/loader/loaderActions'
import { setRun, setDataset, cleanSubdirectories } from '../ducks/header/setPaths'

interface TablesProps {
  samplesGroups?: SampleDataInerface[];
  classes?: {
    samplesGroupsWrapper: string;
    paper: string;
  }
  datasetSearchField: string;
  runSearchField: string;
  setLoader(value: boolean): void;
}

const styles = (theme: any) => ({
  samplesGroupsWrapper: {
  },
  paper: {
    width: '100%'
  }
})

class Tables extends React.Component<TablesProps>{
  state = {
    samplesGroup: [],
    fetching: false,
  }

  setSemplesGroup = (samples: any) => {
    this.setState({
      samplesGroup: samples
    })
  }

  componentDidMount() {
    document.getElementById("searchForm").addEventListener("submit", (e) => {
      this.props.setRun(''),
      this.props.setDataset(''),
      this.props.cleanSubdirectories(),
      this.fetchData()
  }, true)

}

setFetching = (isFetching: boolean) => {
  this.setState({
    fetching: isFetching
  })
}

fetchData() {
  this.props.setLoader(true)
  request(this.props.datasetSearchField, this.props.runSearchField)
    .then(
      response => {
        this.props.setLoader(false)
        const samples = pathOr([], ['data', 'samples'], response)
        this.setSemplesGroup(formatDataset(samples))
        this.props.enqueueSnackbar('Successfully fetched the data.', { variant: 'success' })

      },
      error => {
        this.props.enqueueSnackbar('Failed fetching data.', { variant: 'error' })
        this.props.setLoader(false)
        this.setSemplesGroup([])
        console.log(error)
      }
    );
}

render() {
  const { classes } = this.props
  return (<Grid container>
    {
      isEmpty(this.state.samplesGroup) ?
        <NoRecords /> :
        this.state.samplesGroup.map((samplesGroup: SampleDataInerface, index:number) => (
          <Paper key={index} className={path(['paper'], classes)}>
            <ContentTable samplesGroup={samplesGroup} />
          </Paper>
        ))
    }
  </Grid>)
}
}

export default compose(
  connect(
    (state: any) => ({
      datasetSearchField: getSearchFieldByDataset(state),
      runSearchField: getSearchFieldByRun(state),
    }),
    { setLoader, setRun, setDataset, cleanSubdirectories }
  ),
  withStyles(styles),
  withSnackbar,
)(Tables)