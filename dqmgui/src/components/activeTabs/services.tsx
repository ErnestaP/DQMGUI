import * as React from 'react'
import { Grid, withStyles, Icon, IconButton, Button, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { compose } from 'ramda';
import { connect } from 'react-redux'

import { services } from '../pseudoFields'
import { setService, getService} from '../ducks/header/setPaths'
import { setMenuContent} from '../ducks/sideNav/setMenuStatus'


interface ServicesProps {
  setService(type: string): void;
  classes: any;
  selectedService: string;
  setMenuContent(type: string): void;
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
  selected: {
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  wrapper: {
    padding: '0px !important',
    width: '100% !important'
  },
  backButton:{
    color: theme.palette.common.white
  }
})

const Services = ({ setService, classes, selectedService, setMenuContent, ...props }: ServicesProps) => {
  const servicesValues = Object.values(services)
  return (
    <Grid container item direction="column" className={classes.wrapper}>
      <Grid item>
        <IconButton onClick={()=> setMenuContent('')}>
          <Icon>
            <ArrowBackIcon color="primary"/>
          </Icon>
        </IconButton>
      </Grid>
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
      },
      setMenuContent(type: string){
        dispatch(setMenuContent(type))
      }
    })
  ),
  withStyles(styles)
)(Services)