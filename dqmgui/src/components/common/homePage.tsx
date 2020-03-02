import * as React from 'react'
import { Grid, withStyles } from '@material-ui/core'

import Logo from '../../../images/CMSlogo_color_nolabel_1024_May2014.png';
import { Route } from 'react-router-dom';

const styles = () =>({
  cmsLogo:{
    opacity: 0.8,
    '&:hover':{
      opacity: 1,
    }
  },
  wrapper:{
    display: 'flex',
    alignItems: 'center',
  }
})

const Home = (props) =>
  <Route render={({ history }) => (
    <Grid container justify="center" className={props.classes.wrapper}>
      <Grid item onClick={()=> history.push('samples')} className={props.classes.cmsLogo}>
        <img src={Logo} style={{ height: '400px', width: '400px' }} />
      </Grid>
    </Grid>
  )}
  />




export default withStyles(styles)(Home)