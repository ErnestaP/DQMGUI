
import axios from "axios";
import { AnyAction } from 'redux';
import { path, pathOr } from 'ramda';

import { SampleDataInerface } from './interfaces';
import { setLoader } from '../loader/loaderActions'

interface DefaultState {
  samplesList: Object,
  fetching: boolean,
}

const defaultState: DefaultState = {
  samplesList: [],
  fetching: false,
}

const SET_SAMPLES_BY_RUNS = "SET_SAMPLES_BY_RUNS"
const IS_FETCHING_BY_RUNS = "IS_FETCHING_BY_RUNS"
const CLEAR_SAMPLES_BY_RUN = "CLEAR_SAMPLES_BY_RUN"

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

export default function samplesByRunReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_SAMPLES_BY_RUNS:
      return { ...state, samplesList: payload };
    case IS_FETCHING_BY_RUNS:
      return { ...state, fetching: payload };
    default:
      return state;
  }
}

export const setSample = (data: any) => ({
  type: SET_SAMPLES_BY_RUNS,
  payload: data,
})

export const clearSamples = (data: any) => ({
  type: CLEAR_SAMPLES_BY_RUN,
  payload: data,
})

export const setFetching = (data: any) => ({
  type: IS_FETCHING_BY_RUNS,
  payload: data,
})


export function fetchSamplesByRunAction(formValues: any) {
  return function action(dispatch, setState) {
    dispatch(setFetching(true))
    dispatch(setLoader(true))
    const request = axios({
      method: 'GET',
      url: `/online-dev/data/json/samples?run=${formValues}`,
      headers: []
    });

    return request.then(
      response => {
        const samples = pathOr([], ['data', 'samples'], response)
        formatDataSet(samples)
        dispatch(setFetching(false))
        dispatch(setLoader(false))
        dispatch(setSample(formatDataSet(samples)))
      },
      error => {
        dispatch(setFetching(false))
        dispatch(setLoader(false))
        console.log(error)
      }
    );
  }
}

export const getSamplesByRuns = (state: any) => path(['SAMPLES', 'SAMPLES_BY_RUN', 'samplesList'], state);
export const isFetchingByRuns = (state: any) => path(['SAMPLES', 'SAMPLES_BY_RUN', 'fetching'], state);
