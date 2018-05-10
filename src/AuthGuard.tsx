import * as React from 'react';
import axios  from 'axios';
// @ts-ignore
import { Cookies } from 'react-cookie';
import { initUser } from './redux-actions';
import { connect } from 'react-redux';
import routes from './routes';
import { UserType } from './types';
import history from './history';
import { Loader } from './components/Loader/Loader';

type State= {
    currentUser: UserType;
    queryFinished: boolean;
    hasCookie: boolean;
    component: JSX.Element | undefined;
}

class AuthGuard extends React.Component<{component: JSX.Element, currentUser: UserType, setUser: any}> {
    state: State;

    constructor(props: { component: JSX.Element, currentUser: UserType, setUser: any }) {
        super(props);

        this.state = {
            currentUser: props.currentUser || undefined,
            queryFinished: false,
            hasCookie: new Cookies().get('presence') ? true : false,
            component: undefined
        };

        this.check = this.check.bind(this);
    }

    componentDidMount() {
        this.check();
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.currentUser) {
            this.setState((state: State) =>  ({
                queryFinished: true,
                currentUser: nextProps.currentUser,
                component: React.cloneElement(nextProps.component, { user: nextProps.currentUser })
            }));
        } else if (nextProps.component) {
            this.setState({
                currentUser: this.props.currentUser || undefined,
                queryFinished: false,
                hasCookie: new Cookies().get('presence') ? true : false,
                component: undefined
            }, () => this.check());
        }
    }

    check() {
        if (!this.state.component) {
            if (this.state.hasCookie) {
                axios.get(routes.validateToken, { withCredentials: true }).then(res => {
                    let u = res.data as UserType;
                    this.props.setUser({ id: u.id, firstname: u.firstname, lastname: u.lastname, email: u.email });
                }, (error) => {
                    // do nothing, bad token
                    this.setState({
                        queryFinished: true
                    })
                })
            } else {
                this.setState({
                    queryFinished: true
                })
            }
        } else {
            this.setState((state: State) => ({
                queryFinished: true,
                component: React.cloneElement(this.props.component, { user: state.currentUser })
            }));
        }
    }

    goToLogin() {
        if (history.location.pathname.split('/')[1] !== 'auth') {
            history.push('/auth');
        }
    }

    render() {
        return (
            (this.state.component) ? this.state.component : // logged in
                this.state.queryFinished && this.goToLogin() ? null : // not logged in
                    <Loader /> // query running
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.currentUser,
})

const mapDispatchToProps = (dispatch: any) => ({
    setUser: (p: string[]) => dispatch(initUser({...p}))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthGuard);