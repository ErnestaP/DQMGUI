import { AnyAction } from 'redux';
import { pathOr } from 'ramda';

import { SizeProps } from 'src/app/interfaces';

interface DefaultState {
  size: SizeProps,
  additionalSize: SizeProps,
}

const defaultState: DefaultState = {
  size: {
    w: 266,
    h: 200,
  },
  additionalSize: {
    w: 720,
    h: 541,
  }
}

const SET_SIZE = "SET_SIZE"
const SET_SIZE_ON_ADDITIONAL_PLOTS = "SET_SIZE_ON_ADDITIONAL_PLOTS"

export default function displayReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_SIZE:
      return { ...state, size: payload }
    case SET_SIZE_ON_ADDITIONAL_PLOTS:
      return { ...state, additionalSize: payload }
    default:
      return state;
  }
}

export const setSize = (data: any) => ({
  type: SET_SIZE,
  payload: data,
})

export const setSizeOnAdditionalPlots = (data: any) => ({
  type: SET_SIZE_ON_ADDITIONAL_PLOTS,
  payload: data,
})

export const getSize = (state: any): string => pathOr('', ['PLOTS','SIZES', 'size'], state);
export const getAdditionalPlotsSize = (state: any): string => pathOr('', ['PLOTS', 'SIZES', 'additionalSize'], state);
