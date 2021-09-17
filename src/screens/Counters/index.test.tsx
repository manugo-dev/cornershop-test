import { screen, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import generateStore from 'redux/store';

import { BASE_URL } from 'config/api';

import Counters from './index';

const countersMock = [
  { id: 'abc123', title: 'List example 1', count: 0 },
  { id: 'abc124', title: 'List example 2', count: 2 }
];

const server = setupServer(
  rest.get(`${BASE_URL}/counter*`, (req, res, ctx) => res(ctx.status(200), ctx.json(countersMock)))
);

describe('#Counters', () => {
  const store = generateStore();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('It must render without errors', async () => {
    const { container } = render(
      <Provider store={store}>
        <Counters />
      </Provider>
    );
    await waitFor(() => expect(screen.getByText(countersMock[0].title)).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });
});
