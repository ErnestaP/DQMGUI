import * as React from 'react'
import { Grid } from '@material-ui/core'

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
    {names.map(name =>
      <Grid item key={name} id={name}>
        <img src={request_for_images(run, dataset, selected_directory, name, size)} />
      </Grid>
    )}
  </Grid>

export default Plots