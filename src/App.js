import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Redirect, Route, Router } from 'react-router-dom';
import Home from './components/Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import Table from './components/Table/Table';
import Byte from './components/Byte/Byte';
import './App.scss';

const auth = new Auth();
const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  goTo(route) {
    history.replace(`/${route}`)
  }

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  render() {
    const { isAuthenticated } = auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <button 
                onClick={this.goTo.bind(this, 'home')}
                className="brand-button"
              >
                SoftwareBytes
              </button>
            </Navbar.Brand>
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                <Button
                  bsStyle="success"
                  className="btn-margin"
                  onClick={this.goTo.bind(this, 'byte')}
                >
                  Byte
                </Button>
              )
            }
            {
              isAuthenticated() && (
                <Button
                  id="qsLogoutBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                  </Button>
              )
            }
          </Navbar.Header>
        </Navbar>
        <Router history={history}>
          <div>
            <Redirect exact path="/" to="/home" />
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
            
            <Route path="/table" render={(props) => <Table />} />
            <Route path="/byte" render={(props) => <Byte />} />
            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />
            }} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
