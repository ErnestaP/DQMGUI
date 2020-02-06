import * as React from 'react';
import { Grid, withStyles, Typography, Button } from '@material-ui/core'
import { Field, Form } from 'redux-form'
import AccordionComponent from '../common/accordion';

import { pseudoServices, workPlace } from '../pseudoFields'

const styles = (theme: any) => ({
  header: {
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
  }
})

interface ServicesInterface {
  services?: string[]
  classes?: any;
}

const Services = ({ classes, ...props }: ServicesInterface) => {

  return (
    <Grid item style={{ opacity: 1 }}>
      <AccordionComponent label="Services"
        name="services"
        component={AccordionComponent}
        pannels={workPlace}
        getOptionValue={(option: any) => option}
        getOptionLabel={(option: any) => option} />
    </Grid>
  );

}

export default withStyles(styles)(Services)