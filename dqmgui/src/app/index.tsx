import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles/';
import { Provider } from 'react-redux';
import { Grid } from '@material-ui/core';

import theme from './theme'
import './styles.scss';
import SideNavigation from '../components/sideNav'
import Header from '../components/header'
import { store } from './store'

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Grid container className="Main" direction="column">
          <Grid item >
            <Header />
          </Grid>
          <Grid item>
            <SideNavigation />
          </Grid>
        </Grid>
      </Provider>
    </MuiThemeProvider>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));
