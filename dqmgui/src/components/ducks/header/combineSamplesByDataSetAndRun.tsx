import { pathOr } from 'ramda'
import { fetchSamplesByDataSetAction, fetchSamplesByRunAction } from './fetchSamples'

export const combineGetSamplesByDataSetAndRun: any = (formValues: any) => (dispatch, getState) => {
  const searchFieldByRun: string = pathOr('', ['searchFieldByRun'], formValues)
  const searchFieldByDataSet: string = pathOr('', ['searchField'], formValues)

  if (searchFieldByDataSet && searchFieldByRun) {
    dispatch(fetchSamplesByDataSetAction(searchFieldByDataSet, searchFieldByRun))
  }
  else if (searchFieldByDataSet && !searchFieldByRun) {
    dispatch(fetchSamplesByDataSetAction(searchFieldByDataSet)) 
  }
  else if (searchFieldByRun && !searchFieldByDataSet) {
    dispatch(fetchSamplesByRunAction(searchFieldByRun)) 
  }
}

