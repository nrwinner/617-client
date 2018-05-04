import * as React from 'react';

import history from '../../../history';

type State = {
    email: string;
    password: string;
    [key: string]: string;
}

class Login extends React.Component<{ respond: Function }> {
    state: State;

    constructor(props: { respond: Function }) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    update(property: string, value: string) {
        let s: State = this.state;
        s[property] = value;
        
        this.setState(s);
    }

    respond() {
        if (this.state.email === '' || this.state.password === '') {
            alert('Please complete all fields!');
            return;
        }

        this.props.respond(this.state);
    }

    render() {
        return (
            <div className="login">
                <div className="auth-title">Login!</div>
                <div className="form">
                    <input name="email" type="text" placeholder="Email address" value={this.state.email} onChange={(e) => {
                        this.update('email', e.target.value);
                    }} />
                    <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={(e) => {
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