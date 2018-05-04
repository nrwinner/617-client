import * as React from 'react';
import { initUser } from '@/redux-actions';

import { connect } from 'react-redux';
import InvitationsContainer from '../Table/containers/Invitations';
import history from '@/history';

type Props = {
  loggedIn?: boolean;
  userLoggedIn: boolean;
}

class Home extends React.Component<Props> {
  data: any;

  constructor(props: any) {
    super(props);

    this.data = {
      tables: [
        {
          id: '1',
          host: {
            name: 'Sean Donnelly'
          },
          members: [
            {
              name: 'Nick Winner',
            },
            {
              name: 'Shy LaBeef'
            }
          ],
          bytes: [
            {
              id: '5ae37ed5f6ef140a75f137a6',
              name: 'COSC 457 Github Basics',
              description: 'Learn the basics of version control and applies them to Git',
              sections: [1, 2, 3, 4, 5, 6, 7]
            }
          ]
        }
      ]
    }
  }

  /**
   * The home page when the client is in the authenticated state.
   * 
   * @memberof Home
   */
  renderUserHome() {
    return (
      <div className="home-wrapper">
        <div onClick={() => history.push('table')}>Table</div>
        <div onClick={() => history.push('auth')}>Auth</div>
        <div onClick={() => history.push('byte')}>Byte</div>
      </div>
    )
  }

  render() {
    if (this.props.loggedIn || this.props.userLoggedIn) {
      return this.renderUserHome()
    } else {
      history.push('auth');
      return null;
    }
  }

  
}

const mapStateToProps = (state: any) => ({
  userLoggedIn: state.currentUser ? true : false
})

export default connect(mapStateToProps, null)(Home);
