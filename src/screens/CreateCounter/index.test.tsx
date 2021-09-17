import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Middleware, Dispatch, AnyAction } from 'redux';
import configureStore from 'redux-mock-store';
import { ActionTypes, INITIAL_DATA, NAME as countersReducer } from 'redux/ducks/counters';

import CreateCounterForm from './index';

const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
const mockStore = configureStore(middlewares);

describe('#CreateCounterForm', () => {
  const onSubmitFn = jest.fn();
  const showExamples = jest.fn();
  const store = mockStore({ [countersReducer]: { ...INITIAL_DATA } });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <CreateCounterForm onSubmit={onSubmitFn} showExamples={showExamples} />
      </Provider>
    );
  });

  it('should call submit when user submit the form', () => {
    userEvent.type(screen.getByLabelText(/name/), 'NewList');
    userEvent.type(screen.getByLabelText(/name/), '{enter}');
    expect(onSubmitFn).toHaveBeenCalledTimes(1);
  });

  it('should try to show examples modal when user press show examples', () => {
    userEvent.click(screen.getByText(/exampleLink/));
    expect(showExamples).toHaveBeenCalledTimes(1);
  });

  it('should dispatch changes when user changes input text', async () => {
    userEvent.type(screen.getByLabelText(/name/), 'NewList2');
    const actions = store.getActions();
    const expectedPayload = { type: ActionTypes.SET_CREATION_TITLE, payload: 'NewList2' };
    await waitFor(() => expect(actions).toContainEqual(expectedPayload));
  });
});
