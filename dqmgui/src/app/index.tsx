import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles/';

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import flat from 'core-js-pure/features/array/';
import theme from './theme'
import './styles.scss';
import Header from '../components/header'


const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="Main">
        <Header />
      </div>
    </MuiThemeProvider>)
}


ReactDOM.render(<App />, document.getElementById('root'));
