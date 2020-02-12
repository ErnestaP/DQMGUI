import { AnyAction } from 'redux';
import { path } from 'ramda';

interface DefaultState {
  isOpen: boolean,
  content: string[]
}

const defaultState: DefaultState = {
  isOpen: false,
  content: []
}

const TOGGLE_DIALOG = "TOGGLE_DIALOG"
const DIALOG_CONTENT = "DIALOG_CONTENT"

export default function dialogReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case TOGGLE_DIALOG:
      return { ...state, isOpen: payload };
    case DIALOG_CONTENT:
      return { ...state, content: payload };
    default:
      return state;
  }
}

export const setDialogState = (data: any) => ({
  type: TOGGLE_DIALOG,
  payload: data,
})

export const setDialogContent = (data: any) => ({
  type: DIALOG_CONTENT,
  payload: data,
})


export const getisOpenDialog = (state: any) => path(['DIALOG', 'isOpen'], state);
export const getDialogContent = (state: any) => path(['DIALOG', 'content'], state);