import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Magda">
          <p>Magda</p>
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
