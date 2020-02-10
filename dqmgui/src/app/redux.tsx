import { assoc } from 'ramda';
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'

import SideMenuReducer from '../components/ducks/sideNav/setMenuStatus'
import ServicesReducer from '../components/ducks/header/setActiveTabs'

const appReducer = combineReducers({
    'MAIN_FORM': formReducer,
    'MENU': SideMenuReducer,
    'ACTIVE_TABS': ServicesReducer,
})

export default function createReducer() {
    return appReducer
  }
  