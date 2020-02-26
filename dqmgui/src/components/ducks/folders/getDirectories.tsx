interface DefaultState {
  directories: any
}

const defaultState: DefaultState = {
  directories: {}
}

const GET_DIRECTORIES = "GET_DIRECTORIES"

export default function directoriesReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case GET_DIRECTORIES:
      return { ...state, directories: payload };
    default:
      return state;
  }
}
