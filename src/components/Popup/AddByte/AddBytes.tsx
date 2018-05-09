import * as React from 'react';
import { Loader } from '@/components/Loader/Loader';
import { ByteType } from '@/types';
import { withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import './AddBytes.scss';

import ByteCard from '@/components/ByteGroup/ByteCard/Bytecard';

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

class AddBytes extends React.Component<Props> {
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
            bytes {
                id, name, description, image, creator {
                    id, firstname, lastname
                }
            }
        }`
        
        // typescript not knowing how to work again
        // @ts-ignore
        const { data } =  await this.props.client.query({query: q})

        this.setState({
            data
        })
    }

    select(id: string) {
        if (typeof id !== 'undefined') {
            if (this.state.selected.includes(id)) {
                let selected = this.state.selected;
                selected.splice(selected.indexOf(id), 1);

                this.setState((state: State) => ({
                    selected
                }));
            } else {
                this.setState((state: State) => ({
                    selected: state.selected.concat(id)
                }));
            }
        }
    }

    render() {
        if (!this.state || !this.state.data) {
            return ( <Loader text={'Loading bytes...'} /> );
        } else {
            if (this.state.data.bytes.length) {
                let unused = this.state.data.bytes.filter((b: ByteType) => !this.props.data.checked.map((x: any) => x.id).includes(b.id));
                return (
                    <div className="add-bytes">
                        <div className="popup-title">Add Bytes</div>
                        <div className="add-bytes-results">
                            { unused.map((b: ByteType) => {
                                return (
                                    <ByteCard selected={this.state.selected.includes(b.id)} byte={b} clickHandler={this.select} />   
                                )
                            }) }
                        </div>
                        <div className="btn-group">
                            <div className="button" onClick={() => this.props.data.respond(this.state.selected)}>Add Bytes</div>
                        </div>
                    </div>
                )
            }

            return (
                <div className="add-bytes">
                    <div className="popup-title">Add Bytes</div>
                    <div className="none">No more bytes to add!</div>
                </div>
            )
        }
    }
}

// @ts-ignore
export default withApollo(AddBytes)