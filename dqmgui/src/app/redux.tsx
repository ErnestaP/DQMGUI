import { combineReducers } from 'redux';

import SideMenuReducer from '../components/ducks/sideNav/setMenuStatus'
import ServicesReducer from '../components/ducks/header/setActiveTabs'
import GetSamplesReducer from '../components/ducks/header/fetchSamples'
import LaoderReducer from '../components/ducks/loader/loaderActions';
import TablesExpandedLineReducer from '../components/ducks/table/selectedDataSet';

const appReducer = combineReducers({
    'MENU': SideMenuReducer,
    'ACTIVE_TABS': ServicesReducer,
    'SAMPLES': combineReducers({
        'SAMPLES_LIST': GetSamplesReducer,
    }),
    'LOADER': LaoderReducer,
    'TABLE': combineReducers({
        'SELECTED_DATA_SET': TablesExpandedLineReducer,
    })
})

export default function createReducer() {
    return appReducer
}
