import * as React from 'react'
import { Grid, IconButton, Icon, withStyles, Typography, Paper } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import { compose } from 'ramda';

import { request } from './api'
import { getRun, getDataset, set_path_for_folders, set_subdirectory, getPath, get_subdirectories } from '../ducks/header/setPaths'
import { connect } from 'react-redux'
import { setLoader } from '../ducks/loader/loaderActions'
import { pathOr } from 'ramda'
import cleanDeep from 'clean-deep'
import { Route } from 'react-router-dom';

interface DirectoriesProps {
  setLoader(value: boolean): void;
  dataset: string;
  run: string;
  classes: {
    folder: string,
    folder_wrapper: string,
    wrapper: string,
    button: string,
    papper: string,
  },
  selected_directory: string[]
}

const styles = (theme: any) => ({
  folder: {
    paddingLeft: 8,
  },
  folder_wrapper: {
    paddingLeft: 8,
    width: 'fit-content'
  },
  wrapper: {
    padding: 4,
  },
  button: {
    borderRadius: 8,
  },
  papper: {
    width: '100vw'
  }
})

class Directories extends React.Component<DirectoriesProps>{
  state = ({
    directories: []
  })

  set_directories = (dirs: any) => {
    this.setState({
      directories: dirs
    })
  }

  fetch_directories() {
    console.log(this.props.selected_directory)
    this.props.setLoader(true)
    request(this.props.run, this.props.dataset, this.props.selected_directory)
      .then(
        response => {
          this.props.setLoader(false)
          const directories = cleanDeep(pathOr([], ['data', 'contents'], response).map((dir_object: Object) =>
            pathOr('', ['subdir'], dir_object)))
          this.set_directories(directories)
        },
        error => {
          this.props.setLoader(false)
          console.log(error)
        }
      );
  }

  componentDidMount() {
    this.fetch_directories()
  }


  render() {
    const { classes, set_path_for_folders, set_subdirectory } = this.props

    return (
      <Route render={({ history }) => (
        <Paper className={classes.papper}>
          <Grid item container className={classes.wrapper}>
            {
              this.state.directories.map((directory: string) =>
                <Grid item xs={2} key={directory} className={classes.folder_wrapper}>
                  <IconButton className={classes.button}
                    onClick={() => {
                      console.log(history)
                      set_path_for_folders(directory)
                      set_subdirectory(directory)
                      history.push(`${directory}`)
                      this.fetch_directories()
                    }
                    }>
                    <Icon color="primary">
                      <FolderIcon />
                    </Icon>
                    <Typography variant="button" className={classes.folder}>
                      {directory}
                    </Typography>
                  </IconButton>
                </Grid>
              )
            }
          </Grid >
        </Paper>
      )} />
    )
  }
}

export default compose(
  connect(
    (state: any) => ({
      dataset: getDataset(state),
      run: getRun(state),
      path: getPath(state),
      selected_directory: get_subdirectories(state)
    }),
    { setLoader, set_path_for_folders, set_subdirectory }
  ),
  withStyles(styles)
)(Directories)