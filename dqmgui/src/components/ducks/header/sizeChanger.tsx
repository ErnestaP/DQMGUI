import { AnyAction } from 'redux';
import { pathOr } from 'ramda';
import { createSelector } from 'reselect'

import { SizeProps } from 'src/app/interfaces';

interface DefaultState {
  size: SizeProps
}

const defaultState: DefaultState = {
  size: {
    w: 266,
    h: 200,
  }
}

const SET_SIZE = "SET_SIZE"

export default function displayReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_SIZE:
      return { ...state, size: payload }
    default:
      return state;
  }
}

export const setSize = (data: any) => ({
  type: SET_SIZE,
  payload: data,
})

export const getSize = (state: any): string => pathOr('', ['DISPLAY', 'size'], state);
