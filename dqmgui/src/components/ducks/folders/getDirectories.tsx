import { AnyAction } from 'redux';
import { pathOr } from "ramda";

interface DefaultState {
  directories: any
}

const defaultState: DefaultState = {
  directories: [],
}

const SET_DIRECTORIES = "SET_DIRECTORIES"

export default function directoriesReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_DIRECTORIES:
      return { ...state, directories: payload };
    default:
      return state;
  }
}

export const setDirectories = (data: any) => ({
  type: SET_DIRECTORIES,
  payload: data,
})

export const getDirectoriesNames = (state: any): string[] => pathOr([], ['DATA', 'DIRECTORIES', 'directories'], state);
