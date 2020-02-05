import { createStore, applyMiddleware } from 'redux';
import createReducer from './redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxPromise from 'redux-promise';

import { Reducer } from './reducer'

export const store = createStore(Reducer, composeWithDevTools(
   applyMiddleware(ReduxPromise),
));