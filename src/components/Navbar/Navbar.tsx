import * as React from 'react';
import { UserType } from '../../types';
import { Cookies } from 'react-cookie';
import './Navbar.scss';
import { connect } from 'react-redux';

import history from '../../history';
import UserInjector from '../../UserInjector';
import { logoutUser } from '../../redux-actions';

class Navbar extends UserInjector<{}> {
    avatar: string;

    constructor(props: any) {
        super(props);
        this.removeCookie = this.removeCookie.bind(this);
        this.avatar = 'https://i1.wp.com/grueneroadpharmacy.com/wp-content/uploads/2017/02/user-placeholder-1.jpg?ssl=1';
    }

    removeCookie() {
        new Cookies().remove('presence', { path: '/', secure: true});
        this.props.logout();
    }

    render() {
        return (
            <div className="navbar">
                <div className="grid-inner">
                    <div className="navbar-title" onClick={() => history.push('/home')}>
                        <div className="navbar-logo"/>
                        SoftwareBytes
                    </div>
                    <div className="right">
                        {this.props.user &&  <span className="greeting">{this.props.user.firstname} {this.props.user.lastname}</span>}
                        <img className="avatar" src={this.avatar} alt="User\'s Avatar" />

                        <div className="divider" />
                        <button className="logout" onClick={this.removeCookie}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    logout: () => dispatch(logoutUser())
});

export default connect(null, mapDispatchToProps)(Navbar);