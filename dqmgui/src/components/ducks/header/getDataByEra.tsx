
import * as qs from 'qs';
import axios, { AxiosInstance } from "axios";
import { AnyAction } from 'redux';
import { path } from 'ramda';

interface DefaultState {
  samplesList: Object
}

const defaultState: DefaultState = {
  samplesList:{},
}

const SET_SAMPLES = "SET_SAMPLES"

export default function samplesSetReducer(state = defaultState, { type, payload }: AnyAction = {} as any): DefaultState {
  switch (type) {
    case SET_SAMPLES:
      return { ...state, samplesList: payload };
    default:
      return state;
  }
}

export const setSample = (data: any) => ({
  type: SET_SAMPLES,
  payload: data,
})


export function fetchSamplesAction() {
  return function action(dispatch) {

    const request = axios({
      method: 'GET',
      url: `/online-dev/data/json/samples`,
      headers: []
    });
    
    return request.then(
      response => dispatch(setSample(path(['data', 'samples'], response))),
      error => {console.log(error)}
    );
  }
}

export const getRun = (state: any) => path(['SAMPLES', 'samplesList'], state);
