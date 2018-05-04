import * as React from 'react';
import { Redirect, Route, Router, Link } from 'react-router-dom';
import axios  from 'axios';
import routes from '@/routes';
import history from '@/history';

import './Auth.scss';

import Login from './Login/Login';
import Register from './Register/Register';

import { initUser } from '@/redux-actions';
import { connect } from 'react-redux';

class AuthComponent extends React.Component<{ setUser: Function } > {

    constructor(props: any) {
        super(props);

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    login({ email, password }: { email: string, password: string }) {
        axios.post(routes.login, { email, password }, { withCredentials: true }).then(res => {
            // FIXME: This should set the user object that's returned from the API
            this.props.setUser('Nick' + ' ' + 'Winner', '5');
            history.push('/home');
        }, error => {
            alert('An error occured!');
            console.log(`Error: ${error}`)
        })
    }

    register({ firstname, lastname, email, password }: { firstname: string, lastname: string, email: string, password: string }) {
        axios.post( routes.register, {firstname, lastname, email, password } , { withCredentials: true } ).then(res => {
            // FIXME: This should set the user object that's returned from the API
            this.props.setUser(firstname + ' ' + lastname, '5');
            history.push('/home');
        }, error => {
            alert('An error occured!');
            console.log(`Error: ${error}`)
        })
    } 
    
    render() {
        return (
            <div>
                <Router history={history}>
                    <div className="auth-component">
                        <Redirect exact path="/" to={'/auth/login'} />
                        <Route path="/auth/login" render={(props: any) => <Login respond={this.login} {...props} />} />
                        <Route path="/auth/register" render={(props: any) => <Register respond={this.register} {...props} />} />
                    </div>
                </Router>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setUser: (name: string, id: string) => dispatch(initUser({ name, id }))
})

export default connect(null, mapDispatchToProps)(AuthComponent);