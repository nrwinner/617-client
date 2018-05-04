import * as React from 'react';
import { Cookies } from 'react-cookie';
import { Redirect, Route, Router } from 'react-router-dom';
import './App.scss';
import AuthComponent from './components/Auth/Auth';
import Byte from './components/Byte/Byte';
import Home from './components/Home/Home';
import Table from './components/Table/Table';
import history from './history';

type State = {
  loggedIn: boolean;
}


class App extends React.Component {
  state: State;

  constructor(props: any) {
    super(props);

    this.state = {
      loggedIn: new Cookies().get('presence') ? true : false
    }

  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Redirect exact path="/" to="/home" />
            <Route path="/home" render={(props: any) => <Home loggedIn={this.state.loggedIn} {...props} />} />
            
            <Route path="/table" render={(props: any) => <Table />} />
            <Route path="/byte" render={(props: any) => <Byte />} />
            <Route path="/auth" render={(props: any) => <AuthComponent />} />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
