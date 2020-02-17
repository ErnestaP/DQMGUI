import { pathOr } from 'ramda'
import { fetchSamplesByDataSetAction, setSample, getSamplesByDataSet } from './fetchSamplesByDataset'
import { fetchSamplesByRunAction, getSamplesByRuns } from './fetchSamplesByRun'

export const combineGetSamplesByDataSetAndRun: any = (formValues: any) => (dispatch, getState) => {
    const searchFieldByRun: string = pathOr('', ['searchFieldByRun'], formValues)
    const searchFieldByDataSet: string = pathOr('', ['searchField'], formValues)

    if (searchFieldByDataSet && searchFieldByRun) {
        dispatch(fetchSamplesByDataSetAction(searchFieldByDataSet, searchFieldByRun))
    }
    else if (searchFieldByDataSet && !searchFieldByRun) {
        dispatch(fetchSamplesByDataSetAction(searchFieldByDataSet)) &&
            dispatch(fetchSamplesByRunAction(null))
    }
    else if (searchFieldByRun && !searchFieldByDataSet) {
        dispatch(fetchSamplesByRunAction(searchFieldByRun)) &&
            dispatch(fetchSamplesByDataSetAction(null))
    }
}