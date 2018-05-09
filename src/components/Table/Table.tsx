
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
import { Loader } from '../../components//Loader/Loader';

type Props = {
  currentUser: UserType;
  [propsName: string]: any;
}

type State = {
  addMembersPopup: boolean;
  nextByte?: ByteType;
  mode: boolean; // true is bytes, false is guests
  tableID: string;
}

    // FIXME: This component should display differently if the loggedin user is the host

class Table extends React.Component<Props> {
  query: any;
  completed: Array<string>;
  state: State

  constructor(props: Props) {
    super(props);

    this.query = gql`query table($id: String!) {
      table(id: $id) {
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
      }    
    }`;

    //  let b = this.getNextByte(this.data.table.bytes, this.completed);
    let id: string = props.match.params.id;

    this.state = {
      addMembersPopup: false,
      // nextByte: b,
      mode: true,
      tableID: id
    }

    this.toggleAddMembersPopup = this.toggleAddMembersPopup.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  /**
   * Takes an array of ByteTypes and a list of completed ID's, returns the first non-completed Byte or undefined
   * @param bytes 
   * @param completed 
   */
  getNextByte(bytes: Array<ByteType>, completed: Array<string>): ByteType {
    return bytes.filter(b => !completed.includes(b.id))[0] || undefined;
  }

  toggleAddMembersPopup() {
    let c = this.state.addMembersPopup;
    this.setState({
      addMembersPopup: !c
    })
  }

  resetMembers(m: Array<any>) {
    // TODO query here
    alert('test');
  }

  toggleView(val: boolean = true) {
    this.setState({
      mode: val
    });
  }

  render() {
    return (
      <Query query={this.query} variables={{id: this.state.tableID}} >
        {({ loading, error, data }) => {
          if (loading) return <Loader text="Loading table..." />;
          if (error) return <p>Error :( {error}</p>;

          console.log(data.table);

          return (
            <div>
              <Popup open={this.state.addMembersPopup} data={{respond: this.resetMembers, checked: data.table.members.map((m: any) => {return {id: m.id, name: m.name}})}} type="ADD_MEMBERS" close={this.toggleAddMembersPopup} />
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
                    <ByteGroup  collection={true} admin={false} bytes={data.table.bytes} completed={this.completed} />
                  </div> }
                  { !this.state.mode && <div className="table-users">
                    <UserGroup users={data.table.members} />
                  </div> }
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps, null)(Table);