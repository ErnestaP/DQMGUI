import { AnyAction } from 'redux';
import { path } from 'ramda';

interface DefaultState {
  selectedDataset: null,
}

const defaultState: DefaultState = {
  selectedDataset: null,
}

const SET_SELECTED_DATA_SET = "SET_SELECTED_DATA_SET"

export default function tablesExpandedLineReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  console.log(type)
  switch (type) {
    case SET_SELECTED_DATA_SET:
      return { ...state, selectedDataset: payload };
    default:
      return state;
  }
}

export const setSelectedDataset = (data: any) => ({
  type: SET_SELECTED_DATA_SET,
  payload: data,
})

export const getSelectedDataset = (state: any) => path(['TABLE', 'SELECTED_DATA_SET', 'selectedDataset'], state);
