import * as React from 'react';
import Sections from './Sections/Sections';

import './Sidebar.scss';

// Types
import { SectionType, SectionItemType } from '@/types';

// Redux
import { byteChangeSection } from '@/redux-actions';
import { connect } from 'react-redux';

type Props = {
    sections: Map<string, SectionType>;
    creator: string;
    name: string;
    changeSection: any;
}

class Sidebar extends React.Component<Props> {

    componentWillReceiveProps(nextProps: any) {
        console.log('NEXT PROPS IN SIDEBAR', nextProps);
    }

    render() {
        return (
            <div className='sidebar'>
               <Sections sections={this.props.sections} user={this.props.creator} title={this.props.name} changeSection={this.props.changeSection} />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    sections: state.consumingByte.sections,
    creator: state.consumingByte.creator,
    name: state.consumingByte.name
});

const mapDispatchToProps = (dispatch: any) => ({
    changeSection: (id: string) => dispatch(byteChangeSection(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);