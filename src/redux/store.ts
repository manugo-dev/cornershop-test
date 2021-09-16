import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import countersReducer, { NAME as countersReducerName } from './ducks/counters';

const rootReducer = combineReducers({
  [countersReducerName]: countersReducer
});

const sagaMiddleware = createSagaMiddleware();

export default function generateStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
}
