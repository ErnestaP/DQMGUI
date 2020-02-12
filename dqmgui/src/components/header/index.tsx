import * as React from 'react';
import { Grid, withStyles, StyleRulesCallback, StyledComponentProps, Button } from '@material-ui/core'
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

const styles = (theme: any) => ({

  header: {
    background: theme.palette.primary.main,
    margin: '-8px',
    width: '100vw',
    height: '6vh',
    display: "flex",
    alignItems: 'center',
    color: theme.palette.common.white,
    marginBottom: '8px',
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
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.025rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.125rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.225rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.325rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '1.425rem',
    },
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.primary.light,
    margin: '-8px',
    width: '100vw',
    marginBottom: '8px',
    paddingBottom: '8px',
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
        <Grid item container>
          <Grid item container className={classes.header}>
            <Grid item xs={2}>
              <img src={Logo} className={classes.logo} onClick={() => setMenuState(!menuState)}></img>
            </Grid>
            <Grid item xs={3} >
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
            <Grid item xs={3}>
              <Time classes={classes.time} />
            </Grid>
          </Grid>
          <Grid item container className={classes.searchBar}>
            <Grid item xs={4}>
              <Field
                name="searchField"
                placeholder="Search"
                fullWidth={true}
                component={TextField} />
            </Grid>
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