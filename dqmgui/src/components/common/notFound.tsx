import * as React from 'react'
import { Typography, Grid } from '@material-ui/core'

interface NotFoundInterface {
  isFetching: boolean
}

const NotFound = ({ isFetching }: NotFoundInterface) => {
  return (
    <Grid>
      <Typography>
        Not found
            </Typography>
    </Grid>
  )
}
export default NotFound
