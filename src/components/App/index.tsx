import Loading from 'components/Loading';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ROUTES from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading className="m-h-auto m-top-15" />}>
        <Router>
          <Switch>
            {ROUTES.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        </Router>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
