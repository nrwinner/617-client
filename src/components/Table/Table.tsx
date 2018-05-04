
import * as React from 'react';
import MealsContainer from './containers/Meals';
import InvitationsContainer from './containers/Invitations';
import { MembersContainer } from './containers/Members';
import TableHero from './containers/Hero';

import Popup from '../Popup/Popup'

import './Table.scss';

type Props = {

}

type State = {
  addMembersPopup: boolean
}

export default class Table extends React.Component<Props> {
  data: any;
  state: State

  constructor(props: Props) {
    super(props);
    this.data = {
      "table": {
        "owner": {
          "name": "John Doe"
        },
        "meals": [
          {
            "name": "Git Background",
            "byteIds": [
              "1",
              "2"
            ],
            "dueDate": "2018-05-05T10:00"
          }, {
            "name": "Got Background",
            "byteIds": [
              "1",
              "2"
            ],
            "dueDate": "2018-09-05T10:00"
          }
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
            "name": "Jane Doe",
            "mealsCompleted": [
              {
                "mealId": "0",
                "dateCompleted": "2018-03-25T14:00"
              }
            ]
          }
        ]
      }
    }

    this.state = {
      addMembersPopup: false
    }

    this.toggleAddMembersPopup = this.toggleAddMembersPopup.bind(this);
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

  render() {
    return (
      <div>
        <Popup open={this.state.addMembersPopup} data={{respond: this.resetMembers, checked: this.data.table.members.map((m: any) => {return {id: m.id, name: m.name}})}} type="ADD_MEMBERS" close={this.toggleAddMembersPopup} />
        <div className='table'>
          <TableHero owner={this.data.table.owner.name} />
          <div className="contents">
            <section className="viewport">
              <MealsContainer meals={this.data.table.meals} />
              <InvitationsContainer invitations={this.data.table.invitations} />
              <div className="add-members" onClick={this.toggleAddMembersPopup}>Bruhh</div>
              <MembersContainer members={this.data.table.members} />
            </section>
          </div>
        </div>
      </div>
    );
  }
}
