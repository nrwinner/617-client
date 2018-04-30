import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Home extends Component {
  login() {
    this.props.auth.login();
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  /**
   * The home page when the client is in the authenticated state.
   * 
   * @memberof Home
   */
  renderUserHome() {
    return (
      <section>
        <h4>
          You are logged in!
        </h4>
        <ul>
          <li>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'table')}
            >
              Go to table
            </Button>
          </li>
        </ul>
      </section>
    )
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && this.renderUserHome()
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }

  
}



export default Home;
