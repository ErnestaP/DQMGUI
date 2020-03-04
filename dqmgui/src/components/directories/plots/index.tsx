import * as React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'

import { SizeProps } from 'src/app/interfaces'
import { request_for_images } from '../api'

interface PlotsProps {
  dataset: string;
  run: string;
  selected_directory: string[],
  names: string[],
  size: SizeProps
}

const Plots = ({ dataset, run, selected_directory, names, size }: PlotsProps) =>
  <Grid container>
    {names.map((name) => {
      return <Grid item key={name} id={name} style={{ width: `${Object.values(size)[0]}px`, height: `${Object.values(size)[1]}px` }}>
        <img src={request_for_images(run, dataset, selected_directory, name, size)} />
      </Grid>
    }
    )}
  </Grid>

export default Plots