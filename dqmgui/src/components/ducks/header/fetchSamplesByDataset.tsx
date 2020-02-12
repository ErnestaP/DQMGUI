
import * as qs from 'qs';
import axios, { AxiosInstance } from "axios";
import { AnyAction } from 'redux';
import { path, reduce, assoc, pathOr, uniq, unnest, groupBy } from 'ramda';

import { searchFieldValue } from '../../selectors'
import { SamplesInterface } from './interfaces';

interface DefaultState {
  samplesList: Object,
  fetching: boolean,
}

const defaultState: DefaultState = {
  samplesList: {},
  fetching: false,
}

const SET_SAMPLES = "SET_SAMPLES"
const IS_FETCHING = "IS_FETCHING"

const formatSamples = (samplesItems: SamplesInterface[]) => reduce(
  (acc, { type, run, dataset, version, importVersion }) => ({ ...acc, [run]: { type, dataset, version, importVersion } }),
  {},
  samplesItems)

const formatData = (items: any) => {
  const ob = {}
  const itemsFromAnrrArray = items.map((item: any) => item.items)
  const dataSetNames = itemsFromAnrrArray.map((set: SamplesInterface[]) => {
    const itemObject: any[] = set.map((setOne: SamplesInterface) => {
      const dataSet = pathOr('', ['dataset'], setOne)
      return (dataSet)
    })
    return assoc(uniq(itemObject), formatSamples(set), ob)
  })
  return dataSetNames
}

export const formatType = (arr: Array<any>): any => reduce(
  (acc, elem) => assoc(elem.type, elem, acc),
  {},
  arr,
);

export default function samplesSetReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_SAMPLES:
      return { ...state, samplesList: payload };
    case IS_FETCHING:
      return { ...state, fetching: payload };
    default:
      return state;
  }
}

export const setSample = (data: any) => ({
  type: SET_SAMPLES,
  payload: data,
})

export const setFetching = (data: any) => ({
  type: IS_FETCHING,
  payload: data,
})


export function fetchSamplesByDataSetAction() {
  return function action(dispatch, setState) {
    const searchField: string = searchFieldValue(setState())
    dispatch(setFetching(true))

    const request = axios({
      method: 'GET',
      url: `/online-dev/data/json/samples?match=${searchField}`,
      headers: []
    });

    return request.then(
      response => {
        const samples = pathOr([], ['data', 'samples'], response)
        const formatSamples = formatData(samples)

        console.log(formatSamples)

        dispatch(setFetching(false))
        dispatch(setSample(path(['data', 'samples'], response)))
      },
      error => {
        dispatch(setFetching(false))
        console.log(error)
      }
    );
  }
}

export const getSamples = (state: any) => path(['SAMPLES', 'samplesList'], state);
