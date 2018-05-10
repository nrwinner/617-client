import * as React from 'react';
import { UserType } from '../../types';
import UserCard from './UserCard/UserCard';

import './UserGroup.scss';

const UserGroup =({users, admin, deleteResponder, adminClickHandler}: { users: Array<UserType>, admin?: boolean, deleteResponder?: Function, adminClickHandler?: Function }) => {
    return (
        <div className="user-group">
            { users.map((u: UserType) => <UserCard user={u} admin={admin} key={u.id} deleteResponder={deleteResponder} />) }
            { admin && <UserCard makeNew={true} adminClickHandler={adminClickHandler} /> }
        </div>
    )
}

export default UserGroup;