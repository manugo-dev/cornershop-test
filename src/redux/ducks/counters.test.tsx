import reducer, { INITIAL_DATA, actionCreators } from './counters';

test('setCounters action sets the counter list', () => {
  const newCounters = [{ title: 'counter1', id: '1', count: 10 }];
  const newState = reducer(INITIAL_DATA, actionCreators.setCounters(newCounters));
  expect(newState).toEqual({ ...INITIAL_DATA, counters: newCounters });
});

test('setCreationTitle action sets the title while are creating new counter', () => {
  const newState = reducer(INITIAL_DATA, actionCreators.setCreationTitle('titleDemo'));
  expect(newState).toEqual({ ...INITIAL_DATA, creationTitle: 'titleDemo' });
});

test('addCounter action adds new counter to the list', () => {
  const countersState = { ...INITIAL_DATA, counters: [{ title: 'counter1', id: '1', count: 10 }] };
  const newCounter = { title: 'counter2', id: '2', count: 12 };
  const newState = reducer(countersState, actionCreators.addCounter(newCounter));
  expect(newState).toEqual({
    ...countersState,
    counters: [...countersState.counters, newCounter]
  });
});

test('updateCounter action update counter value', () => {
  const newCounter = { title: 'counter2', id: '2', count: 12 };
  const countersState = { ...INITIAL_DATA, counters: [newCounter] };
  const newState = reducer(
    countersState,
    actionCreators.updateCounter({ ...newCounter, count: newCounter.count + 1 })
  );
  expect(newState).toEqual({ ...countersState, counters: [{ ...newCounter, count: newCounter.count + 1 }] });
});
