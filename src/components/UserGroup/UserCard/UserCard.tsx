import * as React from 'react';
import { UserType } from '../../../types';
import './UserCard.scss';

const UserCard = ({ user, admin, selected, makeNew, clickHandler, adminClickHandler, deleteResponder }: { user?: UserType, admin?: boolean, selected?: boolean, makeNew?: boolean, clickHandler?: Function, adminClickHandler?: Function, deleteResponder?: Function }) => {
    if (!makeNew && user) {
        return (
            <div className={'user-card ' + (selected ? 'selected ' : '') + (admin ? 'admin ' : '')} onClick={() => clickHandler ? clickHandler({id: user.id, email: user.email}) : undefined}>
                { typeof user.status === 'boolean' && 
                    <div className={'user-card-status ' + (user.status ? 'accepted ' : 'pending ')} />
                }
                { admin && typeof deleteResponder !== 'undefined' && 
                    <div className="user-card-delete" onClick={() => deleteResponder(user)}> <i className="far fa-times" /> </div>
                }
                <div className="user-card-image" />
                <div>
                    <div className="user-card-name">{ user.firstname + ' ' + user.lastname }</div>
                    <div className="user-card-email">{ user.email }</div>
                </div>
            </div>
        )
    } else if (makeNew) {
        return <div className="user-card new" onClick={() => adminClickHandler ? adminClickHandler() : undefined} />
    } else {
        return <span />
    }
}

export default UserCard;