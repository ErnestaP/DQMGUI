import * as React from 'react'
import { Grid, IconButton, Icon, withStyles, Typography, Paper, Divider } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import { compose, isEmpty } from 'ramda';
import cleanDeep from 'clean-deep'
import { pathOr } from 'ramda'
import { Route } from 'react-router-dom';

import { requestForDirectories } from './api'
import { getRun, getDataset, set_subdirectory, getPath, get_subdirectories } from '../ducks/header/setPaths'
import { connect } from 'react-redux'
import { setLoader } from '../ducks/loader/loaderActions'
import { getSize } from '../ducks/plots/sizeChanger';
import { setAllNames, getNames } from '../ducks/plots/setNames'
import { setDirectories, getDirectoriesNames } from '../ducks/folders/getDirectories'
import Plots from './plots';
import NoRecords from '../common/noRecords';

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
  selected_directory: string[],
  set_subdirectory(subdirectory: string): void,
  setAllNames(names: string[]): void,
  size: SizeProps
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
    wordBreak: 'break-word',
  },
  papper: {
    width: '100%'
  },
  sizeChanger: {
    paddingLeft: 16,
    paddingBottom: 4
  },
})

class Directories extends React.Component<DirectoriesProps>{

  fetch_directories() {
    this.props.setLoader(true)
    requestForDirectories(this.props.run, this.props.dataset, this.props.selected_directory)
      .then(
        response => {
          this.props.setLoader(false)

          const directories = cleanDeep(pathOr([], ['data', 'contents'], response).map((dir_object: Object) =>
            pathOr('', ['subdir'], dir_object)))
          let empty = {}
          const images_names_from_api = cleanDeep(pathOr([], ['data', 'contents'], response).map((images_object: Object) => {
            const name = pathOr('', ['obj'], images_object)
            const imageObject = {
              name: name,
              run: this.props.run,
              dataset: this.props.dataset,
              directories: this.props.selected_directory,
              stats: true,
              normalize: true,
              selected: false,
            }
            if (name) {
              return empty[name] = imageObject
            }
            else {
              return undefined
            }
          }))

          this.props.setDirectories(directories)

          this.props.setAllNames(empty)
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
    const { classes,
      set_subdirectory,
      dataset,
      run,
      selected_directory,
      size,
      directories,
      plots,
    } = this.props

    return (
      <Route render={({ history }) => (
        <Paper className={classes.papper}>
          <Grid item container className={classes.wrapper}>
            <Grid container item id="directoriesGrid">
              {directories && directories.map((directory: string) =>
                <Grid item xs={3} key={directory} className={classes.folder_wrapper}>
                  <IconButton className={classes.button}
                    onClick={() => {
                      set_subdirectory(directory)
                      history.push(`${directory}`)
                      this.fetch_directories()
                    }}>
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
            </Grid>
            <Grid container direction="row" spacing={0} className={classes.plots}>
              {!isEmpty(plots) &&
                <Plots
                  plots={plots}
                  dataset={dataset}
                  run={run}
                  selected_directory={selected_directory}
                  size={size}
                />
              }
            </Grid >
          </Grid >
          {isEmpty(directories) && isEmpty(plots) &&
            <NoRecords />
          }
        </Paper>
      )} />
    )
  }
}

export default compose<any, any, any>(
  connect(
    (state: any) => ({
      dataset: getDataset(state),
      run: getRun(state),
      path: getPath(state),
      size: getSize(state),
      selected_directory: get_subdirectories(state),
      directories: getDirectoriesNames(state),
      plots: getNames(state)
    }),
    { setLoader, set_subdirectory, setAllNames, setDirectories }
  ),
  withStyles(styles)
)(Directories)