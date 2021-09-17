import reducer, { INITIAL_DATA, actionCreators } from './counters';

test('setUser action sets the new user when there is no user', () => {
  const newCounters = [{ title: 'counter1', id: '1', count: 10 }];
  const newState = reducer(INITIAL_DATA, actionCreators.setCounters(newCounters));
  expect(newState).toEqual({ ...INITIAL_DATA, counters: newCounters });
});

test('setUser action sets the new user when there is no user', () => {
  const newCounters = [{ title: 'counter1', id: '1', count: 10 }];
  const newState = reducer(INITIAL_DATA, actionCreators.setCounters(newCounters));
  expect(newState).toEqual({ ...INITIAL_DATA, counters: newCounters });
});

test('setUser action sets the new user when there is no user', () => {
  const newCounters = [{ title: 'counter1', id: '1', count: 10 }];
  const newState = reducer(INITIAL_DATA, actionCreators.setCounters(newCounters));
  expect(newState).toEqual({ ...INITIAL_DATA, counters: newCounters });
});

test('setUser action sets the new user when there is no user', () => {
  const newCounters = [{ title: 'counter1', id: '1', count: 10 }];
  const newState = reducer(INITIAL_DATA, actionCreators.setCounters(newCounters));
  expect(newState).toEqual({ ...INITIAL_DATA, counters: newCounters });
});

test('setUser action sets the new user when there is no user', () => {
  const newCounters = [{ title: 'counter1', id: '1', count: 10 }];
  const newState = reducer(INITIAL_DATA, actionCreators.setCounters(newCounters));
  expect(newState).toEqual({ ...INITIAL_DATA, counters: newCounters });
});
