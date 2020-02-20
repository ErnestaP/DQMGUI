import * as React from 'react'
import { Grid } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { pathOr } from 'ramda';

import '../../app/styles.scss';
import SideNavigation from '../../components/sideNav'
import Header from '../../components/header'
import Table from '../dataSetsTable/'
import { getLoaderState } from '../ducks/loader/loaderActions';
import Loader from '../common/loader';

interface ApplicationProps {
  isFetching?: boolean
}

const Application = (props : ApplicationProps) => {
  return (
    <Grid container className="Main" direction="column">
      <Loader isFetching={pathOr(false, ['isFetching'], props)} />
      <Grid item>
        <Header />
      </Grid>
      <Grid item container >
        <SideNavigation />
      </Grid>
      <Grid item style={{ display: 'flex', justifyContent: "center", paddingTop: 16 }}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default compose(
  connect(
    (state: any) => ({
      isFetching: getLoaderState(state),
    }),
    undefined
  )
)(Application)