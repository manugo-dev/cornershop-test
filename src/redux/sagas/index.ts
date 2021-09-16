import { takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from 'redux/ducks/counters';

import { createCounter, getCountersList } from './counters';

export default function* rootSagas() {
  yield takeLatest(ActionTypes.GET_COUNTERS, getCountersList);
  yield takeEvery(ActionTypes.CREATE_COUNTER, createCounter);
}
