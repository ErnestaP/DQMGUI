import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { getSearchFieldByRun, getSearchFieldByDataset } from '../ducks/header/serchFields'
import { setLoader } from '../ducks/loader/loaderActions'
import TableWithSamples from './tableWithSamples'
import NoRecords from '../common/noRecords'

interface TablesProps {
  searchByDataset: string;
  searchByRun: string;
}

const Tables = ({ searchByDataset, searchByRun }: TablesProps) => {
  if (searchByDataset || searchByRun) {
    return (<TableWithSamples
      searchByDataset={searchByDataset}
      searchByRun={searchByRun} />)
  } else {
    return (<NoRecords />)
  }
}


export default compose(
  connect(
    (state: any) => ({
      searchByDataset: getSearchFieldByDataset(state),
      searchByRun: getSearchFieldByRun(state),
    }),
    { setLoader }
  ),
  // withStyles(styles)
)(Tables)