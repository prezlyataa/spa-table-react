import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import RouteSchema from './routes/routeSchema';

const App = () =>
  <Router>
      <Switch>
          <RouteSchema />
      </Switch>
  </Router>;

export default App;
