import { combineReducers } from 'redux';

import SideMenuReducer from '../components/ducks/sideNav/setMenuStatus'
import ServicesReducer from '../components/ducks/header/setPaths'
import SearchReducer from '../components/ducks/table/form'
import LoaderReducer from '../components/ducks/loader/loaderActions';
import PlotsNamesReducer from '../components/ducks/plots/setNames';
import DisplayReducer from '../components/ducks/plots/sizeChanger';
import ReferenceReducer from '../components/ducks/plots/reference';
import DirectoriesReducer from '../components/ducks/folders/getDirectories';

const appReducer = combineReducers({
  'DATA': combineReducers({
    'FILTER': combineReducers({
      'SEARH_FIELDS': SearchReducer,
      'SELECTED': ServicesReducer,
    }),
    'PLOTS': combineReducers({
      'REFERENCE': ReferenceReducer,
      'PLOTS_INFO': combineReducers({
        'SIZES': DisplayReducer,
        'NAMES': PlotsNamesReducer,
      }),
    }),
    'DIRECTORIES': DirectoriesReducer,
  }),
  'UI': combineReducers({
    'LOADER': LoaderReducer,
    'SIDE_MENU': SideMenuReducer
  })
})

export default function createReducer() {
  return appReducer
}
