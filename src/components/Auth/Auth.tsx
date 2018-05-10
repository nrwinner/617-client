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

class AuthComponent extends React.Component<{ setUser: Function } > {

    constructor(props: any) {
        super(props);

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    login({ email, password }: { email: string, password: string }) {
        axios.post(routes.login, { email, password }, { withCredentials: true }).then(res => {
            this.props.setUser(res.data as UserType);
            history.push('/home');
        }, error => {
            alert('An error occured!');
            console.log(`Caught Error: ${error}`)
        })
    }

    register({ firstname, lastname, email, password }: { firstname: string, lastname: string, email: string, password: string }) {
        axios.post( routes.register, {firstname, lastname, email, password } , { withCredentials: true } ).then(res => {
            this.props.setUser(res.data as UserType);
            history.push('/home');
        }, error => {
            alert('An error occured!');
            console.log(`Caught Error: ${error}`)
        })
    } 
    
    render() {
        return (
            <div>
                <Router history={history}>
                    <div className="auth-component">
                        <Switch>
                            <Route path="/auth/login" render={(props: any) => <Login respond={this.login} {...props} />} />
                            <Route path="/auth/register" render={(props: any) => <Register respond={this.register} {...props} />} />
                            <Redirect to={'/auth/login'} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setUser: (p: string[]) => dispatch(initUser({...p}))
})

export default connect(null, mapDispatchToProps)(AuthComponent);