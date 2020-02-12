import * as React from 'react'
import { Typography, Grid } from '@material-ui/core'

const NotFound = ({ isFetching, ...props }: LoaderProps) => {
    return (
        <Grid>
            <Typography>
                Not found
            </Typography>
        </Grid>
    )
}
export default NotFound
