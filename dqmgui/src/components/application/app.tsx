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
import Router from '../../app/routers'

interface ApplicationProps {
  isFetching?: boolean
}

const Application = (props: ApplicationProps) => {
  return (
    <Grid container className="Main" direction="row">
      <Loader isFetching={pathOr(false, ['isFetching'], props)} />
      <Grid item container >
        <SideNavigation />
      </Grid>
      <Grid item style={{ width: '100vw' }}>
        <Header />
      </Grid>
      <Grid item style={{ display: 'flex', justifyContent: "flex-end", paddingTop: 16, width: '100vw' }}>
        <Router />
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