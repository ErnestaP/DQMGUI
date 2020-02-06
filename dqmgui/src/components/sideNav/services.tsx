import * as React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { compose } from 'ramda';
import { connect } from 'react-redux'

import { pseudoServices } from '../pseudoFields'
import { setService } from '../ducks/header/setActiveTabs'

interface ServicesProps {
  setService(type: string): void;
}

const Services = ({setService, ...props}: ServicesProps) => {
  const servicesValues = Object.values(pseudoServices)
  return (
    <Grid>
      {servicesValues.map((service: any) =>
        <Grid key={service} onClick={() => setService(service.title)} >
          {service.title}
        </Grid>
      )}
    </Grid>
  );
}

export default compose(
  connect(
    undefined,
    (dispatch: any) => ({
      setService(type: string) {
        dispatch(setService(type))
      }
    })
  )
)(Services)