import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import countersReducer, { NAME as countersReducerName } from './ducks/counters';

const rootReducer = combineReducers({
  [countersReducerName]: countersReducer
});

export default function generateStore(initialState?: any) {
  const store = createStore(rootReducer, initialState, devToolsEnhancer({}));
  return store;
}
