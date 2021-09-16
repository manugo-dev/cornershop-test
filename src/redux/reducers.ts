import { combineReducers } from 'redux';

import countersReducer, { NAME as counterName } from 'redux/ducks/counters';

export default () =>
  combineReducers({
    [counterName]: countersReducer
  });
