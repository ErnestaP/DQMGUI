import { AnyAction } from 'redux';
import { pathOr, assoc, clone } from 'ramda';

interface DefaultState {
  position: string,
  normalize: boolean,
  dataForOverlay: {}
}

const defaultState: DefaultState = {
  position: '',
  normalize: false,
  dataForOverlay:
  {
    1: { run: '', dataset: '', label: '', normalize: true, selected: false },
    2: { run: '', dataset: '', label: '', normalize: true, selected: false },
    3: { run: '', dataset: '', label: '', normalize: true, selected: false },
    4: { run: '', dataset: '', label: '', normalize: true, selected: false },
  }
}
const SET_POSITION = "SET_POSITION"
const SET_DATA_FOR_OVERLAY = "SET_DATA_FOR_OVERLAY"

export default function positionReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_POSITION:
      return { ...state, position: payload }
    case SET_DATA_FOR_OVERLAY:
      const dataForOverlay = clone(payload)
      return { ...state, dataForOverlay }
    default:
      return state;
  }
}

export const setPosition = (data: any) => ({
  type: SET_POSITION,
  payload: data,
})

export const setDataForOverlay = (data: any) => (dispatch, getState) => {
  const propsNames = Object.keys(data)
  const propsValues = Object.values(data)
  const dataForOverlay = getDataForOverlay(getState())

  propsNames.map((propName, index) => {
    const splittedName = propName.split('_')
    const id = splittedName[1]
    const currentRun = dataForOverlay[id]

    assoc(splittedName[0], propsValues[index], currentRun)
    dataForOverlay[id] = assoc(splittedName[0], propsValues[index], currentRun)

    return dataForOverlay
  })

  dispatch({
    type: SET_DATA_FOR_OVERLAY,
    payload: dataForOverlay,
  })
}
export const deleteDataForOverlay = (id: any) => (dispatch, getState) => {
  const dataForOverlay = getDataForOverlay(getState())

  delete dataForOverlay[id]

  dispatch({
    type: SET_DATA_FOR_OVERLAY,
    payload: dataForOverlay,
  })
}

export const getPosition = (state: any): string => pathOr('', ['DATA', 'PLOTS', 'REFERENCE', 'position'], state);
export const getDataForOverlay = (state: any): any => pathOr({}, ['DATA', 'PLOTS', 'REFERENCE', 'dataForOverlay'], state);
