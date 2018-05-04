import * as React from 'react';
import { Redirect, Route, Router, Link } from 'react-router-dom';
import axios  from 'axios';
import routes from '@/routes';
import history from '@/history';

import './Auth.scss';

import Login from './Login/Login';
import Register from './Register/Register';

class AuthComponent extends React.Component {

    constructor(props: any) {
        super(props);

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    login({ email, password }: { email: string, password: string }) {
        axios.post(routes.login, { email, password }, { withCredentials: true }).then(res => {
            history.push('/home');
        }, error => {
            alert('An error occured!');
            console.log(`Error: ${error}`)
        })
    }

    register({ firstname, lastname, email, password }: { firstname: string, lastname: string, email: string, password: string }) {
        axios.post( routes.register, {firstname, lastname, email, password } , { withCredentials: true } ).then(res => {
            history.push('/home');
        }, error => {
            alert('An error occured!');
            console.log(`Error: ${error}`)
        })
    }
    
    render() {
        return (
            <div>
                <div className="auth-component">
                    <Redirect exact path="/" to={'/auth/login'} />
                    <Route path="/auth/register" render={(props: any) => <Register respond={this.register} {...props} />} />
                    <Route path="/auth/login" render={(props: any) => <Login respond={this.login} {...props} />} />
                </div>
            </div>
        )
    }
}

export default AuthComponent;