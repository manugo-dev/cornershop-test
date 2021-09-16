import { ApiErrorResponse, ApiResponse } from 'apisauce';
import { put } from 'redux-saga/effects';

import { ActionTypes, CreateCounter, GetCounters } from 'redux/ducks/counters';
import { getCounters, addCounter } from 'services/CounterService';
import { Counter } from 'types/Counter';

export function* getCountersList(action: GetCounters) {
  try {
    const response: ApiResponse<Counter[] | ApiErrorResponse<unknown>> = yield getCounters(action.payload);
    if (response.ok) {
      yield put({ type: ActionTypes.GET_COUNTERS_SUCCESS, payload: response.data });
    } else {
      yield put({
        type: ActionTypes.GET_COUNTERS_ERROR,
        payload: response?.problem
      });
    }
  } catch (e: any) {
    yield put({ type: ActionTypes.GET_COUNTERS_ERROR, payload: e.problem });
  }
}

export function* createCounter(action: CreateCounter) {
  try {
    const response: ApiResponse<Counter[] | ApiErrorResponse<unknown>> = yield addCounter(action.payload);
    if (response.ok) {
      yield put({ type: ActionTypes.GET_COUNTERS_SUCCESS, payload: response.data });
    } else {
      yield put({
        type: ActionTypes.GET_COUNTERS_ERROR,
        payload: response?.problem
      });
    }
  } catch (e: any) {
    yield put({ type: ActionTypes.GET_COUNTERS_ERROR, payload: e.problem });
  }
}
