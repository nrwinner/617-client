import * as React from 'react';
import { Link } from 'react-router-dom';
import './Invitations.scss';

const Invitations = ({ invitations }: { invitations: Array<any> }) => {
    return (
        <div className="invitations-container">
            <div className="dash-card-badge">{ invitations.length }</div>
            { invitations.map((i: any, index: number) => {
                // FIXME: Should link to the table
                return (
                    <div className="invitation-element" key={index}>
                        <div className="invitation-table"> { i.name } </div>
                        <div className="invitation-host"> { i.host } </div>
                        <div className="invitiation-link">
                            <i className="far fa-chevron-right"></i>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Invitations;