import { AnyAction } from 'redux';
import { pathOr } from 'ramda';

interface DefaultState {
  position: string,
  normalize: boolean,
  showReferenceForAll: boolean,
  runsInReference: string[],
}

const defaultState: DefaultState = {
  position: '',
  normalize: false,
  showReferenceForAll: false,
  runsInReference: [],
}

const SET_POSITION = "SET_POSITION"
const SET_NORMALIZATION = "SET_NORMALIZATION"
const SET_SHOW_REFERENCE_FOR_ALL = "SET_SHOW_REFERENCE_FOR_ALL"
const SET_RUNS_IN_REFERENCE = "SET_RUNS_IN_REFERENCE"

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

export const setShowReferenceForAll = (data: any) => ({
  type: SET_SHOW_REFERENCE_FOR_ALL,
  payload: data,
})

export const selectRunInReference = (data: any) => ({
  type: SET_SHOW_REFERENCE_FOR_ALL,
  payload: data,
})

export const getPosition = (state: any): string => pathOr('', ['PLOTS', 'REFERENCE', 'position'], state);
export const getNormalization = (state: any): string => pathOr('', ['PLOTS', 'REFERENCE', 'normalize'], state);
export const getShowReferenceForAll = (state: any): string => pathOr('', ['PLOTS', 'REFERENCE', 'showReferenceForAll'], state);
export const getSettedRunsInReference = (state: any): string => pathOr('', ['PLOTS', 'REFERENCE', 'runsInReference'], state);
