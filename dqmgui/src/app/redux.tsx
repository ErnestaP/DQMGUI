import { assoc } from 'ramda';
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'

import SideMenuReducer from '../components/ducks/sideNav/setMenuStatus'
import ServicesReducer from '../components/ducks/header/setActiveTabs'
import GetSamplesReducer from '../components/ducks/header/getDataByEra'

const appReducer = combineReducers({
    'MAIN_FORM': formReducer,
    'MENU': SideMenuReducer,
    'ACTIVE_TABS': ServicesReducer,
    'SAMPLES': GetSamplesReducer,
})

export default function createReducer() {
    return appReducer
  }
  