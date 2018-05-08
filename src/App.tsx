import * as React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import './App.scss';
import AuthComponent from './components/Auth/Auth';
import Byte from './components/Byte/Byte';
import Home from './components/Home/Home';
import Table from './components/Table/Table';
import history from './history';

import Navbar from './components/Navbar/Navbar';
import AuthGuard from 'AuthGuard';


class App extends React.Component<{ setUser: Function }> {

  constructor(props: any) {
    super(props);
    
  }

  render() {
    return (
      <div>
        <AuthGuard component={<Navbar />} />
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/home" render={(props: any) => <AuthGuard component={<Home />} /> } />
              <Route path="/table" render={(props: any) => <Table />} />
              <Route path="/byte/:id" render={(props: any) => <AuthGuard component={<Byte {...props} />} />} />
              <Route path="/auth" render={(props: any) => <AuthComponent />} />
              {/* Catch all */}
              <Redirect to="/home" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
