import * as React from 'react';
import { initUser } from '@/redux-actions';

import { connect } from 'react-redux';
import InvitationsContainer from '../Table/containers/Invitations';
import history from '@/history';
import Navbar from '../Navbar/Navbar';

type Props = {
  loggedIn?: boolean;
  userLoggedIn: boolean;
}

class Home extends React.Component<Props> {

  constructor(props: any) {
    super(props);

    console.log(props)
  }

  /**
   * The home page when the client is in the authenticated state.
   * 
   * @memberof Home
   */
  renderUserHome() {
    return (
      <div className="home-wrapper">
        <Navbar />
        <div onClick={() => history.push('table')}>Table</div>
        <div onClick={() => history.push('auth')}>Auth</div>
        <div onClick={() => history.push('byte')}>Byte</div>
      </div>
    )
  }

  render() {
    if (this.props.loggedIn) {
      return this.renderUserHome()
    } else if (typeof this.props.loggedIn) {
      return (
        <span> You're not logged in!</span>
      )
    } else {
      return null;
    }
  }

  
}

const mapStateToProps = (state: any) => ({
  userLoggedIn: state.currentUser ? true : false
})

export default connect(mapStateToProps, null)(Home);
