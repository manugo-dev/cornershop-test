import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Middleware, Dispatch, AnyAction } from 'redux';
import configureStore from 'redux-mock-store';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { ActionTypes, INITIAL_DATA, NAME as countersReducer } from 'redux/ducks/counters';
import { BASE_URL } from 'config/api';

import CreateModal from './index';

const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
const mockStore = configureStore(middlewares);

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-outlet');
document.body.appendChild(modalRoot);

const counterMock = { id: 'abc123', title: 'List example', count: 0 };

const server = setupServer(
  rest.post(`${BASE_URL}/counter`, (req, res, ctx) => res(ctx.status(200), ctx.json(counterMock)))
);

jest.mock(
  'screens/CreateCounter',
  () =>
    function CreateCounter() {
      return <span>CreateCounterComponentMock</span>;
    }
);

describe('#CreateCounterModal', () => {
  const showExamples = jest.fn();
  const hideModal = jest.fn();
  const title = 'List example';
  const store = mockStore({ [countersReducer]: { ...INITIAL_DATA, creationTitle: title } });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CreateModal isModalVisible hideModal={hideModal} showExamples={showExamples} />
      </Provider>
    );
  });

  it('should render the modal with title', () => {
    expect(screen.getByLabelText(/createTitle/)).toBeInTheDocument();
  });

  it('should try to save counter when user press save', async () => {
    userEvent.click(screen.getByText(/Global:save/));
    const actions = store.getActions();
    const expectedPayload = { type: ActionTypes.CREATE_COUNTER, payload: counterMock };
    await waitFor(() => expect(actions).toContainEqual(expectedPayload));
    expect(hideModal).toHaveBeenCalledTimes(1);
  });

  it('should try to close modal', () => {
    userEvent.click(screen.getByLabelText(/close/));
    expect(hideModal).toHaveBeenCalledTimes(1);
  });

  it('should render the create counter form', () => {
    expect(screen.getByText('CreateCounterComponentMock')).toBeInTheDocument();
  });
});
