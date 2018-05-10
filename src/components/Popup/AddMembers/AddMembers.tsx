import * as React from 'react';
import { Loader } from '../../Loader/Loader';
import { ByteType, UserType } from '@/types';
import { withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import './AddMembers.scss';

import UserCard from '../../UserGroup/UserCard/UserCard';

type Props = {
    data: {respond: Function, checked: string[]}
    open?: boolean;
    client?: ApolloClient<any>;
}

type State = {
    open?: boolean;
    data?: any;
    selected: string[];
}

class AddMembers extends React.Component<Props> {
    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            selected:  [] 
        };

        this.performQuery = this.performQuery.bind(this);
        this.select = this.select.bind(this);
        this.performQuery();
    }


   async performQuery() {
        let q = gql`query {
            users {
                id, firstname, lastname, email
            }
        }`
        
        // typescript not knowing how to work again
        // @ts-ignore
        const { data } =  await this.props.client.query({query: q})

        this.setState({
            data
        })
    }

    select({ email }: {email: string, [propName: string]: any}) {
        if (typeof email !== 'undefined') {
            if (this.state.selected.includes(email)) {
                let selected = this.state.selected;
                selected.splice(selected.indexOf(email), 1);

                this.setState((state: State) => ({
                    selected
                }));
            } else {
                this.setState((state: State) => ({
                    selected: state.selected.concat(email)
                }));
            }
        }
    }

    render() {
        if (!this.state || !this.state.data) {
            return ( <Loader text={'Loading users...'} /> );
        } else {
            if (this.state.data.users.length) {
                console.log(this.props.data.checked);
                let unused = this.state.data.users.filter((u: UserType) => !this.props.data.checked.includes(u.id));
                console.log(unused);
                
                if (unused.length) {
                    return (
                        <div className="add-users">
                            <div className="popup-title">Add Users</div>
                            <div className="add-users-results">
                                { unused.map((u: UserType) => {
                                    console.log(this.state.selected.includes(u.email));
                                    return (
                                        <UserCard selected={this.state.selected.includes(u.email)} user={u} clickHandler={this.select} key={u.id} />   
                                    )
                                }) }
                            </div>
                            <div className="btn-group">
                                <div className="button" onClick={() => this.props.data.respond(this.state.selected)}>Add Users</div>
                            </div>
                        </div>
                    )
                }
            }

            return (
                <div className="add-bytes">
                    <div className="popup-title">Add Bytes</div>
                    <div className="none">No more users to add!</div>
                </div>
            )
        }
    }
}

// @ts-ignore
export default withApollo(AddMembers)