import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Paper, withStyles } from '@material-ui/core'
import { pathOr, isEmpty, path } from 'ramda'
import { withSnackbar } from 'notistack';

import ContentTable from './table'
import { SampleDataInerface } from '../ducks/header/interfaces'
import NoRecords from '../common/noRecords'
import { request, formatDataset } from './utils/forFetchingSamples'
import { getSearchFieldByRun, getSearchFieldByDataset } from '../ducks/header/serchFields'
import { setLoader } from '../ducks/loader/loaderActions'
import EventEmmiter from '../../common/events';

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
    document.getElementById("search_button").addEventListener("click", () => this.fetchData());
  }

  setFetching = (isFetching: boolean) => {
    this.setState({
      fetching: isFetching
    })
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const searchByDataset = prevProps.datasetSearchField !== this.props.datasetSearchField
    const searchByRun = prevProps.runSearchField !== this.props.runSearchField
    if (searchByDataset || searchByRun) {
      this.fetchData()
    }
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
    return (<React.Fragment>
      {
        isEmpty(this.state.samplesGroup) ?
          <NoRecords /> :
          this.state.samplesGroup.map((samplesGroup: SampleDataInerface) => (
            <Paper className={path(['paper'], classes)}>
              <ContentTable samplesGroup={samplesGroup} />
            </Paper>
          ))
      }
    </React.Fragment>)
  }
}

export default compose(
  connect(
    (state: any) => ({
      datasetSearchField: getSearchFieldByDataset(state),
      runSearchField: getSearchFieldByRun(state),
    }),
    { setLoader }
  ),
  withStyles(styles),
  withSnackbar,
)(Tables)