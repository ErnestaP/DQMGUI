import { AnyAction } from 'redux';
import { pathOr } from 'ramda';

interface DefaultState {
  searchByDataset: string;
  searchByRun: string;
}

const defaultState: DefaultState = {
  searchByDataset: '',
  searchByRun: '',
}

const SET_SEARCHFIELD_BY_RUN = "SET_SEARCHFIELD_BY_RUN"
const SET_SEARCHFIELD_BY_DATASET = "SET_SEARCHFIELD_BY_DATASET"

export default function form_reducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_SEARCHFIELD_BY_DATASET:
      return { ...state, searchByDataset: payload };
    case SET_SEARCHFIELD_BY_RUN:
      return { ...state, searchByRun: payload };
    default:
      return state;
  }
}

export const setSearachFieldByDataset = (data: any) => ({
  type: SET_SEARCHFIELD_BY_DATASET,
  payload: data,
})

export const setSearachFieldByRun = (data: any) => ({
  type: SET_SEARCHFIELD_BY_RUN,
  payload: data,
})

export const getSearchFieldByDataset = (state: any): string => pathOr('', ['DATA', 'FILTER', 'SEARH_FIELDS', 'searchByDataset'], state);
export const getSearchFieldByRun = (state: any): string => pathOr('', ['DATA', 'FILTER', 'SEARH_FIELDS', 'searchByRun'], state);

