
import axios from "axios";
import { AnyAction } from 'redux';
import { path, reduce, assoc, pathOr, uniq, unnest, groupBy } from 'ramda';

import { searchFieldByRunValue } from '../../selectors'
import { SampleDataInerface } from './interfaces';
import { setLoader } from '../loader/loaderActions'

interface DefaultState {
  samplesByDataSetList: Object,
  fetching: boolean,
}

const defaultState: DefaultState = {
  samplesByDataSetList: [],
  fetching: false,
}

const SET_SAMPLES_BY_RUNS = "SET_SAMPLES_BY_RUNS"
const IS_FETCHING_BY_RUNS = "IS_FETCHING_BY_RUNS"


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
      return { ...state, samplesByDataSetList: payload };
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

export const setFetching = (data: any) => ({
  type: IS_FETCHING_BY_RUNS,
  payload: data,
})


export function fetchSamplesByRunAction() {
  return function action(dispatch, setState) {
    const searchField: string = searchFieldByRunValue(setState())
    dispatch(setFetching(true))
    dispatch(setLoader(true))

    const request = axios({
      method: 'GET',
      url: `/online-dev/data/json/samples?run=${searchField}`,
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

export const getSamplesByRuns = (state: any) => path(['SAMPLES', 'searchFieldByRun'], state);
export const isFetchingByRuns = (state: any) => path(['SAMPLES', 'fetching'], state);
