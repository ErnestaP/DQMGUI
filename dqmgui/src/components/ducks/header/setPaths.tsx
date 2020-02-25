import { AnyAction } from 'redux';
import { path, pathOr } from 'ramda';
import { createSelector } from 'reselect'

import history from '../../../app/routers/history';

interface DefaultState {
  service: string
  workplace: string
  run: string
  dataset: string
}

const defaultState: DefaultState = {
  service: '',
  workplace: '',
  run: '',
  dataset: '',
}

const SET_SERVICE = "SET_SERVICE"
const SET_WORKPLACES = "SET_WORKPLACES"
const SET_RUN = "SET_RUN"
const SET_DATA_SET = "SET_DATA_SET"

export default function serviceSetReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_SERVICE:
      return { ...state, service: payload };
    case SET_WORKPLACES:
      return { ...state, workplace: payload };
    case SET_RUN:
      return { ...state, run: payload };
    case SET_DATA_SET:
      return { ...state, dataset: payload };
    default:
      return state;
  }
}

export const setService = (data: any) => ({
  type: SET_SERVICE,
  payload: data,
})

export const setWorkplace = (data: any) => ({
  type: SET_WORKPLACES,
  payload: data,
})

export const setRun = (data: any) => {
  console.log(data)
  return ({
    type: SET_RUN,
    payload: data,
  })
}

export const setDataset = (data: any) => {
  return ({
    type: SET_DATA_SET,
    payload: data,
  })
}

export const getService = (state: any): string => pathOr('', ['ACTIVE_TABS', 'service'], state);
export const getWorkplace = (state: any): string => pathOr('', ['ACTIVE_TABS', 'workplace'], state);
export const getRun = (state: any): string => pathOr('', ['ACTIVE_TABS', 'run'], state);
export const getDataset = (state: any): string => pathOr('', ['ACTIVE_TABS', 'dataset'], state);

export const getSelectedPath = createSelector(
  getRun,
  getDataset,
  (run, dataset) => {
    const runWithPath = run ? run : ''
    const datasetWithPath = dataset ? dataset : ''
    const path = [datasetWithPath, runWithPath].join('/')

    return path
  }
)

export const getSelectedPathForApi = createSelector(
  getRun,
  getDataset,
  (run: string, dataset: string) => {
    const withoutFirstSlash = dataset.substring(1, dataset.length) as string
    return [run, withoutFirstSlash].join('/')
  }
)

export const changeToDirectoriesRoute = () => (dispatch, getState) =>{
  history.push(getSelectedPathForApi(getState()))
}


