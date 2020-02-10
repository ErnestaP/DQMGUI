import * as React from 'react'
import { Grid } from '@material-ui/core';

import '../../app/styles.scss';
import SideNavigation from '../../components/sideNav'
import Header from '../../components/header'

const Application = () => {
  return (
    <Grid container className="Main" direction="column">
      <Grid item container>
        <Header />
      </Grid>
      <Grid item  container >
        <SideNavigation />
      </Grid>
    </Grid>
  )
}

export default Application