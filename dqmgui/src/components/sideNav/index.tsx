import * as React from 'react';
import { Grid, withStyles, Icon, IconButton, Button } from '@material-ui/core'
import Logo from '../../../images/CMSlogo_color_nolabel_1024_May2014.jpg';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Form, reduxForm } from 'redux-form'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { MenuContentSwitcher } from './contentSwitcher'
import { getMenuStatus, getMenuContent } from '../ducks/sideNav/setMenuStatus'

const styles = (theme: any) => ({
  header: {
    background: theme.palette.secondary.main,
    margin: '-8px',
    height: '94vh',
    [theme.breakpoints.up('xl')]: {
      width: '12vw',
    },
    [theme.breakpoints.down('lg')]: {
      width: '14vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '16vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '30vw',
    },
    opacity: 0.6,
    color: theme.palette.primary.main,
    display: 'flex',
    paddingLeft: '8px',
    paddingTop: '8px'
  },
  userLogo: {
    color: theme.palette.primary.main,
    width: '100%',
    height: '100%',
  },
  iconButton: {
    padding: '8px',
  },
  iconButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    padding: '8px',
  },
  open: {
    width: 'fit-content',
  },
  close: {
    width: '0'
  },
  buttonDisplay: {
    display: 'fixed',
  },
  buttonDisplayNone: {
    display: 'none',
  },
  closebtn: {
    width: 'fit-content',
    height: 'fit-content',
  }
})

interface SideNavProps {
  services: any;
  worskpace: any;
  run: number;
  ls: number;
  event: string;
  date: Date;
  classes: any;
  isOpened: boolean;
  content: string;
}

class SideNav extends React.Component<SideNavProps> {
  state = ({
    open: false
  })

  toggleMenu = () => (
    this.setState({
      open: !this.state.open
    })
  )

  render() {
    const { classes, isOpened, content } = this.props
    const closeOrOpen = this.state.open ? classes.open : classes.open
    const hidden = this.state.open ? classes.buttonDisplayNone : classes.buttonDisplayNone

    return (
      <React.Fragment>
        {isOpened &&
          <Grid item container className={classes.header} direction="row" spacing={8} >
            <Form onSubmit={() => { }}>
              {/* <Workplaces /> */}
              <MenuContentSwitcher type={content} />
            </Form>
          </Grid>
        }
      </React.Fragment>
    );

  }
}

export default compose<any, any, any, any>(
  connect(
    (state: any) => ({
      isOpened: getMenuStatus(state),
      content: getMenuContent(state)
    })
  ),
  reduxForm({
    form: "NAVIGATION_FORM",
    enableReinitialize: true,
  }),
  withStyles(styles))
  (SideNav)