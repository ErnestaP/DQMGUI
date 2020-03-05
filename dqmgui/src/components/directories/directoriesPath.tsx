import * as React from 'react'
import { Grid, withStyles } from '@material-ui/core'

import { format_header_path } from '../utils'

interface DirectoriesPathProps {
  directories: string[];
  dataset: string;
  run: string;
  back_subdirectory(subdirectory: string): void;
  classes: {
    directories: string
  }
}

const styles = (theme) => ({
  directories: {
    '&:hover': {
      color: theme.palette.primary.contrastText
    },
    color: theme.palette.primary.main,
    cursor: 'pointer'
  }
})

const DirectoriesPath = ({ directories, dataset, run, back_subdirectory, classes }: DirectoriesPathProps) => {
  return (
    <Grid container item>
      <Grid item>{format_header_path(dataset, run)}/</Grid>
      {directories && directories.map((directory: string) =>
        <Grid item
          className={classes.directories}
          onClick={() => {
            back_subdirectory(directory)
          }}
        >
          {directory}/</Grid>
      )}
    </Grid>
  )
}

export default withStyles(styles)(DirectoriesPath)