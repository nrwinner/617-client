import * as React from 'react';
import { UserType } from '../../../types';
import './UserCard.scss';

const UserCard = ({ user }: { user: UserType }) => {
    return (
        <div className="user-card">
            <div className="user-card-image"></div>
            <div>
                <div className="user-card-name">{ user.firstname + ' ' + user.lastname }</div>
                <div className="user-card-email">{ user.email }</div>
            </div>
        </div>
    )
}

export default UserCard;