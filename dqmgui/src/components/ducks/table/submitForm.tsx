import { AnyAction } from 'redux';
import { pathOr } from 'ramda';

interface DefaultState {
  submitted: boolean;
  searchByDataset: string;
  searchByRun: string;
}

const defaultState: DefaultState = {
  submitted: false,
  searchByDataset: '',
  searchByRun: '',
}

const SUBMIT_FORM = "SUBMIT_FORM"
const SET_SEARCHFIELD_BY_RUN = "SET_SEARCHFIELD_BY_RUN"
const SET_SEARCHFIELD_BY_DATASET = "SET_SEARCHFIELD_BY_DATASET"

export default function form_reducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SUBMIT_FORM:
      return { ...state, submitted: payload };
    case SET_SEARCHFIELD_BY_DATASET:
      return { ...state, searchByDataset: payload };
    case SET_SEARCHFIELD_BY_RUN:
      return { ...state, searchByRun: payload };
    default:
      return state;
  }
}

export const submit_form = (data: any) => ({
  type: SUBMIT_FORM,
  payload: data,
})

export const setSearachFieldByDataset = (data: any) => ({
  type: SET_SEARCHFIELD_BY_DATASET,
  payload: data,
})

export const setSearachFieldByRun = (data: any) => ({
  type: SET_SEARCHFIELD_BY_RUN,
  payload: data,
})


export const is_form_submitted = (state: any): string => pathOr('', ['FORM', 'submitted'], state);
export const getSearchFieldByDataset = (state: any): string => pathOr('', ['FORM', 'searchByDataset'], state);
export const getSearchFieldByRun = (state: any): string => pathOr('', ['FORM', 'searchByRun'], state);

