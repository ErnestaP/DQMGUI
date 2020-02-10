import * as React from 'react'
import { Grid } from '@material-ui/core';

import '../../app/styles.scss';
import SideNavigation from '../../components/sideNav'
import Header from '../../components/header'
import {getSamples} from '../ducks/header/getDataByEra'
const Application = () => {

  console.log(getSamples())
  return (
    <Grid container className="Main" direction="column">
      <Grid item >
        <Header />
      </Grid>
      <Grid item>
        <SideNavigation />
      </Grid>
    </Grid>
  )
}

export default Application