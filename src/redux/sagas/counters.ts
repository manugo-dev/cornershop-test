import { ApiResponse } from 'apisauce';
import { put } from 'redux-saga/effects';

import { ActionTypes, GetCounters } from 'redux/ducks/counters';
import { getCounters } from 'services/CounterService';
import { Counter } from 'types/Counter';

// eslint-disable-next-line import/prefer-default-export
export function* getCountersList(action: GetCounters) {
  try {
    const response: ApiResponse<Counter[]> = yield getCounters(action.payload);
    yield put({ type: ActionTypes.GET_COUNTERS_SUCCESS, payload: response.data });
  } catch (e: any) {
    yield put({ type: ActionTypes.GET_COUNTERS_ERROR, payload: e.problem });
  }
}

// export function* createCounter(title: string) {
//   try {
//     const response: ApiResponse<Counter> = yield createCounter(title);
//     yield put({ type: ActionTypes.GET_COUNTERS_SUCCESS, data: response.data });
//   } catch (e) {
//     yield put({ type: ActionTypes.GET_COUNTERS_ERROR });
//   }
// }
