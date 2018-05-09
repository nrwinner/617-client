import * as React from 'react';
import { TableType } from '../../../types';
import './TableInvitation.scss';

const TableInvitation = ({ open, data }: { open: boolean, data: any }) => {
    return (
        <span>
            { open &&  
            <div className="table-invitation">
                <div className="popup-title">Table Invitation</div>
                <div className="table-invitation-icon" />
                <div className="invitation-text">
                    You've been invited to the <span>{ data.invitation.name }</span> table!
                </div>

                <div className="btn-group">
                    <div className="button bad" onClick={() => data.respond(false)}>Decline</div>
                    <div className="button" onClick={() => data.respond(true)}>Accept</div>
                </div>
            </div>
            }
        </span>
    );
}

export default TableInvitation;