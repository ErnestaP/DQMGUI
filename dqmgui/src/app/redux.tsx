import { assoc } from 'ramda';
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'

import SideMenuReducer from '../components/ducks/sideNav/setMenuStatus'
import ServicesReducer from '../components/ducks/header/setActiveTabs'
import GetSamplesReducer from '../components/ducks/header/fetchSamplesByDataset'
import LaoderReducer from '../components/ducks/loader/loaderActions';
import SamplesByRunReducer from '../components/ducks/header/fetchSamplesByRun';

const appReducer = combineReducers({
    'form': formReducer,
    'MENU': SideMenuReducer,
    'ACTIVE_TABS': ServicesReducer,
    'SAMPLES': GetSamplesReducer,
    'LOADER': LaoderReducer,
    'SAMPLES_BY_RUN': SamplesByRunReducer,
})

export default function createReducer() {
    return appReducer
  }
  