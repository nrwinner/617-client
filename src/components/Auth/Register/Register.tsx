import * as React from 'react';

import history from '../../../history';

type State = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordVerify: string;
    error: string;
    [key: string]: string;
}

class Register extends React.Component<{ respond: Function }> {
    state: State;

    constructor(props: { respond: Function }) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordVerify: '',
            error: ''
        }
    }

    update(property: string, value: string) {
        let s: State = this.state;
        s[property] = value;
        
        this.setState(s);
    }

    respond() {
        let empty = Object.keys(this.state)
            .filter((k: string) => k !== 'error')
            .map((k: string) => this.state[k])
            .filter((l: string) => l === '');

        if (empty.length) {
            this.setState({
                error: 'Please complete all fields!'
            });
            return;
        }

        if (this.state.password !== this.state.passwordVerify) {
            this.setState({
                error: 'Passwords don\'t match!'
            });
            return;
        }

        if (!this.state.email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
            this.setState({
                error: 'Please enter a valid email'
            });
            return;
        }
        
        
        this.props.respond(this.state);
    }

    render() {
        return (
            <div className="register">
                    <div className="auth-title">Register!</div>
                    <div className="form">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            this.respond();
                        }}>
                            { this.state.error && this.state.error !== '' && <div className="error"> { this.state.error } </div> }
                            <input name="first" type="text" placeholder="First name" onChange={(e) => {
                                this.update('firstname', e.target.value);
                            }} />
                            <input name="last" type="text" placeholder="Last name" onChange={(e) => {
                                this.update('lastname', e.target.value);
                            }} />
                            <input name="email" type="text" placeholder="Email address" onChange={(e) => {
                                this.update('email', e.target.value);
                            }} />
                            <input name="password" type="password" placeholder="Password" onChange={(e) => {
                                this.update('password', e.target.value);
                            }} />
                            <input name="passwordVerify" type="password" placeholder="Verify password" onChange={(e) => {
                                this.update('passwordVerify', e.target.value);
                            }} />
                            <div className="button-group">
                                <div className="action"> or <span onClick={() => history.replace('login')}>already have an account? Login!</span></div>
                                <div className="button" onClick={() => this.respond()}>Register!</div>
                            </div>
                            <input type="submit" style={{visibility: 'hidden'}} />
                        </form>
                    </div>
                </div>
        )
    }
}

export default Register;