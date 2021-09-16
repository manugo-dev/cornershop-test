import { PROBLEM_CODE } from 'apisauce';
import { Counter } from 'types/Counter';

export const NAME = 'COUNTERS';

export interface CountersState {
  list: {
    isLoading?: boolean;
    isError?: boolean;
    problem?: PROBLEM_CODE;
    data?: Counter[];
    updateCount: number;
  };
  create: {
    isLoading?: boolean;
    isError?: boolean;
    problem?: PROBLEM_CODE;
  };
  delete: {
    isLoading?: boolean;
    isError?: boolean;
    problem?: PROBLEM_CODE;
  };
  update: {
    isLoading?: boolean;
    isError?: boolean;
    problem?: PROBLEM_CODE;
  };
}

export const INITIAL_DATA = {
  list: {
    isLoading: false,
    isError: false,
    updateCount: 0
  }
};

export enum ActionTypes {
  GET_COUNTERS = '[COUNTERS]/GET_COUNTERS',
  GET_COUNTERS_SUCCESS = '[COUNTERS]/GET_COUNTERS_SUCCESS',
  GET_COUNTERS_ERROR = '[COUNTERS]/GET_COUNTERS_ERROR',
  CREATE_COUNTER = '[COUNTERS]/CREATE_COUNTER',
  CREATE_COUNTER_SUCCESS = '[COUNTERS]/CREATE_COUNTER_SUCCESS',
  CREATE_COUNTER_ERROR = '[COUNTERS]/CREATE_COUNTER_ERROR',
  DELETE_COUNTER = '[COUNTERS]/DELETE_COUNTER',
  DELETE_COUNTER_SUCCESS = '[COUNTERS]/DELETE_COUNTER_SUCCESS',
  DELETE_COUNTER_ERROR = '[COUNTERS]/DELETE_COUNTER_ERROR',
  UPDATE_COUNTER = '[COUNTERS]/UPDATE_COUNTER',
  UPDATE_COUNTER_SUCCESS = '[COUNTERS]/UPDATE_COUNTER_SUCCESS',
  UPDATE_COUNTER_ERROR = '[COUNTERS]/UPDATE_COUNTER_ERROR'
}

export interface GetCounters {
  type: ActionTypes.GET_COUNTERS;
  payload?: string;
}

export interface GetCountersSuccess {
  type: ActionTypes.GET_COUNTERS_SUCCESS;
  payload: Counter[];
}

export interface GetCountersError {
  type: ActionTypes.GET_COUNTERS_ERROR;
  payload: PROBLEM_CODE;
}

export interface CreateCounter {
  type: ActionTypes.CREATE_COUNTER;
  payload: string;
}
export interface CreateCounterSuccess {
  type: ActionTypes.CREATE_COUNTER_SUCCESS;
  payload: Counter;
}

export interface CreateCounterError {
  type: ActionTypes.CREATE_COUNTER_ERROR;
  payload: PROBLEM_CODE;
}

export type Action = GetCounters | GetCountersSuccess | GetCountersError;

export const actionCreators = {
  getCounters: (search?: string): GetCounters => ({ type: ActionTypes.GET_COUNTERS, payload: search }),
  addCounter: (title: string): CreateCounter => ({ type: ActionTypes.CREATE_COUNTER, payload: title })
};

export default function countersReducer(state = INITIAL_DATA, action: Action) {
  switch (action.type) {
    case ActionTypes.GET_COUNTERS:
      return {
        ...state,
        counters: { ...state.list, isLoading: true, isError: false, problem: undefined }
      };
    case ActionTypes.GET_COUNTERS_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          list: action.payload,
          updateCount: state.list.updateCount + 1,
          isLoading: false
        }
      };
    case ActionTypes.GET_COUNTERS_ERROR:
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          isError: true,
          problem: action.payload
        }
      };
    default:
      return state;
  }
}
