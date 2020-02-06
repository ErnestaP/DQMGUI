import * as React from 'react'
import { Grid, Typography, withStyles } from '@material-ui/core'
import { compose } from 'ramda';
import { connect } from 'react-redux'

import { pseudoServices } from '../pseudoFields'
import { setService, getService } from '../ducks/header/setActiveTabs'

interface ServicesProps {
  setService(type: string): void;
  classes: any;
  selectedService: string;
}

const styles = (theme: any) => ({
  title: {
    transition: '0.5s',
    '&:hover': {
      background: theme.palette.primary.dark,
      color: theme.palette.common.white,
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    paddingLeft: '8px',
    paddingTop: '8px',
  },
  selected:{
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  wrapper:{
   padding: '0px !important',
   width: '100% !important'
  }
})

const Services = ({ setService, classes, selectedService, ...props }: ServicesProps) => {
  const servicesValues = Object.values(pseudoServices)
  return (
    <Grid container item direction="column" className={classes.wrapper}> 
      {servicesValues.map((service: any) => {
        const selected = service.title == selectedService
        return (
          <Grid key={service} onClick={() => setService(service.title)} className={`${classes.title}`}>
            <Typography className={`${selected && classes.selected}`}>
              {service.title}
            </Typography>
          </Grid>
        )
      }
      )}
    </Grid>
  );
}

export default compose<any, any, any>(
  connect(
    (state: any) => ({
      selectedService: getService(state)
    }),
    (dispatch: any) => ({
      setService(type: string) {
        dispatch(setService(type))
      }
    })
  ),
  withStyles(styles)
)(Services)