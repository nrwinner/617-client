import * as React from 'react';
import Banner from '../Home/components/Banner/Banner';
import Popup from '../Popup/Popup'
import ByteGroup from '../ByteGroup/ByteGroup';
import './Table.scss';
import { connect } from 'react-redux';
import { UserType, ByteType } from '../../types';
import { Link } from 'react-router-dom';
import UserGroup from '../UserGroup/UserGroup';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Loader } from '../Loader/Loader';
import { withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client/ApolloClient';

type Props = {
  currentUser: UserType;
  client: ApolloClient<any>;
  [propsName: string]: any;
}

type State = {
  addMembersPopup: boolean;
  addBytesPopup: boolean;
  nextByte?: ByteType;
  mode: boolean; // true is bytes, false is guests
  tableID: string;
  data?: any;
  members?: UserType[];
  invitations?: UserType[]
  owned?: boolean;
}

/**
 * We must wait for the user data to come through before querying for the table information
 */
class Table extends React.Component<Props> {
  query: any;
  completed: Array<string>;
  state: State

  constructor(props: Props) {
    super(props);

    this.query = gql`query table($tableId: String!, $userId: String!) {
      table(id: $tableId) {
        id,
        name,
        owner {
          id,
          firstname,
          lastname,
          email
        },
        invitations {
          id,
          firstname,
          lastname,
          email
          bytesCompleted {
            id,
            name,
          }
        },
        members {
          id,
          firstname,
          lastname,
          email,
          bytesCompleted {
            id,
            name,
          }
        },
        bytes {
          id,
          name, 
          image,
          creator {
            id,
            firstname,
            lastname
          }
        }
      },
      user(id: $userId) {
        id,
        name,
        bytesCompleted {
          id,
          name
        }
      }
    }`;

    let id: string = props.match.params.id;

    this.state = {
      addMembersPopup: false,
      addBytesPopup: false,
      mode: true,
      tableID: id
    }

    this.toggleAddMembersPopup = this.toggleAddMembersPopup.bind(this);
    this.toggleAddBytesPopup = this.toggleAddBytesPopup.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.performQuery = this.performQuery.bind(this);
    this.removeByte = this.removeByte.bind(this);
    this.addBytes = this.addBytes.bind(this);
    this.addMembers = this.addMembers.bind(this);
    this.removeUser = this.removeUser.bind(this);

    if (props.currentUser) {
      this.performQuery(props.currentUser.id);
    }
  }

  async performQuery(userId: string) {
    try {
      const { data }: { data: any } = await this.props.client.query({query: this.query, fetchPolicy: 'no-cache', variables: {tableId: this.state.tableID, userId}});

      // process data
      let owned = data.table.owner.id === userId;
      
      if (data.user.bytesCompleted && data.user.bytesCompleted.length) {
        this.completed = data.user.bytesCompleted.map((b: ByteType) => b.id);
        let b: ByteType = this.getNextByte(data.table.bytes, this.completed);

        this.setState({
          nextByte: b
        })
      }

      let members = data.table.members.map((u: UserType) => Object.assign({}, u, {status: true}))
      let invitations = data.table.invitations.map((u: UserType) => Object.assign({}, u, {status: false}))

      this.setState({
        data,
        members, 
        invitations,
        owned,
      })
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.currentUser) {
      // now we can load our data
      this.performQuery(nextProps.currentUser.id);
    }
  }

  /**
   * Takes an array of ByteTypes and a list of completed ID's, returns the first non-completed Byte or undefined
   * @param bytes 
   * @param completed 
   */
  getNextByte(bytes: Array<ByteType>, completed: Array<string>): ByteType {
    return bytes.filter(b => !completed.includes(b.id))[0] || undefined;
  }

  /**
   * Toggles the AddMembers popup
   */
  toggleAddMembersPopup(val?: boolean) {
    this.setState((state: State) => ({
      addMembersPopup: typeof val !== 'undefined' ? val : !state.addMembersPopup
    }))
  }

  /**
   * Toggles the AddBytes popup
   */
  toggleAddBytesPopup(val?: boolean) {
    this.setState((state: State) => ({
      addBytesPopup: typeof val !== 'undefined' ? val : !state.addBytesPopup
    }));
  }

  async addBytes(s: string[]) {
    let q = gql`mutation addByteToTable($byteId: String!, $tableId: String!) {
      addByteToTable(byteId: $byteId, tableId: $tableId)
    }`;

    for (let item of s) {
      await this.props.client.mutate({mutation: q, variables: {
        tableId: this.state.data.table.id,
        byteId: item
      }});
    }

    this.performQuery(this.props.currentUser.id);

    this.toggleAddBytesPopup(false);
  }

  async addMembers(s: string[]) {
    let q = gql`mutation inviteUser($tableId: String!, $email: String!) {
      inviteUser(tableId: $tableId, email: $email) { id }
    }`;

    for (let item of s) {
      console.log(item)
      await this.props.client.mutate({mutation: q, variables: {
        tableId: this.state.data.table.id,
        email: item
      }});
    }

    this.performQuery(this.props.currentUser.id);

    this.toggleAddMembersPopup(false);
  }

  /**
   * Toggles view between a table's bytes and users
   * @param val 
   */
  toggleView(val: boolean = true) {
    this.setState({
      mode: val
    });
  }

  async removeByte(byteId: string) {
    let q = gql`mutation removeByte($tableId: String!, $byteId: String!) {
      removeByteFromTable(tableId: $tableId, byteId: $byteId)
    }`;

    const { data } = await this.props.client.mutate({mutation: q, variables: {
      tableId: this.state.data.table.id,
      byteId
    }});

    if (data && data.removeByteFromTable) {
      this.performQuery(this.props.currentUser.id);
    }
  }

  async removeUser(user: UserType) {
    if (user.id === this.state.data.table.owner.id) {
      alert('You can\'t remove yourself from your own table!');
      return;
    }
    if (typeof user.status !== 'undefined') {
      //  the user has a status
      let q: any;
      let uid: string;
      if (user.status) {
        // member
        q = gql`mutation removeUserFromTable($tableId: String!, $uid: String!) {
          removeUserFromTable(tableId: $tableId, userId: $uid)
        }`;
        uid = user.id;
      } else {
        // invitation
        q = gql`mutation uninviteUserToTable($tableId: String!, $uid: String!) {
          uninviteUserToTable(tableId: $tableId, email: $uid) { id }
        }`;
        uid = user.email;
      }

      await this.props.client.mutate({mutation: q, variables: {
        tableId: this.state.data.table.id,
        uid
      }});

      this.performQuery(this.props.currentUser.id);
    }
  }

  /**
   * Component render method, data is retrieved before this point in the event loop
   */
  render() {
      if (!this.props.currentUser || !this.state.data) {
        return <Loader text="Loading table..." />;
      } else {
        let data = this.state.data;
        // @ts-ignore
        let members = ([]).concat(this.state.members).concat(this.state.invitations);
        return (
          <div>
            <Popup open={this.state.addMembersPopup} data={{respond: this.addMembers, checked: members.map((m: any) => m.id)}} type="ADD_MEMBERS" close={this.toggleAddMembersPopup} />
            <Popup open={this.state.addBytesPopup} data={{respond: this.addBytes, checked: data.table.bytes.map((b: any) => b.id)}} type="ADD_BYTES" close={this.toggleAddBytesPopup} />
            <div className='table'>
              { this.state.nextByte && 
              <div className="grid-inner nextByte">
                <Link to={'/byte/' + this.state.nextByte.id}>
                  <div className="table-next-byte">
                    <div className={'table-next-byte-image '} style={{backgroundImage: this.state.nextByte.image ? 'url(' + this.state.nextByte.image + ')' : undefined}}>
                      <div className={'table-next-byte-name '}>{ this.state.nextByte.name }</div>
                    </div>
                  </div>
                </Link>
              </div>}
              <Banner title={'Table: ' + data.table.name} text={'Hosted by: ' + data.table.owner.firstname + ' ' + data.table.owner.lastname} />
              <div className="table-bar">
                <div className="grid-inner">
                  <div className="table-bar-section">
                  <div className={'table-bar-item '  + (this.state.mode ? 'active' : '')} onClick={() => this.toggleView(true)}><i className="far fa-file-code"></i>Bytes</div>
                  <div className={'table-bar-item '  + (!this.state.mode ? 'active' : '')} onClick={() => this.toggleView(false)}><i className="far fa-user-alt"></i>Guests</div>
                  </div>
                </div>
              </div>
              <div className="grid-inner">
                { this.state.mode && <div className="table-bytes">
                  <ByteGroup collection={true} admin={this.state.owned} bytes={data.table.bytes} deleteResponder={this.removeByte} completed={this.completed} adminClickHandler={() => this.toggleAddBytesPopup(true)}  />
                </div> }
                { !this.state.mode && <div className="table-users">
                  <UserGroup admin={this.state.owned} users={members} deleteResponder={this.removeUser} adminClickHandler={() => this.toggleAddMembersPopup(true)} />
                </div> }
              </div>
            </div>
          </div>
        );
    }
  }
}

/**
 * Map redux state to component props
 * @param state 
 */
const mapStateToProps = (state: any) => ({
  currentUser: state.currentUser
})

// ts ignore here because Typescript isn't playing nice with this syntax despite it being entirely valid
// @ts-ignore
export default withApollo(connect(mapStateToProps, null)(Table));