import * as React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import axios  from 'axios';
import routes from '../../routes';
import history from '../../history';

import './Auth.scss';

import Login from './Login/Login';
import Register from './Register/Register';

import { initUser } from '../../redux-actions';
import { connect } from 'react-redux';
import { UserType } from '../../types';

type State = {
    loginError?: string;
    registerError?: string;
};

class AuthComponent extends React.Component<{ setUser: Function } > {
    state: State;

    constructor(props: any) {
        super(props);

        this.state = {};

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    login({ email, password }: { email: string, password: string }) {
        axios.post(routes.login, { email, password }, { withCredentials: true })
            .then(res => {
                this.props.setUser(res.data as UserType);
                history.push('/home');
            },    error => {
                this.setState({
                    loginError: 'Incorrect username/password!'
                });
            });
    }

    register({ firstname, lastname, email, password }: { firstname: string, lastname: string, email: string, password: string }) {
        axios.post( routes.register, {firstname, lastname, email, password } , { withCredentials: true } ).then(res => {
            this.props.setUser(res.data as UserType);
            history.push('/home');
        },                                                                                                      error => {
            this.setState({
                registerError: 'An error occured!'
            });
        });
    } 
    
    render() {
        return (
            <div>
                <Router history={history}>
                    <div className="auth-component">
                        <Switch>
                            <Route path="/auth/login" render={(props: any) => <Login respond={this.login} error={this.state.loginError || undefined} {...props} />} />
                            <Route path="/auth/register" render={(props: any) => <Register respond={this.register} error={this.state.registerError || undefined} {...props} />} />
                            <Redirect to={'/auth/login'} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setUser: (p: string[]) => dispatch(initUser({...p}))
});

export default connect(null, mapDispatchToProps)(AuthComponent);