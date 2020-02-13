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
    background: theme.palette.primary.main,
    margin: '-8px',
    width: '100vw',
    height: '6vh',
    alignItems: 'center',
    color: theme.palette.common.white,
    marginBottom: '8px',
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
    // background: theme.palette.primary.light,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    margin: '-8px',
    width: '100vw',
    marginBottom: '8px',
    paddingBottom: '8px',
  },
  searchFields: {
    padding: '0px !important',
    paddingBottom: '8px  !important',
    paddingRight: '8px !important'
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
        <Grid item container className={classes.header}>
          <Grid container item xs={4}>
            <Grid item xs={4}>
              <img src={Logo} className={classes.logo} onClick={() => setMenuState(!menuState)}></img>
            </Grid>
            <Grid item xs={8} >
              <Button onClick={() => setMenuContent(SERVICES)}>
                {service}
              </Button>
              <Button onClick={() => setMenuContent(WORKPLACES)}>
                {workplace}
              </Button>
              <Button onClick={() => setMenuContent(RUN)}>
                {run}
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={2} justify="flex-end">
            <Grid item xs={12} >
              <User />
            </Grid>
            {/* <Grid item className={classes.timeWrapper} xs={12}>
              <Time classes={classes.time} />
            </Grid> */}
          </Grid>
        </Grid>
        <Paper style={{ width: '100vw', margin: -8 }}>
          <Grid container item xs={12} justify="flex-end" style={{ width: '100vw', justifyContent: 'felx-end', display: 'flex', margin: '-8px', paddingLeft: -16 }}>
            <Grid item xs={2} className={classes.searchFields}>
              <Field
                name="searchField"
                placeholder="Search by Data set"
                fullWidth={true}
                component={TextField}
              />
            </Grid>
            <Grid item xs={2} className={classes.searchFields}>
              <Field
                name="searchFieldByRun"
                placeholder="Search by Run"
                fullWidth={true}
                component={TextField}
              />
            </Grid>
            <Grid item style={{ paddingRight: 32, paddingTop: 4, paddingBottom: 4 }}>
              <Button type="submit" style={{ background: 'aliceblue' }}>
                {/* <Search /> */}
                Search 
              </Button>
            </Grid>
          </Grid>
        </Paper>
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