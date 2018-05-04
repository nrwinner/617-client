import * as React from 'react';
import { Loader } from '../../Loader/Loader';

import { UserType } from '@/types';

import './AddMembers.scss';

// Apollo
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


type Data = {
    respond: Function;
    checked?: Array<UserType>;
}

type Props = {
    data: Data
}

type State = {
    checked: Array<UserType>;
}

class AddMembers extends React.Component<Props> {
    state: State;
    query: string;

    constructor(props: Props) {
        super(props);

        this.state = {
            checked: props.data.checked ? props.data.checked : []
        }

        this.query = `query {
            users {
                id,
                name
            }
        }`;
    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            checked: nextProps.checked ? nextProps.checked : []
        });
    }

    selectUser(user: UserType) {
        let ids = this.state.checked ? this.state.checked.map(m => m.id) : [];
        let c = this.state.checked || [];

        console.log(ids, c, user)

        if (!ids.includes(user.id)) {
            c.push(user)
        } else {
            c = c.filter(m => m.id !== user.id)
        }

        this.setState({
            checked: c
        })
    }

    render() {
        return (<Query query={gql`${this.query}`}>
            {({ loading, error, data }) => {
                if (loading) return <Loader text="Loading users..." />;
                if (error) return <p>Error :( {error}</p>;

                return (
                <div className="add-members">
                    <div className="popup-title">Users</div>
                    <input type="text" name="users_search" placeholder="Filter users..."/>
                    <div className="users">
                        {data.users.map((m: UserType) => (
                            <div className={'user ' + (this.state.checked.filter(c => c.id === m.id).length ? 'checked' : '')} onClick={() => this.selectUser(m)}>
                                <span>{m.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="btn-group">
                        <div className="button" onClick={() => this.props.data.respond(this.state.checked)}>Add Users!</div>
                    </div>
                </div>
                );
            }}
        </Query>);
    }
}

export default AddMembers;