
import axios from "axios";
import { AnyAction } from 'redux';
import { path, reduce, assoc, pathOr, uniq, unnest, groupBy } from 'ramda';

import { searchFieldValue } from '../../selectors'
import { SampleDataInerface } from './interfaces';

interface DefaultState {
  samplesList: Object,
  fetching: boolean,
}

const defaultState: DefaultState = {
  samplesList: [],
  fetching: false,
}

const SET_SAMPLES = "SET_SAMPLES"
const IS_FETCHING = "IS_FETCHING"


const formatDataSet = (sampleList: any[]) => {
  const results: any = []

  sampleList.map((sample: SampleDataInerface, index: number) => {
    results.push({ items: {}, type: sample.type })
    sample.items.map((item: any) => {
      if (results[index].items[item.dataset] === undefined) {
        results[index].items[item.dataset] = { runs: {} }
      }
      results[index].items[item.dataset].runs[item.run] = { run: item.run, importversion: item.importversion, version: item.version }
    })
  })

  return (results)
}

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

        formatDataSet(samples)
        dispatch(setFetching(false))
        dispatch(setSample(formatDataSet(samples)))
      },
      error => {
        dispatch(setFetching(false))
        console.log(error)
      }
    );
  }
}

export const getSamples = (state: any) => path(['SAMPLES', 'samplesList'], state);
