import * as React from 'react';
import { Grid, withStyles, Button, Paper } from '@material-ui/core'
import Search from '@material-ui/icons/Search';
import { compose, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { Form } from 'react-final-form'
import { Route } from 'react-router-dom';

import Logo from '../../../images/CMSlogo_color_nolabel_1024_May2014.png';
import { path_for_header } from '../ducks/header/setPaths'
import { Time } from './time'
import SearchByDatasetField from './searchByDatasetField'
import SearchByRunField from './searchBuRunField'
import SearchByPlotByName from './searchByPlotName'
import { setSearachFieldByDataset, setSearachFieldByRun } from '../ducks/table/submitForm';

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
  }
})

interface HeaderInterface {
  service: string;
  worskpace: any;
  run: number;
  ls: number;
  event: string;
  date: Date;
  classes: any;
  setMenuState(state: boolean): void;
  setMenuContent(type: string): void;
  workplace: string;
  setSearachFieldByRun(formValues: string): void;
  setSearachFieldByDataset(formValues: string): void;
  path: string;
}

const Header = ({
  classes,
  setSearachFieldByRun,
  setSearachFieldByDataset,
  path,
}: HeaderInterface) => {

  return (
    <Route render={({ history }) => (
      <Form
        onSubmit={(formValues: any) => {
          setSearachFieldByDataset(pathOr('', ['searchField'], formValues))
          setSearachFieldByRun(pathOr('', ['searchFieldByRun'], formValues))
          history.replace('/')
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
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
                {/* <Grid item xs={12}> */}
                  <Grid container xs={8} item justify="flex-end">
                    <Grid item xs={2}>
                      <SearchByDatasetField />
                    </Grid>
                    <Grid item xs={2}>
                      <SearchByRunField />
                    </Grid>
                    <Grid item xs={2}>
                      <SearchByPlotByName />
                    </Grid>
                    <Grid item xs={1} className={classes.submitButtonWrapper}>
                      <Button type="submit" className={classes.sumbitButton} id="search_button">
                        <Search />
                        Search
                      </Button>
                    </Grid>
                  {/* </Grid> */}
                </Grid>
                <Grid item xs={12} justify="flex-start" className={classes.pathContainer}>
                  {path}
                </Grid>
              </Grid>
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
      path: path_for_header(state)
    }),
    { setSearachFieldByDataset, setSearachFieldByRun }
  ),
  withStyles(styles))
  (Header)