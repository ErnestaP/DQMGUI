import { AnyAction } from 'redux';
import { pathOr } from 'ramda';
import { createSelector } from 'reselect'
import cleanDeep from 'clean-deep';
import { plotInterface } from './interfaces';

interface DefaultState {
  service: string
  workspace: string
  run: string
  dataset: string
  path: string
  subdirectories: string[],
  plots: plotInterface[]
}

const defaultState: DefaultState = {
  service: '',
  workspace: '',
  run: '',
  dataset: '',
  path: '',
  subdirectories: [],
  plots: []
}

const SET_SERVICE = "SET_SERVICE"
const SET_WORKSPACES = "SET_WORKSPACES"
const SET_RUN = "SET_RUN"
const SET_DATA_SET = "SET_DATA_SET"
const SET_PATH = "SET_PATH"
const SET_SUBDIRECTORY = "SET_SUBDIRECTORY"
const CLEAN_SUBDIRECTORIES = "CLEAN_SUBDIRECTORIES"
const SET_SELECTED_PLOTS = "SET_SELECTED_PLOTS"


export default function serviceSetReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_SERVICE:
      return { ...state, service: payload };
    case SET_WORKSPACES:
      return { ...state, workspace: payload };
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
    case SET_SELECTED_PLOTS:
      return { ...state, plots: payload }
    default:
      return state;
  }
}

export const setService = (data: any) => ({
  type: SET_SERVICE,
  payload: data,
})

export const setWorkspace = (data: any) => ({
  type: SET_WORKSPACES,
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

export const setSelectedPlot = (name: any) => (dispatch, getState) => {
  const selectedPlots: string[] = [...getSelectedPlots(getState())]
  const select = selectedPlots.map(plot => {
    if (plot.name === name) {
      return plot.selected = true
    }
    return plot
  })

  dispatch({
    type: SET_SELECTED_PLOTS,
    payload: select,
  })
}

export const removeSelectedPlot = (name: any) => (dispatch, getState) => {
  const selectedPlots: string[] = [...getSelectedPlots(getState())]
  const deselect = selectedPlots.map(plot => {
    if (plot.name === name) {
      return plot.selected = false
    }
    return plot
  })

  dispatch({
    type: SET_SELECTED_PLOTS,
    payload: deselect,
  })
}

export const addStats = (name: any) => (dispatch, getState) => {
  const selectedPlots: string[] = [...getSelectedPlots(getState())]
  const addedStats = selectedPlots.map(plot => {
    if (plot.name === name) {
      return plot.stats = true
    }
    return plot
  })

  dispatch({
    type: SET_SELECTED_PLOTS,
    payload: addedStats,
  })
}

export const removeStats = (name: any) => (dispatch, getState) => {
  const selectedPlots: string[] = [...getSelectedPlots(getState())]
  const removedStats = selectedPlots.map(plot => {
    if (plot.name === name) {
      return plot.stats = false
    }
    return plot
  })

  dispatch({
    type: SET_SELECTED_PLOTS,
    payload: removedStats,
  })
}

export const setOneSelectedPlot = (data: any) => (dispatch, getState) => {
  const selectedPlot: string[] = [data]

  dispatch({
    type: SET_SELECTED_PLOTS,
    payload: selectedPlot,
  })
}


export const back_subdirectory = (data: any) => (dispatch, getState) => {
  const setted_subdirectories: string[] = get_subdirectories(getState())
  const backTo = setted_subdirectories.indexOf(data)
  const restDirectories = cleanDeep(setted_subdirectories.map((directory: string, index: number) => {
    if (index <= backTo) {
      return directory
    }
  }))

  dispatch({
    type: SET_SUBDIRECTORY,
    payload: restDirectories,
  })
}

export const cleanSubdirectories = () => ({
  type: CLEAN_SUBDIRECTORIES,
  payload: [],
})

export const setPath = (data: any) => {
  return ({
    type: SET_PATH,
    payload: data,
  })
}

export const set_path_for_folders = (data: any) => (dispatch, getState) => {
  const setted_path = getPath(getState())
  const new_path = [setted_path, data].join('/')
  dispatch({
    type: SET_PATH,
    payload: new_path,
  })
}

export const getService = (state: any): string => pathOr('', ['DATA', 'FILTER', 'SELECTED', 'service'], state);
export const getWorkspace = (state: any): string => pathOr('', ['DATA', 'FILTER', 'SELECTED', 'workspace'], state);
export const getRun = (state: any): string => pathOr('', ['DATA', 'FILTER', 'SELECTED', 'run'], state);
export const getDataset = (state: any): string => pathOr('', ['DATA', 'FILTER', 'SELECTED', 'dataset'], state);
export const getPath = (state: any): string => pathOr('', ['DATA', 'FILTER', 'SELECTED', 'path'], state);
export const get_subdirectories = (state: any): string[] => pathOr([], ['DATA', 'FILTER', 'SELECTED', 'subdirectories'], state);
export const getSelectedPlots = (state: any): string[] => pathOr([], ['DATA', 'FILTER', 'SELECTED', 'plots'], state);
