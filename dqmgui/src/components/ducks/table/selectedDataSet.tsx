import { AnyAction } from 'redux';
import { path } from 'ramda';

interface DefaultState {
  selectedDataset: null,
}

const defaultState: DefaultState = {
  selectedDataset: null,
}

const SET_SELECTED_DATA = "SET_SELECTED_DATA"

export default function tablesExpandedLineReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_SELECTED_DATA:
      return { ...state, selectedDataset: payload };
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

export const getSelectedDataset = (state: any) => {
  return path(['TABLE', 'SELECTED_DATA', 'selectedDataset'], state);
}
