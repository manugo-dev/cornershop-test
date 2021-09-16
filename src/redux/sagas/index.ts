import { takeLatest } from 'redux-saga/effects';
import { ActionTypes } from 'redux/ducks/counters';

import { getCountersList } from './counters';

export default function* rootSagas() {
  yield takeLatest(ActionTypes.GET_COUNTERS, getCountersList);
}
