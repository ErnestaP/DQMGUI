import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Paper, withStyles } from '@material-ui/core'
import { pathOr, isEmpty, path } from 'ramda'

import { SearchResultTable as ContentTable } from './table'
import { SampleDataInerface } from '../ducks/header/interfaces'
import NoRecords from '../../components/common/noRecords'
import { request, formatDataset } from './utils/forFetchingSamples'
import { getSearchFieldByRun, getSearchFieldByDataset } from '../ducks/header/serchFields'
import { setLoader } from '../ducks/loader/loaderActions'

interface TablesProps {
  samplesGroups?: SampleDataInerface[];
  classes?: {
    samplesGroupsWrapper: string;
    paper: string;
  }
  searchByDataset: string;
  searchByRun: string;
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
  state = ({
    samplesGroup: [],
    fetching: false,
  })

  setSemplesGroup = (samples: any) => {
    this.setState({
      samplesGroup: samples
    })
  }

  setFetching = (isFetching: boolean) => {
    this.setState({
      fetching: isFetching
    })
  }

  componentDidMount() {
    this.props.setLoader(true)
    request(this.props.searchByDataset, this.props.searchByRun)
      .then(
        response => {
          this.props.setLoader(false)
          const samples = pathOr([], ['data', 'samples'], response)
          this.setSemplesGroup(formatDataset(samples))
        },
        error => {
          this.props.setLoader(false)
          console.log(error)
        }
      );
  }

  render() {
    const { classes } = this.props
    return (<React.Fragment>
      {
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
    undefined,
    { setLoader }
  ),
  withStyles(styles)
)(Tables)