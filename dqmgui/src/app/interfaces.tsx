import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AxiosInstance } from 'axios';
import { SampleDataInerface } from 'src/components/ducks/header/interfaces';

export interface AppState {
  'SAHRED_REDUCER': any;
}

export interface ExtraArguments {
  api: AxiosInstance;
  samples: SampleDataInerface
}
export interface CustomThunkDispatch
  extends ThunkDispatch<AppState, ExtraArguments, AnyAction> { }

export interface SizeProps {
  size: { w: number, h: number }
}