import * as React from 'react';

import history from '../../../history';

type State = {
    email: string;
    password: string;
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
                        this.setState({email: e.target.value })
                    }} />
                    <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={(e) => {
                        this.setState({password: e.target.value })
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