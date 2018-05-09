import * as React from 'react';
import { UserType } from 'types';

class UserInjector<T> extends React.Component<{user?: UserType, [propsName: string]: any}> {

}

export default UserInjector;