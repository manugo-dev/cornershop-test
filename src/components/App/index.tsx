import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Loading from 'components/Loading';
import generateStore from 'redux/store';

import ROUTES from './routes';

function App() {
  return (
    <Provider store={generateStore()}>
      <Suspense fallback={<Loading className="m-h-auto m-top-15" />}>
        <Router>
          <Switch>
            {ROUTES.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        </Router>
      </Suspense>
    </Provider>
  );
}

export default App;
