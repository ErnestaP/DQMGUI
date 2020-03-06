import * as React from 'react';
import { Grid, withStyles, Button, IconButton, Icon } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Search from '@material-ui/icons/Search';
import { compose, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { Form } from 'react-final-form'
import { Route } from 'react-router-dom';

import Logo from '../../../images/CMSlogo_color_nolabel_1024_May2014.png';
import { get_subdirectories, getRun, getDataset, back_subdirectory } from '../ducks/header/setPaths'
import { Time } from './time'
import SearchByDatasetField from './searchByDatasetField'
import SearchByRunField from './searchBuRunField'
import SearchByPlotByName from './searchByPlotName'
import { setSearachFieldByDataset, setSearachFieldByRun } from '../ducks/table/form';
import { format_search_field_string, format_header_path } from '../utils'
import { SizeProps } from 'src/app/interfaces';

const styles = (theme: any) => ({
  header: {
    background: 'linear-gradient(to right, #0d47a1, #00acc1)',
    height: 'fit-content',
    alignItems: 'center',
    color: theme.palette.common.white,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  logo: {
    height: '6vh',
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      height: '3vh',
    },
    [theme.breakpoints.down('sm')]: {
      height: '4vh',
    },
    [theme.breakpoints.down('md')]: {
      height: '4vh',
    },
    [theme.breakpoints.down('lg')]: {
      height: '5vh',
    },
    [theme.breakpoints.down('xl')]: {
      height: '6vh',
    },
  },

  time: {
    fontSize: '0.725rem',
  },
  timeWrapper: {
    paddingRight: 16,
    justifyContent: 'flex-end',
    display: 'flex',
  },
  searchContainer: {
    justifyContent: 'felx-end',
    display: 'flex',
    background: 'white',
    boxShadow: '2px 10px 14px 0px rgba(0, 0, 0, 0.04)',

  },
  pathContainer: {
    padding: 8,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  submitButtonWrapper: {
    paddingRight: 32,
    paddingTop: 4,
    paddingBottom: 4,
  },
  sumbitButton: {
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.secondary.dark,
    }
  },
  paper: {
    display: 'flex'
  },
  wrapper: {
    display: 'flex',
  },
  activeTabs: {
    paddingTop: 16,
  },
  form: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  expandMore: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  sizeChanger: {
    paddingBottom: 24,
  },
  additionalMenu: {
    background: '#eeeeee'
  },
  directories: {
    '&:hover': {
      color: theme.palette.primary.contrastText
    },
    color: theme.palette.primary.main,
    cursor: 'pointer'
  }
})

interface HeaderInterface {
  service: string;
  worskpace: any;
  ls: number;
  event: string;
  date: Date;
  classes: any;
  setMenuState(state: boolean): void;
  setMenuContent(type: string): void;
  workplace: string;
  setSearachFieldByRun(formValues: string): void;
  setSearachFieldByDataset(formValues: string): void;
  dataset: string;
  run: string;
  directories: string[];
  settedSize: SizeProps;
  back_subdirectory(directory: string): void;
}

const Header = ({
  classes,
  setSearachFieldByRun,
  setSearachFieldByDataset,
  dataset,
  run,
  directories,
  back_subdirectory,
}: HeaderInterface) => {
  const [open, toggleMenu] = React.useState(false)

  return (
    <Route render={({ history }) => (
      <Form
        onSubmit={(formValues: any) => {
          setSearachFieldByDataset(format_search_field_string(pathOr('', ['searchField'], formValues)))
          setSearachFieldByRun(format_search_field_string(pathOr('', ['searchFieldByRun'], formValues)))
          history.replace('/')
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}
            id="searchForm"
            className={classes.form}
          >
            <Grid item container className={classes.wrapper}>
              <Grid item container xs={12} className={classes.header}>
                <Grid container xs={4} item >
                  <Grid item xs={2}>
                    <img src={Logo} className={classes.logo}
                    ></img>
                  </Grid>
                </Grid>
                <Grid item xs={8} className={classes.timeWrapper} >
                  <Time classes={classes.time} />
                </Grid>
              </Grid>
              <Grid container item xs={12} justify="flex-end" className={classes.searchContainer} direction="row">
                <Grid container xs={12} item justify="space-between">
                  <Grid item>
                    <IconButton onClick={() => toggleMenu(!open)}>
                      <Icon>
                        <MoreVertIcon />
                      </Icon>
                    </IconButton>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={7} className={classes.pathContainer}>
                    <Grid container item>
                      <Grid item>{format_header_path(dataset, run)}/</Grid>
                      {directories.map((directory: string) =>
                        <Grid item
                          key={directory}
                          className={classes.directories}
                          onClick={() => {
                            back_subdirectory(directory)
                          }}
                        >
                          {directory}/</Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container item xs={5} sm={5} md={5} lg={5} xl={4} justify="space-around">
                    <Grid item>
                      <SearchByDatasetField />
                    </Grid>
                    <Grid item>
                      <SearchByRunField />
                    </Grid>
                    <Grid item className={classes.submitButtonWrapper}>
                      <Button type="submit" className={classes.sumbitButton} id="search_button">
                        <Search />
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {
                open &&
                <Grid container item xs={12} className={classes.additionalMenu}>
                  <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                    <SearchByPlotByName />
                  </Grid>
                </Grid>
              }
            </Grid>
          </form>
        )} />)
    }
    />
  )
}

export default compose<any, any, any>(
  connect(
    (state: any) => ({
      run: getRun(state),
      dataset: getDataset(state),
      directories: get_subdirectories(state),
    }),
    { setSearachFieldByDataset, setSearachFieldByRun, back_subdirectory }
  ),
  withStyles(styles))
  (Header)