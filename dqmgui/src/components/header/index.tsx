import * as React from 'react';
import { Grid, withStyles, Icon, Button, Paper } from '@material-ui/core'
import Search from '@material-ui/icons/Search';
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'
import cleanDeep from 'clean-deep';

import Logo from '../../../images/CMSlogo_color_nolabel_1024_May2014.png';
import { setMenuState, getMenuStatus, setMenuContent } from '../ducks/sideNav/setMenuStatus'
import { getService, getWorkplace, getRun } from '../ducks/header/setActiveTabs'
import { Time } from './time'
import { fetchSamplesByDataSetAction } from '../ducks/header/fetchSamplesByDataset'
import { fetchSamplesByRunAction } from '../ducks/header/fetchSamplesByRun';
import SearchByDatasetField from './searchByDatasetField'
import SearchByRunField from './searchBuRunField'
import { combineGetSamplesByDataSetAndRun } from '../ducks/header/combineSamplesByDataSetAndRun';

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
    display: 'flex',
    alignItems: 'center',
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
  fetchSamples(formValues: any[]): string[];
}

class Header extends React.Component<HeaderInterface>{

  render() {
    const
      { classes,
        setMenuState,
        menuState,
        service,
        setMenuContent,
        workplace,
        run,
        fetchSamples,
        ...props } = this.props;

    return (
      <Form
        onSubmit={(formValues: any) => {
          fetchSamples(formValues)
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
                </Grid>
                <Grid item className={classes.timeWrapper}>
                  <Time classes={classes.time} />
                </Grid>
              </Grid>
              <Grid container item xs={12} justify="flex-end" className={classes.searchContainer}>
                <Paper className={classes.paper}>
                  <Grid item xs={6} className={classes.pathContainer}>
                    {/* path/path/path/path/path/path */}
                 </Grid>
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
                </Paper>
              </Grid>
            </Grid>
          </form>
        )} />);
  }
}

export default compose<any, any, any>(
  connect(
    (state: any) => ({
      menuState: getMenuStatus(state),
      service: getService(state),
      workplace: getWorkplace(state),
      run: getRun(state),
    }),
    ((dispatch: any, props: any) => ({
      setMenuState(state: boolean) {
        dispatch(setMenuState(state));
      },
      setMenuContent(type: string) {
        dispatch(setMenuContent(type));
        dispatch(setMenuState(!props.menuState));
      },
      fetchSamples(data: any) {
        dispatch(combineGetSamplesByDataSetAndRun(data))
      }
    })
    )
  ),
  withStyles(styles))
  (Header)