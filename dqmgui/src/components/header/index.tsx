import * as React from 'react';
import { Grid, withStyles, StyleRulesCallback, StyledComponentProps } from '@material-ui/core'
import Logo from '../../../images/CMSlogo_color_nolabel_1024_May2014.png';

const styles = (theme: any) => ({
  header: {
    background: theme.palette.primary.main
  },
  logo: {
    width: '30px',
    height: '30px',
  }
})

interface HeaderInterface {
  services: any;
  worskpace: any;
  run: number;
  ls: number;
  event: string;
  date: Date;
  classes: any;
}

const Header = ({ classes, ...props }: HeaderInterface) => {
  return (
    <Grid container className={classes.header}>
      <Grid xs={2}>
        <img src={Logo} className={classes.logo}></img>
      </Grid>
    </Grid>
  );

}

export default withStyles(styles)(Header)