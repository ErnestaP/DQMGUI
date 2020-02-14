import * as React from 'react';
import { Grid, withStyles, Icon, StyledComponentProps, Button, Paper } from '@material-ui/core'
import Search from '@material-ui/icons/Search';
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { Form, Field, reduxForm } from 'redux-form'

import Logo from '../../../images/CMSlogo_color_nolabel_1024_May2014.png';
import { setMenuState, getMenuStatus, setMenuContent } from '../ducks/sideNav/setMenuStatus'
import { getService, getWorkplace, getRun } from '../ducks/header/setActiveTabs'
import { Time } from './time'
import { SERVICES, WORKPLACES, RUN } from '../constants'
import { fetchSamplesByDataSetAction } from '../ducks/header/fetchSamplesByDataset'
import TextField from '../common/textField'
import User from '../userInfo'

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
  searchBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    marginBottom: '8px',
    paddingBottom: '8px',
  },
  searchFields: {
    padding: '0px !important',
    paddingRight: '8px !important'
  },
  cms: {
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  services: {
    height: "fit-content"
  },
  service: {
    background: '#00acc1'
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
  fetchSamples(): string[];
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
        ...props } = this.props

    return (
      <Form onSubmit={(event) => { event.preventDefault(); fetchSamples() }}>
        <Grid item container className={classes.wrapper}>
          <Grid item container xs={12} className={classes.header}>
            <Grid container xs={6} item >
              <Grid item xs={2}>
                <img src={Logo} className={classes.logo} 
                // onClick={() => setMenuState(!menuState)}
                ></img>
              </Grid>
              {/* <Grid item xs={8} container spacing={4} justify="flex-start" className={classes.services}>
                <Grid item onClick={() => setMenuContent(SERVICES)} className={classes.service}>
                  {service}
                </Grid>
                <Grid item onClick={() => setMenuContent(WORKPLACES)} className={classes.service}>
                  {workplace}
                </Grid>
                <Grid item onClick={() => setMenuContent(RUN)} className={classes.service}>
                  {run}
                </Grid>
              </Grid> */}
            </Grid>
            <Grid item className={classes.timeWrapper}>
              <Time classes={classes.time} />
            </Grid>
          </Grid>
          <Grid container item xs={12} justify="flex-end" className={classes.searchContainer}>
            <Paper className={classes.paper}>
              <Grid item xs={6} className={classes.pathContainer}>
                path/path/path/path/path/path
            </Grid>
              <Grid container item justify="flex-end">
                <Grid item xs={4} className={classes.searchFields}>
                  <Field
                    name="searchField"
                    placeholder="Search by Data set"
                    fullWidth={true}
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={4} className={classes.searchFields}>
                  <Field
                    name="searchFieldByRun"
                    placeholder="Search by Run"
                    fullWidth={true}
                    component={TextField}
                  />
                </Grid>
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
      </Form>
    );
  }
}

export default compose<any, any, any, any>(
  reduxForm({
    form: "MAIN_FORM",
  }),
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
      fetchSamples() {
        dispatch(fetchSamplesByDataSetAction())
      }
    })
    )
  ),
  withStyles(styles))
  (Header)