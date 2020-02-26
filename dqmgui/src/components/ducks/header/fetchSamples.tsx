
import axios from "axios";
import { AnyAction } from 'redux';
import { path, reduce, assoc, pathOr, uniq, unnest, groupBy } from 'ramda';

import { SampleDataInerface } from './interfaces';
import { setLoader } from '../loader/loaderActions'
import cleanDeep from "clean-deep";
import { CustomThunkDispatch } from '../../../app/interfaces'

interface DefaultState {
  samplesList: Object,
  fetching: boolean,
}

const defaultState: DefaultState = {
  samplesList: [],
  fetching: false,
}

type FetchTemplates = () => CustomThunkDispatch;

const SET_SAMPLES = "SET_SAMPLES"
const IS_FETCHING = "IS_FETCHING"


const formatDataset = (sampleList: any[]) => {
  const results: any = []

  sampleList.map((sample: SampleDataInerface, index: number) => {
    results.push({ items: {}, type: sample.type })
    sample.items.map((item: any) => {
      if (results[index].items[item.dataset] === undefined) {
        results[index].items[item.dataset] = { runs: {} }
      }
      results[index].items[item.dataset].runs[item.run] = { importversion: item.importversion}
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


export function fetchSamples(formValues: any) {
  return function action(dispatch, setState) {
    dispatch(setFetching(true))
    dispatch(setLoader(true))

    const searchFieldByRun: string = pathOr('', ['searchFieldByRun'], formValues)
    const searchFieldByDataset: string = pathOr('', ['searchField'], formValues)

    const request = axios({
      method: 'GET',
      url: `/samples?match=${searchFieldByDataset}&run=${searchFieldByRun}`,
      headers: []
    });

    return request.then(
      response => {
        const samples = pathOr([], ['data', 'samples'], response)

        dispatch(setFetching(false))
        dispatch(setLoader(false))
        dispatch(setSample(formatDataset(samples)))
      },
      error => {
        dispatch(setFetching(false))
        dispatch(setLoader(false))
        console.log(error)
      }
    );
  }
}

export const getSamplesByDataset = (state: any) => path(['SAMPLES', 'SAMPLES_LIST', 'samplesList'], state);
export const isFetching = (state: any) => path(['SAMPLES', 'SAMPLES_LIST', 'fetching'], state);