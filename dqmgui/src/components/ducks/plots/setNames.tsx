import { AnyAction } from 'redux';
import { pathOr } from 'ramda';

interface DefaultState {
  names: string[];
}

const defaultState: DefaultState = {
  names: [],
}

const SET_ALL_NAMES = "SET_ALL_NAMES"

export default function plotsNamesReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_ALL_NAMES:
      return { ...state, names: payload }
    default:
      return state;
  }
}


export const setAllNames = (data: any) => ({
  type: SET_ALL_NAMES,
  payload: data,
})

export const setSelectedPlots = (name: any) => (dispatch, getState) => {
  const plots: string[] = [...getNames(getState())]
  const selectPlot = plots.map(plot => {
    if (plot.name === name) {
      const copy = plot
      copy.selected = true
      return copy
    }
    return plot
  })

  dispatch({
    type: SET_ALL_NAMES,
    payload: selectPlot,
  })
}

export const setSelectedPlot = (name: any) => (dispatch, getState) => {
  const plots: string[] = [...getNames(getState())]
  const selectPlot = plots.map(plot => {
    if (plot.name === name) {
      const copy = plot
      copy.selected = true
      return copy
    }
    else {
      const copy = plot
      copy.selected = false
      return plot
    }
  })

  dispatch({
    type: SET_ALL_NAMES,
    payload: selectPlot,
  })
}

export const removeSelectedPlot = (name: any) => (dispatch, getState) => {
  const plots: string[] = [...getNames(getState())]
  const deselectPlot = plots.map(plot => {
    if (plot.name === name) {
      const copy = plot
      copy.selected = false
      return copy
    }
    return plot
  })
  dispatch({
    type: SET_ALL_NAMES,
    payload: deselectPlot,
  })
}

export const addStats = (name: any) => (dispatch, getState) => {
  const selectedPlots: string[] = [...getNames(getState())]
  const addedStats = selectedPlots.map(plot => {
    if (plot.name === name) {
      const copy = plot
      copy.stats = true
      return copy
    }
    return plot
  })

  dispatch({
    type: SET_ALL_NAMES,
    payload: addedStats,
  })
}

export const removeStats = (name: any) => (dispatch, getState) => {
  const selectedPlots: string[] = [...getNames(getState())]
  const removedStats = selectedPlots.map(plot => {
    if (plot.name === name) {
      const copy = plot
      copy.stats = false
      return copy
    }
    return plot
  })
  console.log(removedStats)

  dispatch({
    type: SET_ALL_NAMES,
    payload: removedStats,
  })
}


export const getNames = (state: any): string[] => pathOr([], ['DATA', 'PLOTS', 'PLOTS_INFO', 'NAMES', 'names'], state);
