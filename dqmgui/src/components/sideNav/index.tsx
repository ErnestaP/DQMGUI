import * as React from 'react';
import { Grid, withStyles, Icon, IconButton, Button } from '@material-ui/core'
import Logo from '../../../images/CMSlogo_color_nolabel_1024_May2014.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Form, reduxForm } from 'redux-form'
import { compose } from 'ramda'

import Services from './services'

const styles = (theme: any) => ({
  header: {
    background: theme.palette.secondary.main,
    margin: '-8px',
    height: '100vh',
    width: '13vw',
    opacity: 0.5,
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

interface HeaderInterface {
  services: any;
  worskpace: any;
  run: number;
  ls: number;
  event: string;
  date: Date;
  classes: any;
}

class Header extends React.Component<HeaderInterface> {
  state = ({
    open: false
  })
  toggleMenu = () => (
    this.setState({
      open: !this.state.open
    })
  )
  render() {
    const { classes } = this.props
    const closeOrOpen = this.state.open ? classes.open : classes.open
    const hidden = this.state.open ? classes.buttonDisplayNone : classes.buttonDisplayNone

    return (
      <Grid item container className={`${classes.header} 
        ${closeOrOpen} 'closebtn'`}
        direction="row">
        <Form onSubmit={() => { }}>
          <Services />
        </Form>
      </Grid>
    );

  }
}

export default compose<any, any, any>(
  reduxForm({
    form: "NAVIGATION_FORM",
    enableReinitialize: true,
  }),
  withStyles(styles))
  (Header)