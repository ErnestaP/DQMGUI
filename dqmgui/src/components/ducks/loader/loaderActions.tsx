import { AnyAction } from 'redux';
import { path } from 'ramda';

interface DefaultState {
  isLoading: boolean;
}

const defaultState: DefaultState = {
  isLoading: false
}

const SET_LOADER = "SET_LOADER"

export const setLoader = (data: boolean) => ({
  type: SET_LOADER,
  payload: data
})

export default function LaoderReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_LOADER:
      return ({ ...state, isLoading: payload })
    default:
      return state;
  }
}

export const getLoaderState = (state: any) => path(['LOADER', 'isLoading'], state);
