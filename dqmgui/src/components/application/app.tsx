import * as React from 'react'
import { Grid } from '@material-ui/core';

import '../../app/styles.scss';
import SideNavigation from '../../components/sideNav'
import Header from '../../components/header'
import Table from '../dataSetsTable/table'

const Application = () => {
  return (
    <Grid container className="Main" direction="column">
      <Grid item container>
        <Header />
      </Grid>
      <Grid item container >
        <SideNavigation />
      </Grid>
      <Grid item>
        <Table />
      </Grid>
    </Grid>
  )
}

export default Application