import { assoc } from 'ramda';
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'

import SideMenuReducer from '../components/ducks/sideNav/setMenuStatus'
import ServicesReducer from '../components/ducks/header/setActiveTabs'
import GetSamplesReducer from '../components/ducks/header/fetchSamplesByDataset'
import LaoderReducer from '../components/ducks/loader/loaderActions';

const appReducer = combineReducers({
    'form': formReducer,
    'MENU': SideMenuReducer,
    'ACTIVE_TABS': ServicesReducer,
    'SAMPLES': GetSamplesReducer,
    'LOADER': LaoderReducer,
})

export default function createReducer() {
    return appReducer
  }
  