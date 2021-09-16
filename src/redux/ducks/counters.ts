import { PROBLEM_CODE } from 'apisauce';
import { createStructuredSelector } from 'reselect';
import { Counter } from 'types/Counter';

export const NAME = 'COUNTERS';

export interface CountersState {
  isLoading?: boolean;
  isError?: boolean;
  problem?: PROBLEM_CODE;
  list?: Counter[];
  updateCount: number;
}

export const INITIAL_DATA = {
  counters: {
    isLoading: false,
    isError: false,
    updateCount: 0
  }
};

export enum ActionTypes {
  GET_COUNTERS = '[COUNTERS]/GET_COUNTERS',
  GET_COUNTERS_SUCCESS = '[COUNTERS]/GET_COUNTERS_SUCCESS',
  GET_COUNTERS_ERROR = '[COUNTERS]/GET_COUNTERS_ERROR'
}

export interface GetCounters {
  type: ActionTypes.GET_COUNTERS;
  payload?: string;
}

export interface GetCountersSuccess {
  type: ActionTypes.GET_COUNTERS_SUCCESS;
  payload: Counter[];
}

export type Action = GetCounters | GetCountersSuccess;

export const actionCreators = {
  getCounters: (search?: string): GetCounters => ({ type: ActionTypes.GET_COUNTERS, payload: search })
};

export default function countersReducer(state = INITIAL_DATA, action: Action) {
  switch (action.type) {
    case ActionTypes.GET_COUNTERS:
      return { ...state };
    case ActionTypes.GET_COUNTERS_SUCCESS:
      return { ...state, counters: { list: action.payload, updateCount: state.counters.updateCount + 1 } };
    default:
      return state;
  }
}

const counters = (state: any) => {
  console.log('entre', state);
  return state;
};

export const selector = createStructuredSelector({
  ...counters
});
