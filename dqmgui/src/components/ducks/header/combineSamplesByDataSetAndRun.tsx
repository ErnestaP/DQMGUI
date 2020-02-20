import { pathOr } from 'ramda'
import { fetchSamplesByDatasetAction, fetchSamplesByRunAction } from './fetchSamples'

export const combineGetSamplesByDatasetAndRun: any = (formValues: any) => (dispatch, getState) => {
  const searchFieldByRun: string = pathOr('', ['searchFieldByRun'], formValues)
  const searchFieldByDataset: string = pathOr('', ['searchField'], formValues)

  if (searchFieldByDataset && searchFieldByRun) {
    dispatch(fetchSamplesByDatasetAction(searchFieldByDataset, searchFieldByRun))
  }
  else if (searchFieldByDataset && !searchFieldByRun) {
    dispatch(fetchSamplesByDatasetAction(searchFieldByDataset)) 
  }
  else if (searchFieldByRun && !searchFieldByDataset) {
    dispatch(fetchSamplesByRunAction(searchFieldByRun)) 
  }
}

