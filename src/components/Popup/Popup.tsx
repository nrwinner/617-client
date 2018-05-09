import * as React from 'react';
import './Popup.scss';

import AddMembers from './AddMembers/AddMembers'
import TableInvitation from './TableInvitation/TableInvitation';

type Props = {
    type: string;
    open: boolean;
    data: any;
    close: Function;
}

type State = {
    open: boolean;
}

const types = [
    'ADD_MEMBER', 'TABLE_INVITATION'
]

class Popup extends React.Component<Props> {
    state: State

    constructor(props: Props) {
        super(props);

        this.state = {
            open: props.open || false
        }

        this.toggle = this.toggle.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {
        console.log('NEXT POPUP PROPS', nextProps);
        if (typeof nextProps.open !== 'undefined') {
            this.setState({
                open: nextProps.open
            });
        }
    }

    toggle() {
        let c = this.state.open;
        this.setState({
            open: !c
        })

        this.props.close();
    }

    render() {
        return (
            this.state.open ? 
                <div className="popup-wrapper" onClick={this.toggle}>
                    <div className="popup-inner" onClick={(e) => {e.stopPropagation()}}>
                        <div className="close" onClick={this.toggle}><i className="far fa-times"></i></div>
                        {this.props.type === 'TABLE_INVITATION' && 
                            <TableInvitation open={this.state.open} data={{invitation: this.props.data.invitation, respond: this.props.data.respond}} />
                        }

                        {this.props.type === 'ADD_MEMBERS' && 
                            <AddMembers data={{respond: this.props.data.respond, checked: this.props.data.checked}} />
                        }
                    </div> 
                </div>
            : null
        )
    }
}

export default Popup;