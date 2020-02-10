import axios, { AxiosResponse, AxiosInstance } from 'axios';
import SERVER_PATHS from './api.parameters';

import {
  requestConfirm,
  requestError,
  responseConfirm,
} from './configs/default.config';
import { Dispatch } from 'redux';
// import { AppState } from 'app/interfaces';


axios.interceptors.response.use(responseConfirm, responseError());

export interface ApiInstance extends AxiosInstance {}

export interface ApiResponse<T = any> extends AxiosResponse {
  data: T;
}

export const dqmServerApi = (dispatch: Dispatch<any>, getState: any): ApiInstance => {
  const serverApi = axios.create();
  serverApi.interceptors.request.use(requestConfirm(getState), requestError);
  serverApi.interceptors.response.use(responseConfirm, responseError(dispatch, getState));
  serverApi.defaults.baseURL = SERVER_PATHS.DQMGUI_SERVER;
  serverApi.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem(
    'bc_token',
  )}`;

  return serverApi;
};
