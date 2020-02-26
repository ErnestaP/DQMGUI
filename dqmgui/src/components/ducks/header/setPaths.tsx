import { AnyAction } from 'redux';
import { pathOr } from 'ramda';

interface DefaultState {
  service: string
  workplace: string
  run: string
  dataset: string
  path: string
}

const defaultState: DefaultState = {
  service: '',
  workplace: '',
  run: '',
  dataset: '',
  path: ''
}

const SET_SERVICE = "SET_SERVICE"
const SET_WORKPLACES = "SET_WORKPLACES"
const SET_RUN = "SET_RUN"
const SET_DATA_SET = "SET_DATA_SET"
const SET_PATH = "SET_PATH"

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
    case SET_PATH:
      return { ...state, path: payload };
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

export const setPath = (data: any) => {
  return ({
    type: SET_PATH,
    payload: data,
  })
}

export const getService = (state: any): string => pathOr('', ['ACTIVE_TABS', 'service'], state);
export const getWorkplace = (state: any): string => pathOr('', ['ACTIVE_TABS', 'workplace'], state);
export const getRun = (state: any): string => pathOr('', ['ACTIVE_TABS', 'run'], state);
export const getDataset = (state: any): string => pathOr('', ['ACTIVE_TABS', 'dataset'], state);
export const getPath = (state: any): string => pathOr('', ['ACTIVE_TABS', 'path'], state);

