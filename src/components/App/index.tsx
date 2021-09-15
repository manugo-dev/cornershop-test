import Loading from 'components/Loading';
import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ROUTES from './routes';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          {ROUTES.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
