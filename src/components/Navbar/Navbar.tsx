import * as React from 'react';
import { UserType } from '@/types';

import './Navbar.scss';

import { connect } from 'react-redux';

class Navbar extends React.Component<{ loggedIn: boolean, user: UserType }> {
    
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="navbar">
                <div className="navbar-title">SoftwareBytes</div>
                <div className="right">
                    This all goes on the right
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    user: state.currentUser
})

export default connect(mapStateToProps, null)(Navbar);