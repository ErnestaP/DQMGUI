import { AnyAction } from 'redux';
import { path } from 'ramda';

interface DefaultState {
  selectedDataSet: null,
}

const defaultState: DefaultState = {
  selectedDataSet: null,
}

const SET_SELECTED_DATA_SET = "SET_SELECTED_DATA_SET"

export default function tablesExpandedLineReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  console.log(type)
  switch (type) {
    case SET_SELECTED_DATA_SET:
      return { ...state, selectedDataSet: payload };
    default:
      return state;
  }
}

export const setSelectedDataSet = (data: any) => ({
  type: SET_SELECTED_DATA_SET,
  payload: data,
})

export const getSelectedDataSet = (state: any) => path(['TABLE', 'SELECTED_DATA_SET', 'selectedDataSet'], state);
