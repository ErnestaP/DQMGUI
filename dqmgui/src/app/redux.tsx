import { combineReducers } from 'redux';

import SideMenuReducer from '../components/ducks/sideNav/setMenuStatus'
import ServicesReducer from '../components/ducks/header/setPaths'
import SearchReducer from '../components/ducks/table/form'
import LoaderReducer from '../components/ducks/loader/loaderActions';
import SelectedDataReducer from '../components/ducks/table/selectedData';
import DisplayReducer from '../components/ducks/plots/sizeChanger';
import ReferenceReducer from '../components/ducks/plots/reference';

const appReducer = combineReducers({
  'DATA': combineReducers({
    'FILTER': combineReducers({
      'SEARH_FIELDS': SearchReducer,
      'ACTIVE_TABS': ServicesReducer,
    }),
    'PLOTS': combineReducers({
      'REFERENCE': ReferenceReducer,
      'SIZES': DisplayReducer,
    })
  }),
  'UI': combineReducers({
    'LOADER': LoaderReducer,
    'SIDE_MENU': SideMenuReducer
  })
})

export default function createReducer() {
  return appReducer
}
