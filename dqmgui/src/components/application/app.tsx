import * as React from 'react'
import { Grid, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { pathOr } from 'ramda';

import '../../app/styles.scss';
import SideNavigation from '../../components/sideNav'
import Header from '../../components/header'
import { getLoaderState } from '../ducks/loader/loaderActions';
import Loader from '../common/loader';
import Router from '../../app/routers'

interface ApplicationProps {
  isFetching?: boolean,
  classes: {
    router: string,
    header: string,
  }
}

const styles = (theme) => ({
  router: {
    display: 'flex',
    justifyContent: "flex-end",
    paddingTop: 16,
    width: '100vw'
  },
  header: {
    width: '100vw',
  }
})

const Application = ({ classes, ...props }: ApplicationProps) => {
  return (
    <Grid container className="Main" direction="row">
      <Loader isFetching={pathOr(false, ['isFetching'], props)} />
      <Grid item container >
        <SideNavigation />
      </Grid>
      <Grid item className={classes.header}>
        <Header />
      </Grid>
      <Grid item className={classes.router}>
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
  ),
  withStyles(styles)
)(Application)