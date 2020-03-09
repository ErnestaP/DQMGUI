import { combineReducers } from 'redux';

import SideMenuReducer from '../components/ducks/sideNav/setMenuStatus'
import ServicesReducer from '../components/ducks/header/setPaths'
import FormReducer from '../components/ducks/table/form'
import LoaderReducer from '../components/ducks/loader/loaderActions';
import SelectedDataReducer from '../components/ducks/table/selectedData';
import DisplayReducer from '../components/ducks/plots/sizeChanger';
import ReferenceReducer from '../components/ducks/plots/reference';

const appReducer = combineReducers({
    'MENU': SideMenuReducer,
    'ACTIVE_TABS': ServicesReducer,
    'FORM': FormReducer,
    'LOADER': LoaderReducer,
    'TABLE': combineReducers({
        'SELECTED_DATA': SelectedDataReducer,
    }),
    'PLOTS': combineReducers({
        'REFERENCE': ReferenceReducer,
        'SIZES': DisplayReducer,
    }),
})

export default function createReducer() {
    return appReducer
}
