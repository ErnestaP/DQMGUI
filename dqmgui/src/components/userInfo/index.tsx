import * as React from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { pathOr } from 'ramda';

import { Time } from '../header/time'

interface UserProps {
  name?: string;
  classes: any;
}

const styles = (theme) => ({
  name: {
    fontSize: '0.725rem'
  },
  icon: {
    height: '35px',
    width: '35px',
  }
})

const UserInfomation = (props: UserProps) => {
  return (
    <Grid container item direction="row" justify="flex-end">
      <Grid item xs={2}>
        <AccountBoxIcon className={props.classes.icon} />
      </Grid>
      <Grid item container direction="column" xs={7} style={{display: 'flex', justifyContent: 'center'}}> 
        <Grid item className={props.classes.name}>
          {pathOr('No User Name', ['name'], props)}
        </Grid>
        <Grid item className={props.classes.name}>
          {pathOr('No Server Name', ['server'], props)}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(UserInfomation)