import { AnyAction } from 'redux';
import { path } from 'ramda';

interface DefaultState {
  selectedDataset: null,
  selectedRun: null,
}

const defaultState: DefaultState = {
  selectedDataset: null,
  selectedRun: null,
}

const SET_SELECTED_DATA = "SET_SELECTED_DATA"
const SET_SELECTED_RUN = "SET_SELECTED_RUN"

export default function selectedDataReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_SELECTED_DATA:
      return { ...state, selectedDataset: payload };
    case SET_SELECTED_RUN:
      return { ...state, selectedRun: payload };
    default:
      return state;
  }
}

export const setSelectedDataset = (data: any) => {
  return ({
    type: SET_SELECTED_DATA,
    payload: data,
  })
}

export const setSelectedRun = (data: any) => {
  return ({
    type: SET_SELECTED_RUN,
    payload: data,
  })
}

export const getSelectedDataset = (state: any) => {
  return path(['TABLE', 'SELECTED_DATA', 'selectedDataset'], state);
}

export const getSelectedRun = (state: any) => {
  return path(['TABLE', 'SELECTED_DATA', 'selectedRun'], state);
}
