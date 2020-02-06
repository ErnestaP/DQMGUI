import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles/';
import { Provider } from 'react-redux';

import theme from './theme'
import './styles.scss';
import DQMGUI from '../components/application/app'
import { store } from './store'

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <DQMGUI />
      </Provider>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
