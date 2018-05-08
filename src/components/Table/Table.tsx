
import * as React from 'react';
import Banner from '../Home/components/Banner/Banner';
import Popup from '../Popup/Popup'
import ByteGroup from '../ByteGroup/ByteGroup';
import './Table.scss';
import { connect } from 'react-redux';
import { UserType, ByteType } from '@/types';
import { Link } from 'react-router-dom';
import UserGroup from '../UserGroup/UserGroup';

type Props = {
  currentUser: UserType;
}

type State = {
  addMembersPopup: boolean;
  nextByte?: ByteType;
  mode: boolean; // true is bytes, false is guests
}

    // FIXME: This component should display differently if the loggedin user is the host

class Table extends React.Component<Props> {
  data: any;
  completed: Array<string>;
  state: State

  constructor(props: Props) {
    super(props);

    this.completed = ['5ae37ed5f6ef140a75f137a6'];

    this.data = {
      "table": {
        "name": "Advanced Web Development",
        "owner": {
          "name": "Jal Irani"
        },
        "bytes": [
          {
            "id": "5ae37ed5f6ef140a75f137a6",
            "name": "Github Basics",
            "image": "https://udemy-images.udemy.com/course/240x135/602084_c221.jpg",
            "description": "Learn version control with git and GitHub.",
            "creator": {
              "firstname": "Sean",
              "lastname": "Donnelly"
            }
          }, {
            "id": "5aef430c7e654209f1815bbf",
            "name": "Looping in Java",
            "image": "https://udemy-images.udemy.com/course/240x135/821312_7b15_4.jpg",
            "description": "Review the three types of loops in Java",
            "creator": {
              "firstname": "Nick",
              "lastname": "Winner"
            }
          },
          {
            "id": "5ae37ed5f6ef140a75f137a6",
            "name": "Github Basics",
            "image": "https://udemy-images.udemy.com/course/240x135/602084_c221.jpg",
            "description": "Learn version control with git and GitHub.",
            "creator": {
              "firstname": "Sean",
              "lastname": "Donnelly"
            }
          }, {
            "id": "5aef430c7e654209f1815bbf",
            "name": "Looping in Java",
            "image": "https://udemy-images.udemy.com/course/240x135/821312_7b15_4.jpg",
            "description": "Review the three types of loops in Java",
            "creator": {
              "firstname": "Nick",
              "lastname": "Winner"
            }
          },
          {
            "id": "5ae37ed5f6ef140a75f137a6",
            "name": "Github Basics",
            "image": "https://udemy-images.udemy.com/course/240x135/602084_c221.jpg",
            "description": "Learn version control with git and GitHub.",
            "creator": {
              "firstname": "Sean",
              "lastname": "Donnelly"
            }
          }, {
            "id": "5aef430c7e654209f1815bbf",
            "name": "Looping in Java",
            "image": "https://udemy-images.udemy.com/course/240x135/821312_7b15_4.jpg",
            "description": "Review the three types of loops in Java",
            "creator": {
              "firstname": "Nick",
              "lastname": "Winner"
            }
          },
          {
            "id": "5ae37ed5f6ef140a75f137a6",
            "name": "Github Basics",
            "image": "https://udemy-images.udemy.com/course/240x135/602084_c221.jpg",
            "description": "Learn version control with git and GitHub.",
            "creator": {
              "firstname": "Sean",
              "lastname": "Donnelly"
            }
          }, {
            "id": "5aef430c7e654209f1815bbf",
            "name": "Looping in Java",
            "image": "https://udemy-images.udemy.com/course/240x135/821312_7b15_4.jpg",
            "description": "Review the three types of loops in Java",
            "creator": {
              "firstname": "Nick",
              "lastname": "Winner"
            }
          },
        ],
        "invitations": [
          {
            "name": "Sean Donnelly",
            "dateSent": "2018-03-05"
          }
        ],
        "members": [
          {
            "id": "2",
            "firstname": "Jane",
            "lastname": "Doe",
            "email": "test@test.com",
            "bytesCompleted": [
              {
                "id": "5ae37ed5f6ef140a75f137a6",
                "dateCompleted": "2018-03-25T14:00"
              }
            ]
          },
          {
            "id": "2",
            "firstname": "Jane",
            "lastname": "Doe",
            "email": "test@test.com",
            "bytesCompleted": [
              {
                "id": "5ae37ed5f6ef140a75f137a6",
                "dateCompleted": "2018-03-25T14:00"
              }
            ]
          },
          {
            "id": "2",
            "firstname": "Jane",
            "lastname": "Doe",
            "email": "test@test.com",
            "bytesCompleted": [
              {
                "id": "5ae37ed5f6ef140a75f137a6",
                "dateCompleted": "2018-03-25T14:00"
              }
            ]
          },
          {
            "id": "2",
            "firstname": "Jane",
            "lastname": "Doe",
            "email": "test@test.com",
            "bytesCompleted": [
              {
                "id": "5ae37ed5f6ef140a75f137a6",
                "dateCompleted": "2018-03-25T14:00"
              }
            ]
          },
          {
            "id": "2",
            "firstname": "Jane",
            "lastname": "Doe",
            "email": "test@test.com",
            "bytesCompleted": [
              {
                "id": "5ae37ed5f6ef140a75f137a6",
                "dateCompleted": "2018-03-25T14:00"
              }
            ]
          },
          {
            "id": "2",
            "firstname": "Jane",
            "lastname": "Doe",
            "email": "test@test.com",
            "bytesCompleted": [
              {
                "id": "5ae37ed5f6ef140a75f137a6",
                "dateCompleted": "2018-03-25T14:00"
              }
            ]
          },
        ],
        
      }
    }

    let b = this.getNextByte(this.data.table.bytes, this.completed);

    this.state = {
      addMembersPopup: false,
      nextByte: b,
      mode: true
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
    console.log(this.data);
    this.data['table']['members'] = m
  }

  toggleView(val: boolean = true) {
    this.setState({
      mode: val
    });
  }

  render() {
    return (
      <div>
        <Popup open={this.state.addMembersPopup} data={{respond: this.resetMembers, checked: this.data.table.members.map((m: any) => {return {id: m.id, name: m.name}})}} type="ADD_MEMBERS" close={this.toggleAddMembersPopup} />
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
          <Banner title={'Table: ' + this.data.table.name} text={'Hosted by: ' + this.data.table.owner.name} />
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
              <ByteGroup  collection={true} admin={false} bytes={this.data.table.bytes} completed={this.completed} />
            </div> }
            { !this.state.mode && <div className="table-users">
              <UserGroup users={this.data.table.members} />
            </div> }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps, null)(Table);