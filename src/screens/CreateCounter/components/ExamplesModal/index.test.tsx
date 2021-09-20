import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { Middleware, Dispatch, AnyAction } from 'redux';
import configureStore from 'redux-mock-store';

import { BASE_URL } from 'config/api';
import { ActionTypes, INITIAL_DATA, NAME as countersReducer } from 'redux/ducks/counters';

import ExamplesModal from './index';

const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
const mockStore = configureStore(middlewares);

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-outlet');
document.body.appendChild(modalRoot);

jest.mock('./mock', () => [{ title: 'DemoCategory', items: ['DemoItem1', 'DemoItem2', 'DemoItem3'] }]);

const counterMock = { id: 'abc123', title: 'List example', count: 0 };

const server = setupServer(
  rest.get(`${BASE_URL}/counter`, (req, res, ctx) => res(ctx.status(200), ctx.json([counterMock]))),
  rest.post(`${BASE_URL}/counter`, (req, res, ctx) => res(ctx.status(200), ctx.json(counterMock)))
);

describe('#ExamplesModal', () => {
  const hideModal = jest.fn();
  const store = mockStore({ [countersReducer]: { ...INITIAL_DATA } });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    render(
      <Provider store={store}>
        <ExamplesModal isModalVisible hideModal={hideModal} />
      </Provider>
    );
  });

  it('should render the modal with title', () => {
    expect(screen.getByLabelText(/examplesTitle/)).toBeInTheDocument();
  });

  it('should try to save counter when user press any example title', async () => {
    userEvent.click(screen.getByText('DemoItem1'));
    const actions = store.getActions();
    const expectedPayload = { type: ActionTypes.CREATE_COUNTER, payload: counterMock };
    await waitFor(() => expect(actions).toContainEqual(expectedPayload));
  });

  it('should try to close modal', () => {
    userEvent.click(screen.getByLabelText(/close/));
    expect(hideModal).toHaveBeenCalledTimes(1);
  });
});
