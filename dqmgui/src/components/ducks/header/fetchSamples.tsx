
import axios from "axios";
import { AnyAction } from 'redux';
import { path, reduce, assoc, pathOr, uniq, unnest, groupBy } from 'ramda';
import qs from 'qs'

import { SampleDataInerface } from './interfaces';
import { setLoader } from '../loader/loaderActions'
import cleanDeep from "clean-deep";

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


const formatDataSet = (sampleList: any[], searchFieldByRun?: number) => {
  const results: any = []

  sampleList.map((sample: SampleDataInerface, index: number) => {
    results.push({ items: {}, type: sample.type })
    sample.items.map((item: any) => {
      if (results[index].items[item.dataset] === undefined) {
        results[index].items[item.dataset] = { runs: {} }
      }
      if (searchFieldByRun && item.run.includes(searchFieldByRun)) {
        results[index].items[item.dataset].runs[item.run] = { importversion: item.importversion, version: item.version }
      }
      else if (searchFieldByRun && !item.run.includes(searchFieldByRun)) {
        delete results[index].items[item.dataset]
      }
      else if (!searchFieldByRun) {
        results[index].items[item.dataset].runs[item.run] = { run: item.run, importversion: item.importversion, version: item.version }
      }
    })
    if (!path(['items'], cleanDeep(results[index]))) {
      delete results[index]
    }
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


export function fetchSamplesByDataSetAction(serachFieldValues: any, searchFieldByRun?: string) {
  return function action(dispatch, setState) {
    dispatch(setFetching(true))
    dispatch(setLoader(true))

    const request = axios({
      method: 'GET',
      url: `/offline/data/json/samples?match=${serachFieldValues}`,
      headers: []
    });

    return request.then(
      response => {
        const samples = pathOr([], ['data', 'samples'], response)

        dispatch(setFetching(false))
        dispatch(setLoader(false))
        dispatch(setSample(formatDataSet(samples, searchFieldByRun)))
      },
      error => {
        dispatch(setFetching(false))
        dispatch(setLoader(false))
        console.log(error)
      }
    );
  }
}

export function fetchSamplesByRunAction(formValues: any) {
  return function action(dispatch, setState) {
    dispatch(setFetching(true))
    dispatch(setLoader(true))
    
    const request = axios({
      method: 'GET',
      url: `/offline/data/json/samples?run=${formValues}`,
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

export const getSamplesByDataSet = (state: any) => path(['SAMPLES', 'SAMPLES_LIST', 'samplesList'], state);
export const isFetching = (state: any) => path(['SAMPLES', 'SAMPLES_LIST', 'fetching'], state);