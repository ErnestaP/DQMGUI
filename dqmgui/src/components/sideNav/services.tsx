import * as React from 'react'
import { Grid, Typography } from '@material-ui/core'

import { pseudoServices } from '../pseudoFields'
import { ServicesProps } from '../ducks/header/interfaces'

interface InformationProps {
  service: ServicesProps[];
}

const Services = () => {
  const servicesValues = Object.values(pseudoServices)
  return (
    <Grid>
      {servicesValues.map((service: ServicesProps) =>
        <Grid>
          {service.title}
        </Grid>
      )}
    </Grid>
  );
}

export default Services