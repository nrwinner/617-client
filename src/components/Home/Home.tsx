import * as React from 'react';
import { initUser } from '../../redux-actions';

import { connect } from 'react-redux';
import history from '../../history';
import { Loader } from '../Loader/Loader';

import Banner from './components/Banner/Banner';
import { UserType, TableType } from 'types';

import UserInjector from '../../UserInjector';

import DashCard from '../DashCard/DashCard';
import Invitations from './components/Invitations/Invitations';
import Tables from  './components/Tables/Tables';

import './Home.scss';

// Apollo
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';


import Popup from '../../components/Popup/Popup';
import ApolloClient from 'apollo-client';

type State = {
  invitationPopup: boolean;
  createTablePopup: boolean;
  activeInvitation?: TableType;
  queryData?: any;
}

type Props = {
  client: ApolloClient<any>;
  [propName: string]: any;
}

class Home extends UserInjector<{ props: Props }> {
  refetch?: Function;
  state: State;
  query: any;

  constructor(public props: any) {
    super(props);

    this.query = gql`query user($id: String!) {
      user(id: $id) {
        id,
        bytesCompleted {
          id,
          name,
          creator {
            id,
            firstname,
            lastname,
            email,
          }
        },
        tables {
          id,
          name,
          owner {
            id,
            firstname,
            lastname
          }
        },
        invitations {
          id,
          name,
          owner {
            id,
            firstname,
            lastname
          }
        }
      }
    }`;

    this.state = {
      invitationPopup: false,
      createTablePopup: false,
    }

    this.invitationClickHandler = this.invitationClickHandler.bind(this);
    this.invitationResponder = this.invitationResponder.bind(this);
    this.toggleInvitationPopup = this.toggleInvitationPopup.bind(this);
    this.toggleCreateTablePopup = this.toggleCreateTablePopup.bind(this);
    this.createTableResponder = this.createTableResponder.bind(this);
  }

  invitationClickHandler(t: TableType) {
    if (t) {
      this.setState({
        activeInvitation: t
      }, () => {
        this.toggleInvitationPopup(true);
      });
    } else {
      console.log('Caught Error: You didn\'t pass anything to the invitationClickHandler function! This should\'t happen!');
    }
  }

  async invitationResponder(accept: boolean) {
    if (typeof accept !== 'undefined') {

      if (accept) {
        //accept invitation
        let q = gql`mutation joinTable($tableId: String!, $userId: String!) {
          joinTable(tableId: $tableId, userId: $userId)
        }`;
        
        try {
          let { data } = await this.props.client.mutate({mutation: q, variables: {
              tableId: this.state.activeInvitation ? this.state.activeInvitation.id : '',
              userId: this.props.user ? this.props.user.id : '',
          }});

          // sanity check
          if (typeof this.refetch !== 'undefined') {
            this.refetch();
          }
        } catch (e) {
          console.log(`Caught Error: ${e}`);
        }
      } else {
        // cancel invitation
        let q = gql`mutation uninviteUserToTable($tableId: String, $email: String) {
          uninviteUserToTable(tableId: $tableId, email: $email) { id }
        }`;

        try {
          let { data } = await this.props.client.mutate({mutation: q, variables: {
              tableId: this.state.activeInvitation ? this.state.activeInvitation.id : '',
              email: this.props.user ? this.props.user.email : '',
          }});

          // sanity check
          if (typeof this.refetch !== 'undefined') {
            this.refetch();
          }
        } catch (e) {
          console.log(`Caught Error: ${e}`);
        }
      }
    }
    // close popup regardless
    this.toggleInvitationPopup(false);
  }

  async createTableResponder(tableName: string) {
    if (typeof tableName !== 'undefined') {
      let q = gql`mutation createTable($name: String!, $hostId: String!) {
        createTable(name: $name, hostId: $hostId) { id }
      }`;

      await this.props.client.mutate({mutation: q, variables: {
        hostId: this.props.user.id,
        name: tableName
      }});

      if (this.refetch) {
        this.refetch();
      }

      this.toggleCreateTablePopup(false);
    }
  }

  toggleInvitationPopup(val: boolean) {
    this.setState((state: State) => ({
      invitationPopup: typeof val !== 'undefined' ? val : !state.invitationPopup
    }));
  }

  toggleCreateTablePopup(val: boolean) {
    this.setState((state: State) => ({
      createTablePopup: typeof val !== 'undefined' ? val : !state.invitationPopup
    }));
  }

  render() {
    let id = this.props.user ? this.props.user.id : '';

    return (
      <Query query={this.query} variables={{id}}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Loader text="Loading user..." />;
          if (error) return <p>Error :( {error}</p>;

          data = data.user;
          this.refetch = refetch;

          return (
            <div className="home-wrapper">
              <Popup open={this.state.invitationPopup} data={{invitation: this.state.activeInvitation, respond: this.invitationResponder}} type={'TABLE_INVITATION'} close={() => this.toggleInvitationPopup(false)} />
              <Popup open={this.state.createTablePopup} data={{respond: this.createTableResponder}} type={'CREATE_TABLE'} close={() => this.toggleCreateTablePopup(false)} />
              { this.props.user && <Banner title={'Welcome back, ' + this.props.user.firstname + '!'} text={'We\'re happy you\'re here!'} /> }
              <div className="grid-inner">
                <div className="home-top-grid">
                  <DashCard title={'Invitations'}>
                    <Invitations invitations={data.invitations} clickHandler={this.invitationClickHandler} />
                  </DashCard>
                  <DashCard title={'Tables'}>
                    <div className="new-table-button" onClick={() => this.toggleCreateTablePopup(true)} />
                    <Tables tables={data.tables} uid={this.props.user.id} />
                  </DashCard>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

  

export default withApollo(Home);
