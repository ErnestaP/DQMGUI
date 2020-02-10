import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxPromise from 'redux-promise';

import createReducer from './redux'

export const store = createStore(createReducer(), composeWithDevTools(
   applyMiddleware(thunk),
));