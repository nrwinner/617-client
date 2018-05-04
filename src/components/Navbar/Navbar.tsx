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
                <div className="grid-inner">
                    <div className="navbar-title">SoftwareBytes</div>
                    <div className="right">
                        { this.props.user &&  <span>Hey there, { this.props.user.name.split(' ')[0] }!</span> }
                        
                        {/* TODO: Implement a logout feature */}
                        <div className="button">Logout</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    user: state.currentUser
})

export default connect(mapStateToProps, null)(Navbar);