import * as React from 'react';
import { UserType } from '@/types';

import './Navbar.scss';
import { connect } from 'react-redux';

import history from '@/history';
import UserInjector from '../../UserInjector';

class Navbar extends UserInjector<{}> {
    
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="navbar">
                <div className="grid-inner">
                    <div className="navbar-title" onClick={() => history.push('home')}>
                        <div className="navbar-logo"></div>
                        SoftwareBytes
                    </div>
                    <div className="right">
                        {this.props.user &&  <span>Hey there, { this.props.user.firstname }!</span> }
                        
                        {/* TODO: Implement a logout feature */}
                        <div className="button">Logout</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;