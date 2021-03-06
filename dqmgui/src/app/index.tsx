import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles/';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';

import theme from './theme'
import './styles.scss';
import { store } from './store'
import dynamicImport from '../common/dynamic-import';

const DQMGUI = dynamicImport(() =>
  import(/* webpackChunkName: "app" */ '../components/application/app'),
);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Router>
            <Route path="/">
              <Switch>
                <Route
                  component={() => <DQMGUI />}
                />
              </Switch>
            </Route>
          </Router>
        </SnackbarProvider>
      </Provider>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
