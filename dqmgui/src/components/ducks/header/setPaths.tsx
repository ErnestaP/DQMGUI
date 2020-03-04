import { AnyAction } from 'redux';
import { pathOr } from 'ramda';
import { createSelector } from 'reselect'

interface DefaultState {
  service: string
  workplace: string
  run: string
  dataset: string
  path: string
  subdirectories: string[]
}

const defaultState: DefaultState = {
  service: '',
  workplace: '',
  run: '',
  dataset: '',
  path: '',
  subdirectories: [],
}

const SET_SERVICE = "SET_SERVICE"
const SET_WORKPLACES = "SET_WORKPLACES"
const SET_RUN = "SET_RUN"
const SET_DATA_SET = "SET_DATA_SET"
const SET_PATH = "SET_PATH"
const SET_SUBDIRECTORY = "SET_SUBDIRECTORY"
const CLEAN_SUBDIRECTORIES = "CLEAN_SUBDIRECTORIES"

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
    case SET_SUBDIRECTORY:
      return { ...state, subdirectories: payload };
    case CLEAN_SUBDIRECTORIES:
      return { ...state, subdirectories: payload }
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


export const set_subdirectory = (data: any) => (dispatch, getState) => {
  const setted_subdirectories: string[] = get_subdirectories(getState())
  setted_subdirectories.push(data)
  return ({
    type: SET_SUBDIRECTORY,
    payload: setted_subdirectories,
  })
}

export const cleanSubdirectories = () => ({
  type: CLEAN_SUBDIRECTORIES,
  payload: [],
})

export const setPath = (data: any) => (dispatch, getState) => {
  return ({
    type: SET_PATH,
    payload: data,
  })
}

export const set_path_for_folders = (data: any) => (dispatch, getState) => {
  const setted_path = getPath(getState())
  const new_path = [setted_path, data].join('/')
  return ({
    type: SET_PATH,
    payload: new_path,
  })
}

export const getService = (state: any): string => pathOr('', ['ACTIVE_TABS', 'service'], state);
export const getWorkplace = (state: any): string => pathOr('', ['ACTIVE_TABS', 'workplace'], state);
export const getRun = (state: any): string => pathOr('', ['ACTIVE_TABS', 'run'], state);
export const getDataset = (state: any): string => pathOr('', ['ACTIVE_TABS', 'dataset'], state);
export const getPath = (state: any): string => pathOr('', ['ACTIVE_TABS', 'path'], state);
export const get_subdirectories = (state: any): string[] => pathOr([], ['ACTIVE_TABS', 'subdirectories'], state);

export const path_for_header = createSelector(
  getDataset,
  getRun,
  get_subdirectories,
  (dataset, run, directories) => {
    console.log(directories)
    return [dataset, run].concat(directories).join('/')
  }
)
