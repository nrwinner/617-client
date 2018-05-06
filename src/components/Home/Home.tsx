import * as React from 'react';
import { initUser } from '@/redux-actions';

import { connect } from 'react-redux';
import InvitationsContainer from '../Table/containers/Invitations';
import history from '@/history';
import { Loader } from '../Loader/Loader';

import Banner from './components/Banner/Banner';
import { UserType } from 'types';

import UserInjector from '../../UserInjector';


class Home extends UserInjector<{}> {
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
    console.log('PROPS', this.props);
    return (
      <div className="home-wrapper">
        <Banner title={'Welcome back, ' + this.props.user.firstname} text={'We\'re happy you\'re here!'} />
      </div>
    )
  }

  render() {
      return this.renderUserHome()
  }
}

  

export default Home;
