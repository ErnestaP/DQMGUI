import { AnyAction } from 'redux';
import { pathOr, find, propEq, assoc, isEmpty } from 'ramda';
import { createSelector } from 'reselect'

interface DefaultState {
  position: string,
  normalize: boolean,
  names: string[];
  dataForOverlay: {}
}

const defaultState: DefaultState = {
  position: '',
  normalize: false,
  names: [],
  dataForOverlay: [{ id: '1', run: '', dataset: '', label: '', selected: false }]
}

const SET_POSITION = "SET_POSITION"
const SET_NORMALIZATION = "SET_NORMALIZATION"
const SET_ALL_NAMES = "SET_ALL_NAMES"
const SET_DATA_FOR_OVERLAY = "SET_DATA_FOR_OVERLAY"

export default function positionReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_POSITION:
      return { ...state, position: payload }
    case SET_NORMALIZATION:
      return { ...state, normalize: payload }
    case SET_ALL_NAMES:
      return { ...state, names: payload }
    case SET_DATA_FOR_OVERLAY:
      return { ...state, dataForOverlay: payload }
    default:
      return state;
  }
}

export const setPosition = (data: any) => ({
  type: SET_POSITION,
  payload: data,
})

export const setNormalization = (data: any) => ({
  type: SET_NORMALIZATION,
  payload: data,
})

export const setDataForOverlay = (data: any) => (dispatch, getState) => {
  const propsNames = Object.keys(data)
  const propsValues = Object.values(data)
  const dataForOverlay = [...getDataForOverlay(getState())]

  propsNames.map((propName, index) => {
    const splittedName = propName.split('_')
    const id = splittedName[1]
    const currentRun = dataForOverlay.find(obj => obj.id === id)

    if (!currentRun) {
      dataForOverlay.push({ id: id, run: '', dataset: '', label: '', selected: false })
    }
    else {
      assoc(splittedName[0], propsValues[index], currentRun)
      const indexOfPlot = dataForOverlay.findIndex(obj => obj.id === id)
      dataForOverlay[indexOfPlot] = assoc(splittedName[0], propsValues[index], currentRun)
    }

    return dataForOverlay
  })

  dispatch({
    type: SET_DATA_FOR_OVERLAY,
    payload: dataForOverlay,
  })
}
export const deleteDataForOverlay = (id: any) => (dispatch, getState) => {
  const dataForOverlay = [...getDataForOverlay(getState())]

  const indexOfPlot = dataForOverlay.findIndex(obj => obj.id === id)
  dataForOverlay.splice(indexOfPlot, 1)

  dispatch({
    type: SET_DATA_FOR_OVERLAY,
    payload: dataForOverlay,
  })
}

export const setAllNames = (data: any) => ({
  type: SET_ALL_NAMES,
  payload: data,
})

export const toggleCheckbox = (id: string, checkboxValue: boolean) => (dispatch: any, getState: any) => {
  const dataForOverlay = [...getDataForOverlay(getState())]
  const index = dataForOverlay.findIndex(data => pathOr(undefined, ['id'], data) === id)
console.log(index)
  if (index >= 0) {
    dataForOverlay[index].selected = checkboxValue
    dispatch({
      type: SET_DATA_FOR_OVERLAY,
      payload: dataForOverlay,
    })
  }
}

export const toggleAllCheckboxes = (checkboxValue: boolean) => (dispatch: any, getState: any) => {
  const dataForOverlay = [...getDataForOverlay(getState())]
  const dataForOverlayWithChangedCheckboxes = dataForOverlay.map(data => {
    data['selected'] = checkboxValue
    return data
  })

  dispatch({
    type: SET_DATA_FOR_OVERLAY,
    payload: dataForOverlayWithChangedCheckboxes,
  })
}

export const getPosition = (state: any): string => pathOr('', ['DATA', 'PLOTS', 'REFERENCE', 'position'], state);
export const getNormalization = (state: any): string => pathOr('', ['DATA','PLOTS', 'REFERENCE', 'normalize'], state);
export const getNames = (state: any): string[] => pathOr([], ['DATA', 'PLOTS', 'REFERENCE', 'names'], state);
export const getDataForOverlay = (state: any): any[] => pathOr([], ['DATA', 'PLOTS', 'REFERENCE', 'dataForOverlay'], state);
