import { AnyAction } from 'redux';
import { path } from 'ramda';

interface DefaultState {
  service: string
  workplace: string
  run: string
}

const defaultState: DefaultState = {
  service: 'Online',
  workplace: 'Summary',
  run: '1212',
}

const SET_SERVICE = "SET_SERVICE"
const SET_WORKPLACES = "SET_WORKPLACES"
const SET_RUN = "SET_RUN"

export default function serviceSetReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_SERVICE:
      return { ...state, service: payload };
    case SET_WORKPLACES:
      return { ...state, workplace: payload };
    case SET_RUN:
      return { ...state, run: payload };
    default:
      return state;
  }
}

export const setService = (data: any) => ({
  type: SET_SERVICE,
  payload: data,
})

export const setWorkplace = (data: any) => ({
  type: SET_WORKPLACES,
  payload: data,
})

export const setRun = (data: any) => ({
  type: SET_RUN,
  payload: data,
})


export const getService = (state: any) => path(['ACTIVE_TABS', 'service'], state);
export const getWorkplace = (state: any) => path(['ACTIVE_TABS', 'workplace'], state);
export const getRun = (state: any) => path(['ACTIVE_TABS', 'run'], state);