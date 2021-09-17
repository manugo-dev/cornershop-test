import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { BASE_URL } from 'config/api';
import generateStore from 'redux/store';
import { INITIAL_DATA, NAME } from 'redux/ducks/counters';

import CounterElement from './index';

const counterMock = { title: 'ElementTitle1', id: 'ElementId', count: 10 };

const server = setupServer(
  rest.post(`${BASE_URL}/counter/inc`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ ...counterMock, count: counterMock.count + 1 }))
  ),
  rest.post(`${BASE_URL}/counter/dec`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ ...counterMock, count: counterMock.count - 1 }))
  )
);

describe('#Counters', () => {
  const store = generateStore({ [NAME]: { ...INITIAL_DATA, counters: [counterMock] } });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    render(
      <Provider store={store}>
        <CounterElement title={counterMock.title} id={counterMock.id} count={counterMock.count} />
      </Provider>
    );
  });

  test('Counter is correctly showed at counters list', async () => {
    expect(screen.getByText(counterMock.title)).toBeInTheDocument();
    expect(screen.getByText(counterMock.count)).toBeInTheDocument();
  });
});
