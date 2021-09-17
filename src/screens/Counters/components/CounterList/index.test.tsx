import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { BASE_URL } from 'config/api';
import generateStore from 'redux/store';

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
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Counters />
      </Provider>
    );
  });

  test('It must show list example 1 item at the list', async () => {
    await waitFor(() => expect(screen.getByText(countersMock[0].title)).toBeInTheDocument());
  });

  test('It must refresh the list when user click refresh button', async () => {
    await waitFor(() => expect(screen.getByText(countersMock[0].title)).toBeInTheDocument());
    const newCounters = [{ id: 'abc125', title: 'New counter', count: 0 }, ...countersMock];
    server.use(
      rest.get(`${BASE_URL}/counter*`, (req, res, ctx) => res(ctx.status(200), ctx.json(newCounters)))
    );
    userEvent.click(screen.getByLabelText('refresh'));
    await waitFor(() => expect(screen.getByText(newCounters[0].title)).toBeInTheDocument());
  });

  test('It must show refresh times when user press refresh button', async () => {
    await waitFor(() => expect(screen.getByText(countersMock[0].title)).toBeInTheDocument());
    userEvent.click(screen.getByLabelText('refresh'));
    await waitFor(() => expect(screen.getByText('refreshCount {"count":2}')).toBeInTheDocument());
    userEvent.click(screen.getByLabelText('refresh'));
    await waitFor(() => expect(screen.getByText('refreshCount {"count":3}')).toBeInTheDocument());
  });

  test('It must show server error if request fails', async () => {
    await waitFor(() => expect(screen.getByText(countersMock[0].title)).toBeInTheDocument());
    server.use(rest.get(`${BASE_URL}/counter*`, (req, res, ctx) => res(ctx.status(400), ctx.json([]))));
    userEvent.click(screen.getByLabelText('refresh'));
    await waitFor(() => expect(screen.getByText('Global:serverError')).toBeInTheDocument());
  });

  test('It must clean the counter list if refresh fails', async () => {
    await waitFor(() => expect(screen.getByText(countersMock[0].title)).toBeInTheDocument());
    server.use(rest.get(`${BASE_URL}/counter*`, (req, res) => res.networkError('Failed to connect')));
    userEvent.click(screen.getByLabelText('refresh'));
    await waitFor(() => expect(screen.getByText('Global:noConnection')).toBeInTheDocument());
    server.use(
      rest.get(`${BASE_URL}/counter*`, (req, res, ctx) => res(ctx.status(200), ctx.json(countersMock)))
    );
    userEvent.click(screen.getByLabelText('retry'));
    await waitFor(() => expect(screen.getByText(countersMock[0].title)).toBeInTheDocument());
  });
});
