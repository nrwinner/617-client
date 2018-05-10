import * as React from 'react';

import history from '../../../history';

type State = {
    email: string;
    password: string;
    error: string;
    [key: string]: string;
}

type Props = {
    respond: Function, error?: string
}

class Login extends React.Component<Props> {
    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.error) {
            this.setState({
                error: nextProps.error
            });
        }
    }

    update(property: string, value: string) {
        let s: State = this.state;
        s[property] = value;
        
        this.setState(s);
    }

    respond() {
        this.setState({
            error: ''
        });

        if (this.state.email === '' || this.state.password === '') {
            this.setState({
                error: 'Please complete all fields!'
            });
            return;
        }

        this.props.respond(this.state);
    }

    render() {
        return (
            <div className="login">
                <div className="auth-title">Login!</div>
                <div className="form">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.respond();
                    }}>
                        { this.state.error && this.state.error !== '' && <div className="error"> { this.state.error } </div> }
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
                        <input type="submit" style={{visibility: 'hidden'}} />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;