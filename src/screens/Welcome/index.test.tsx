import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import paths from 'components/App/paths';

import Welcome from './index';

describe('#WelcomeScreen', () => {
  const history = createMemoryHistory();
  beforeEach(() =>
    render(
      <Router history={history}>
        <Welcome />
      </Router>
    )
  );

  test('It must show the welcome title, description and button', () => {
    expect(screen.getByText(/title/)).toBeInTheDocument();
    expect(screen.getByText(/description/)).toBeInTheDocument();
    expect(screen.getByText(/getStarted/)).toBeInTheDocument();
  });

  test('It must redirect to counters when press the getStarted button', () => {
    userEvent.click(screen.getByText(/getStarted/));
    expect(history.location.pathname).toBe(paths.counters);
  });
});
