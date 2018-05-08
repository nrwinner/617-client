import * as React from 'react';
import { initUser } from '@/redux-actions';

import { connect } from 'react-redux';
import history from '@/history';
import { Loader } from '../Loader/Loader';

import Banner from './components/Banner/Banner';
import { UserType } from 'types';

import UserInjector from '../../UserInjector';

import DashCard from '../DashCard/DashCard';
import Invitations from './components/Invitations/Invitations';

import './Home.scss';


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
      ],
      invitations: [
        {
          date: '5/6/2018',
          host: 'Sean Donnelly',
          name: 'COSC 617: Advanced Web Development'
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
        { this.props.user && <Banner title={'Welcome back, ' + this.props.user.firstname} text={'We\'re happy you\'re here!'} /> }
        <div className="grid-inner">
          <div className="home-top-grid">
            <DashCard title={'Invitations'}>
              <Invitations invitations={this.data.invitations} />
            </DashCard> 
            <DashCard title={'Tables'}>
              
            </DashCard>
          </div>
        </div>
      </div>
    )
  }

  render() {
      return this.renderUserHome()
  }
}

  

export default Home;
