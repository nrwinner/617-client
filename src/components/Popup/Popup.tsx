import * as React from 'react';
import './Popup.scss';

import AddMembers from './AddMembers/AddMembers'

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
    'ADD_MEMBER'
]

class Popup extends React.Component<Props> {
    state: State
    component: JSX.Element;

    constructor(props: Props) {
        super(props);

        this.state = {
            open: props.open || false
        }

        this.toggle = this.toggle.bind(this);
        this.initComponent = this.initComponent.bind(this);

        this.initComponent();
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.open) {
            this.setState({
                open: true
            })

            this.initComponent();
        }
    }

    toggle() {
        let c = this.state.open;
        this.setState({
            open: !c
        })

        this.props.close();
    }

    initComponent() {
        switch(this.props.type) {
            case 'ADD_MEMBERS':
                this.component = <AddMembers data={{respond: this.props.data.respond, checked: this.props.data.checked}} />;
                break;
            default:
                this.component = <div>Popup component not found!</div>
                break;
        }
    }

    render() {
        return (
            this.state.open ? 
                <div className="popup-wrapper" onClick={this.toggle}>
                    <div className="popup-inner" onClick={(e) => {e.stopPropagation()}}>
                        <div className="close" onClick={this.toggle}><i className="far fa-times"></i></div>
                        { this.component }
                    </div> 
                </div>
            : null
        )
    }
}

export default Popup;