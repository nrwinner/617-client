import * as React from 'react';

import history from '../../../history';

type State = {
    email: string;
    password: string;
    [key: string]: string;
}

class Login extends React.Component<{ respond: Function }> {
    data: State;

    constructor(props: { respond: Function }) {
        super(props);

        this.data = {
            email: '',
            password: ''
        };
    }

    update(property: string, value: string) {
        let s: State = this.data;
        s[property] = value;
        
        this.data = s;
    }

    respond() {
        if (this.data.email === '' || this.data.password === '') {
            alert('Please complete all fields!');
            return;
        }

        this.props.respond(this.data);
    }

    render() {
        return (
            <div className="login">
                <div className="auth-title">Login!</div>
                <div className="form">
                    <input name="email" type="text" placeholder="Email address" onChange={(e) => {
                        this.update('email', e.target.value);
                    }} />
                    <input name="password" type="password" placeholder="Password" onChange={(e) => {
                        this.update('password', e.target.value);
                    }} />
                    <div className="button-group">
                        <div className="action"> or <span onClick={() => history.replace('register')}>Create an account!</span></div>
                        <div className="button" onClick={() => this.respond()}>Login!</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;