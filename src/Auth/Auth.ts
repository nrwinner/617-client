import history from '../history';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

import store from '../store'
import { initUser, logoutUser } from '../redux-actions';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkSession = this.checkSession.bind(this);
    this.setSession = this.setSession.bind(this);
    this.storeUser = this.storeUser.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // logged in
        this.setSession(authResult);
        this.storeUser(authResult);
      } else if (err) {
        // not logged in
        history.replace('/home');
        console.log(err);
        // alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  checkSession() {
    let self = this;
    this.auth0.checkSession({}, function (err, authResult) {
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        // logged in
        self.setSession(authResult);
        self.storeUser(authResult);
      } else if (err) {
        // not logged in
        history.replace('/home');
        console.log(err);
        // alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult: any) {
    console.log(authResult);
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');

    store.dispatch(logoutUser())
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  storeUser(authResult: any) {
    let u = {
      id: authResult.idTokenPayload.sub.split('|')[1],
      name: authResult.idTokenPayload.name
    }
    store.dispatch(initUser(u));
  }
}
