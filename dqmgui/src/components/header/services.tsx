import * as React from 'react';
import { Grid, withStyles } from '@material-ui/core'

const styles = (theme: any) => ({
  header: {
    color: theme.palette.primary.main
  }
})

interface HeaderInterface {
  services: string[]
  classes: any;
}

const Services = ({ classes, ...props }: HeaderInterface) => {
  const pseudoServices = ['Online', "Offline"]

  return (
    <Grid className={classes.header}>
      GRID
    </Grid>
  );

}

export default withStyles(styles)(Services)