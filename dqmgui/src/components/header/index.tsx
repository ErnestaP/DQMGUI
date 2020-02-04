import * as React from 'react';
import { Grid, withStyles, StyleRulesCallback, StyledComponentProps } from '@material-ui/core'

const styles = (theme: any) => ({
  header: {
    background: theme.palette.primary.main
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
    <Grid className={classes.header}>
      GRID
    </Grid>
  );

}

export default withStyles(styles)(Header)