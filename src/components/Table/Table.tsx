
import * as React from 'react';
import MealsContainer from './containers/Meals';
import InvitationsContainer from './containers/Invitations';
import { MembersContainer } from './containers/Members';
import TableHero from './containers/Hero';

import './Table.scss';

export default class Table extends React.Component<{}> {
  data: any;

  constructor() {
    super({});
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
  }

  render() {
    return (
      <div className='table'>
        <TableHero owner={this.data.table.owner.name} />
        <div className="contents">
          <section className="viewport">
            <MealsContainer meals={this.data.table.meals} />
            <InvitationsContainer invitations={this.data.table.invitations} />
            <MembersContainer members={this.data.table.members} />
          </section>
        </div>
      </div>
    );
  }
}
