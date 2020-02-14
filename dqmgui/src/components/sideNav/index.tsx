import * as React from 'react';
import { Grid, withStyles, Icon, IconButton, Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { MenuContentSwitcher } from './contentSwitcher'
import { getMenuStatus, getMenuContent } from '../ducks/sideNav/setMenuStatus'

const styles = (theme: any) => ({
  header: {
    background: theme.palette.secondary.main,
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
    opacity: 1,
    color: theme.palette.primary.main,
    display: 'flex',
    position: 'fixed',
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

const SideNav = ({ classes, isOpened, content }: SideNavProps) => {
  return (
    <React.Fragment>
      {isOpened &&
        <Grid item container className={classes.header} direction="row" spacing={8}>
          <MenuContentSwitcher type={content} />
        </Grid>
      }
    </React.Fragment>
  );

}

export default compose<any, any, any>(
  connect(
    (state: any) => ({
      isOpened: getMenuStatus(state),
      content: getMenuContent(state)
    })
  ),
  withStyles(styles))
  (SideNav)