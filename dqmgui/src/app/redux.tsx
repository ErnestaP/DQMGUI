import { combineReducers } from 'redux';

import SideMenuReducer from '../components/ducks/sideNav/setMenuStatus'
import ServicesReducer from '../components/ducks/header/setActiveTabs'
import GetSamplesReducer from '../components/ducks/header/fetchSamplesByDataset'
import LaoderReducer from '../components/ducks/loader/loaderActions';
import SamplesByRunReducer from '../components/ducks/header/fetchSamplesByRun';

const appReducer = combineReducers({
    'MENU': SideMenuReducer,
    'ACTIVE_TABS': ServicesReducer,
    'SAMPLES': combineReducers({
        'SAMPLES_BY_DATASET': GetSamplesReducer,
        'LOADER': LaoderReducer,
        'SAMPLES_BY_RUN': SamplesByRunReducer,
    })
})

export default function createReducer() {
    return appReducer
}
