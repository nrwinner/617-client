import * as React from 'react';
import { UserType } from '@/types';
import UserCard from './UserCard/UserCard';

import './UserGroup.scss';

const UserGroup =({users}: { users: Array<UserType> }) => {
    return (
        <div className="user-group">
            { users.map((u: UserType) => <UserCard user={u} />) }
        </div>
    )
}

export default UserGroup;