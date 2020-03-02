import { combineReducers } from 'redux';

import SideMenuReducer from '../components/ducks/sideNav/setMenuStatus'
import ServicesReducer from '../components/ducks/header/setPaths'
import SearchFieldsReducer from '../components/ducks/header/serchFields'
import LoaderReducer from '../components/ducks/loader/loaderActions';
import SelectedDataReducer from '../components/ducks/table/selectedData';

const appReducer = combineReducers({
    'MENU': SideMenuReducer,
    'ACTIVE_TABS': ServicesReducer,
    // 'SAMPLES': combineReducers({
    //     'SAMPLES_LIST': GetSamplesReducer,
    // }),
    'SEARCH_FIELDS': SearchFieldsReducer,
    'LOADER': LoaderReducer,
    'TABLE': combineReducers({
        'SELECTED_DATA': SelectedDataReducer,
    })
})

export default function createReducer() {
    return appReducer
}
