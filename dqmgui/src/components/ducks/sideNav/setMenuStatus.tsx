import { AnyAction } from 'redux';
import { path } from 'ramda';
import {SERVICES} from '../../sideNav/constants'

interface DefaultState {
  isOpen: boolean,
  content: string,
}

const defaultState: DefaultState = {
  isOpen: false,
  content: SERVICES
}

const SET_MENU_STATE = "SET_MENU_STATE"
const SET_MENU_CONTENT = "SET_MENU_CONTENT"

export default function menuStatusReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_MENU_STATE:
      return { ...state, isOpen: payload };
    case SET_MENU_CONTENT:
      return { ...state, content: payload };
    default:
      return state;
  }
}

export const setMenuState = (data: any) => ({
  type: SET_MENU_STATE,
  payload: data,
})

export const setMenuContent = (data: any) => ({
  type: SET_MENU_CONTENT,
  payload: data,
})

export const getMenuStatus = (state: any) => path(['MENU', 'isOpen'], state);
export const getMenuContent = (state: any) => path(['MENU', 'content'], state);