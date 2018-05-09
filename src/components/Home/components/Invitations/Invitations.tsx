import * as React from 'react';
import { Link } from 'react-router-dom';
import './Invitations.scss';
import { TableType } from '@/types';

const Invitations = ({ invitations, clickHandler }: { invitations: TableType[], clickHandler?: Function }) => {
    return (
        <div className="invitations-container">
            <div className="dash-card-badge">{ invitations.length }</div>
            { invitations && invitations.length > 0 && invitations.map((i: any, index: number) => {
                // FIXME: Should link to the table
                return (
                    <div className="invitation-element" key={index} onClick={() => clickHandler ? clickHandler(i) : undefined }>
                        <div className="invitation-table"> { i.name } </div>
                        <div className="invitation-host"> { i.owner.firstname + ' ' + i.owner.lastname } </div>
                        <div className="invitiation-link">
                            <i className="far fa-chevron-right"></i>
                        </div>
                    </div>
                );
            })}
            { (!invitations || !invitations.length) && <div className="none">You don't have any table invitations!</div> }
        </div>
    )
}

export default Invitations;