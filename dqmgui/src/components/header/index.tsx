import * as React from 'react';
import { Grid, withStyles, Button, Paper } from '@material-ui/core'
import Search from '@material-ui/icons/Search';
import { compose, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { Form } from 'react-final-form'

import Logo from '../../../images/CMSlogo_color_nolabel_1024_May2014.png';
import { setMenuState, getMenuStatus, setMenuContent } from '../ducks/sideNav/setMenuStatus'
import { path_for_header } from '../ducks/header/setPaths'
import { Time } from './time'
import SearchByDatasetField from './searchByDatasetField'
import SearchByRunField from './searchBuRunField'
import { setSearachFieldByDataset, setSearachFieldByRun } from '../ducks/header/serchFields';
import ActiveTabs from './activeTabs';
import { PinnedSubheaderList } from '../common/subHeadList';

const styles = (theme: any) => ({
  header: {
    background: 'linear-gradient(to right, #0d47a1, #00acc1)',
    height: '6vh',
    alignItems: 'center',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'space-between'
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
  },
  searchContainer: {
    justifyContent: 'felx-end',
    display: 'flex',
  },
  pathContainer: {
    // display: 'flex',
    // alignItems: 'center',
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
    width: '100vw',
    display: 'flex'
  },
  wrapper: {
    width: 'fit-content'
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
  menuState: boolean;
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
    <Form
      onSubmit={(formValues: any) => {
        setSearachFieldByDataset(pathOr('', ['searchField'], formValues))
        setSearachFieldByRun(pathOr('', ['searchFieldByRun'], formValues))
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid item container className={classes.wrapper}>
            <Grid item container xs={12} className={classes.header}>
              <Grid container xs={6} item >
                <Grid item xs={2}>
                  <img src={Logo} className={classes.logo}
                  ></img>
                </Grid>
                <Grid item className={classes.activeTabs}>
                  {/* <ActiveTabs /> */}
                </Grid>
              </Grid>
              <Grid item className={classes.timeWrapper}>
                <Time classes={classes.time} />
              </Grid>
            </Grid>
            <Paper className={classes.paper}>
              <Grid container item xs={12} justify="flex-end" className={classes.searchContainer} direction="row">
                <Grid item xs={6}>
                  <PinnedSubheaderList />
                </Grid>
                <Grid item xs={6} justify="flex-start">
                  <Grid container item justify="flex-end">
                    <SearchByDatasetField />
                    <SearchByRunField />
                    <Grid item className={classes.submitButtonWrapper}>
                      <Button type="submit" className={classes.sumbitButton}>
                        <Search />
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} justify="flex-start" className={classes.pathContainer}>
                  {path}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </form>
      )} />);
}

export default compose<any, any, any>(
  connect(
    (state: any) => ({
      menuState: getMenuStatus(state),
      path: path_for_header(state)
    }),
    { setSearachFieldByDataset, setSearachFieldByRun }
  ),
  withStyles(styles))
  (Header)