import { combineReducers } from 'redux';

import SideMenuReducer from '../components/ducks/sideNav/setMenuStatus'
import ServicesReducer from '../components/ducks/header/setPaths'
import FormReducer from '../components/ducks/table/submitForm'
import LoaderReducer from '../components/ducks/loader/loaderActions';
import SelectedDataReducer from '../components/ducks/table/selectedData';
import DisplayReducer from '../components/ducks/header/sizeChanger';

const appReducer = combineReducers({
    'MENU': SideMenuReducer,
    'ACTIVE_TABS': ServicesReducer,
    'FORM': FormReducer,
    'LOADER': LoaderReducer,
    'TABLE': combineReducers({
        'SELECTED_DATA': SelectedDataReducer,
    }),
    'DISPLAY': DisplayReducer,
})

export default function createReducer() {
    return appReducer
}
