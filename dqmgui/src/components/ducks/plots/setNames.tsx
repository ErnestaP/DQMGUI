import { AnyAction } from 'redux';
import { pathOr, assoc } from 'ramda';

interface DefaultState {
  names: any;
}

const defaultState: DefaultState = {
  names: {},
}

const SET_ALL_NAMES = "SET_ALL_NAMES"

export default function plotsNamesReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_ALL_NAMES:
      const names = JSON.parse(JSON.stringify(payload));
      return { ...state, names }
    default:
      return state;
  }
}


export const setAllNames = (data: any) => ({
  type: SET_ALL_NAMES,
  payload: data,
})

export const setSelectedPlot = (name: any) => (dispatch, getState) => {
  const plots = getNames(getState())
  const names = Object.keys(plots)

  plots[name].selected = true

  names.map(nameOfPlot =>
    plots[nameOfPlot].selected = false
  )

  dispatch({
    type: SET_ALL_NAMES,
    payload: plots,
  })
}

export const setSelectedPlots = (name: any) => (dispatch, getState) => {
  const plots = getNames(getState())
  plots[name].selected = true

  dispatch({
    type: SET_ALL_NAMES,
    payload: plots,
  })
}

export const removeSelectedPlot = (name: any) => (dispatch, getState) => {
  const plots = getNames(getState())
  plots[name].selected = false

  dispatch({
    type: SET_ALL_NAMES,
    payload: plots,
  })
}

export const addStats = (name: any) => (dispatch, getState) => {
  const plots = getNames(getState())
  plots[name].stats = true

  dispatch({
    type: SET_ALL_NAMES,
    payload: plots,
  })
}

export const removeStats = (name: any) => (dispatch, getState) => {
  const plots = getNames(getState())
  plots[name].stats = false

  dispatch({
    type: SET_ALL_NAMES,
    payload: plots,
  })
}

export const getNames = (state: any): any => pathOr([], ['DATA', 'PLOTS', 'PLOTS_INFO', 'PLOTS', 'names'], state);
