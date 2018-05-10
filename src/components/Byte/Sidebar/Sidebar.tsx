import * as React from 'react';
import Sections from './Sections/Sections';

import './Sidebar.scss';

// Types
import { SectionType, SectionItemType, UserType } from '../../../types';

// Redux
import { byteChangeSection } from '../../../redux-actions';
import { connect } from 'react-redux';
import history from '../../../history';

type Props = {
    sections: Map<string, SectionType>;
    creator: UserType;
    name: string;
    changeSection: any;
    image: string;
}

class Sidebar extends React.Component<Props> {

    render() {
        return (
            <div className='sidebar'>
                <div className="sidebar-back" onClick={() => history.goBack()}>Back</div>
               <Sections sections={this.props.sections} user={this.props.creator} title={this.props.name} changeSection={this.props.changeSection} image={this.props.image} />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    sections: state.consumingByte.sections,
    creator: state.consumingByte.creator,
    name: state.consumingByte.name,
    image: state.consumingByte.image
});

const mapDispatchToProps = (dispatch: any) => ({
    changeSection: (id: string) => dispatch(byteChangeSection(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);