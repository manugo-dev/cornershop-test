import { Counter } from 'types/Counter';

export const NAME = 'COUNTERS';

export interface CountersState {
  counters: Counter[];
  fetchCount: number;
  creationTitle?: string;
  selected: number;
}

export const INITIAL_DATA: CountersState = {
  counters: [],
  fetchCount: 0,
  selected: 0
};

export enum ActionTypes {
  SET_COUNTERS = '[COUNTERS]/SET_COUNTERS',
  SET_CREATION_TITLE = '[COUNTERS]/SET_CREATION_TITLE',
  CREATE_COUNTER = '[COUNTERS]/CREATE_COUNTER',
  DELETE_COUNTER = '[COUNTERS]/DELETE_COUNTER',
  UPDATE_COUNTER = '[COUNTERS]/UPDATE_COUNTER',
  SELECT_COUNTER = '[COUNTERS]/SELECT_COUNTER',
  INCREMENT_FETCH_COUNT = '[COUNTERS]/INCREMENT_FETCH_COUNT',
  RESET_FETCH_COUNT = '[COUNTERS]/RESET_FETCH_COUNT'
}

export interface SetCounters {
  type: ActionTypes.SET_COUNTERS;
  payload: Counter[];
}

export interface SetCreationTitle {
  type: ActionTypes.SET_CREATION_TITLE;
  payload: string;
}

export interface CreateCounter {
  type: ActionTypes.CREATE_COUNTER;
  payload: Counter;
}

export interface UpdateCounter {
  type: ActionTypes.UPDATE_COUNTER;
  payload: Counter;
}

export interface DeleteCounter {
  type: ActionTypes.DELETE_COUNTER;
  payload: string;
}

export interface SelectCounter {
  type: ActionTypes.SELECT_COUNTER;
  payload: string;
}

export interface IncrementFetchCount {
  type: ActionTypes.INCREMENT_FETCH_COUNT;
}

export interface ResetFetchCount {
  type: ActionTypes.RESET_FETCH_COUNT;
}

export type Action =
  | SetCounters
  | SetCreationTitle
  | CreateCounter
  | UpdateCounter
  | DeleteCounter
  | SelectCounter
  | IncrementFetchCount
  | ResetFetchCount;

export const actionCreators = {
  setCounters: (counters: Counter[]): SetCounters => ({
    type: ActionTypes.SET_COUNTERS,
    payload: counters
  }),
  setCreationTitle: (title: string): SetCreationTitle => ({
    type: ActionTypes.SET_CREATION_TITLE,
    payload: title
  }),
  addCounter: (counter: Counter): CreateCounter => ({ type: ActionTypes.CREATE_COUNTER, payload: counter }),
  updateCounter: (counter: Counter): UpdateCounter => ({
    type: ActionTypes.UPDATE_COUNTER,
    payload: counter
  }),
  deleteCounter: (id: string): DeleteCounter => ({ type: ActionTypes.DELETE_COUNTER, payload: id }),
  selectCounter: (id: string): SelectCounter => ({ type: ActionTypes.SELECT_COUNTER, payload: id }),
  incrementFetchCounter: (): IncrementFetchCount => ({ type: ActionTypes.INCREMENT_FETCH_COUNT }),
  resetFetchCounter: (): ResetFetchCount => ({ type: ActionTypes.RESET_FETCH_COUNT })
};

export default function countersReducer(state = INITIAL_DATA, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_COUNTERS:
      return { ...state, counters: action.payload, selected: 0 };
    case ActionTypes.SET_CREATION_TITLE:
      return { ...state, creationTitle: action.payload };
    case ActionTypes.CREATE_COUNTER:
      return { ...state, counters: [...state.counters, { ...action.payload }] };
    case ActionTypes.UPDATE_COUNTER:
      const updateCounters = [...state.counters];
      const counterIndex = updateCounters.findIndex((counter) => counter.id === action.payload.id);
      updateCounters[counterIndex] = { ...updateCounters[counterIndex], ...action.payload };
      console.log({
        ...state,
        ...(counterIndex !== -1
          ? { counters: updateCounters }
          : { counters: [...state.counters, action.payload] })
      });
      return {
        ...state,
        ...(counterIndex !== -1
          ? { counters: updateCounters }
          : { counters: [...state.counters, action.payload] })
      };
    case ActionTypes.SELECT_COUNTER:
      const selectCounters = [...state.counters];
      const selectCounterIndex = selectCounters.findIndex((counter) => counter.id === action.payload);
      const newValue = !selectCounters[selectCounterIndex].selected;
      selectCounters[selectCounterIndex] = {
        ...selectCounters[selectCounterIndex],
        selected: newValue
      };
      return {
        ...state,
        counters: selectCounters,
        selected: newValue ? state.selected + 1 : state.selected - 1
      };
    case ActionTypes.DELETE_COUNTER:
      const deletedCounters = state.counters.filter((counter) => counter.id !== action.payload);
      return { ...state, counters: deletedCounters, selected: state.selected - 1 };
    case ActionTypes.INCREMENT_FETCH_COUNT:
      return { ...state, fetchCount: state.fetchCount + 1 };
    case ActionTypes.RESET_FETCH_COUNT:
      return { ...state, fetchCount: 0 };
    default:
      return state;
  }
}
