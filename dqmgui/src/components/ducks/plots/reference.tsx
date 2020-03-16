import { AnyAction } from 'redux';
import { pathOr } from 'ramda';
import { RunInterface } from '../header/interfaces';

interface DefaultState {
  position: string,
  normalize: boolean,
  showReferenceForAll: boolean,
  runsInReference: string[],
  names: string[];
  dataForOverlay: {}
}

const defaultState: DefaultState = {
  position: '',
  normalize: false,
  showReferenceForAll: false,
  runsInReference: [],
  names: [],
  dataForOverlay: { 1: { run: '', dataset: '', label: '', selected: false } }
}

const SET_POSITION = "SET_POSITION"
const SET_NORMALIZATION = "SET_NORMALIZATION"
const SET_SHOW_REFERENCE_FOR_ALL = "SET_SHOW_REFERENCE_FOR_ALL"
const SET_RUNS_IN_REFERENCE = "SET_RUNS_IN_REFERENCE"
const SET_ALL_NAMES = "SET_ALL_NAMES"
const SET_DATA_FOR_OVERLAY = "SET_DATA_FOR_OVERLAY"

export default function positionReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_POSITION:
      return { ...state, position: payload }
    case SET_NORMALIZATION:
      return { ...state, normalize: payload }
    case SET_SHOW_REFERENCE_FOR_ALL:
      return { ...state, showReferenceForAll: payload }
    case SET_RUNS_IN_REFERENCE:
      return { ...state, runsInReference: payload }
    case SET_ALL_NAMES:
      return { ...state, names: payload }
    case SET_DATA_FOR_OVERLAY:
      return { ...state, dataForOverlay: payload }
    default:
      return state;
  }
}

export const setPosition = (data: any) => ({
  type: SET_POSITION,
  payload: data,
})

export const setNormalization = (data: any) => ({
  type: SET_NORMALIZATION,
  payload: data,
})

export const setDataForOverlay = (data: any) => (dispatch, getState) => {
  const propsNames = Object.keys(data)
  const propsValues = Object.values(data)
  const dataForOverlay = getDataForOverlay(getState())

  propsNames.map((propName, index) => {
    const splittedName = propName.split('_')
    const id = splittedName[1]
    if (!dataForOverlay[id]) {
      dataForOverlay[id] = { run: '', dataset: '', label: '', selected: false }
    }
    dataForOverlay[id][splittedName[0]] = propsValues[index]
    return dataForOverlay
  })

  dispatch({
    type: SET_DATA_FOR_OVERLAY,
    payload: dataForOverlay,
  })
}
export const deleteDataForOverlay = (id: any) => (dispatch, getState) => {
  const dataForOverlay = getDataForOverlay(getState())
  if (dataForOverlay[id]) {
    delete dataForOverlay[id]
  }

  dispatch({
    type: SET_DATA_FOR_OVERLAY,
    payload: dataForOverlay,
  })
}

export const setShowReferenceForAll = (data: any) => ({
  type: SET_SHOW_REFERENCE_FOR_ALL,
  payload: data,
})


export const selectRunsInReference = (data: RunInterface) => (dispatch: any, getState: any) => {
  const allSelectedRuns: RunInterface[] = [...getSettedRunsInReference(getState())]
  allSelectedRuns.push(data)

  dispatch({
    type: SET_RUNS_IN_REFERENCE,
    payload: allSelectedRuns
  })
}

export const removeRunsInReference = (data: RunInterface) => (dispatch: any, getState: any) => {
  const allSelectedRuns: RunInterface[] = getSettedRunsInReference(getState())
  const filtered = allSelectedRuns.filter((run: RunInterface) => run.id !== data.id)

  dispatch({
    type: SET_RUNS_IN_REFERENCE,
    payload: filtered
  })
}


export const setAllNames = (data: any) => ({
  type: SET_ALL_NAMES,
  payload: data,
})

export const getPosition = (state: any): string => pathOr('', ['PLOTS', 'REFERENCE', 'position'], state);
export const getNormalization = (state: any): string => pathOr('', ['PLOTS', 'REFERENCE', 'normalize'], state);
export const getShowReferenceForAll = (state: any): string => pathOr('', ['PLOTS', 'REFERENCE', 'showReferenceForAll'], state);
export const getSettedRunsInReference = (state: any): RunInterface[] => pathOr([], ['PLOTS', 'REFERENCE', 'runsInReference'], state);
export const getNames = (state: any): string[] => pathOr([], ['PLOTS', 'REFERENCE', 'names'], state);
export const getDataForOverlay = (state: any): string[] => pathOr([], ['PLOTS', 'REFERENCE', 'dataForOverlay'], state);
