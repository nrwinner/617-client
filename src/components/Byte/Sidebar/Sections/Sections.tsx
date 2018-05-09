
import * as React from 'react';
import SectionItem from './SectionItem/SectionItem'
import SectionHeader from './SectionHeader/SectionHeader';

// Types
import { SectionType, SectionItemType, UserType } from '@/types';

// Redux
import { connect } from 'react-redux';
import { byteChangeSection } from '@/redux-actions';

type Props = {
    sections: Map<string, SectionType>;
    user: UserType;
    title: string;
    active: string;
    changeSection: Function;
    image: string;
}
class Sections extends React.Component<Props> {
    // container
    lastCompleted: number;
    
    constructor(props: Props) {
        super(props);
        this.lastCompleted = -1;
    }

    render() {
        return (
            <div className='sections'>
                <SectionHeader user={this.props.user} title={this.props.title} image={this.props.image} />
                {
                    Array.from(this.props.sections, ([key, value]) => value).map((v, i) => {
                        let available = v.complete ? true : false;

                        if (v.complete) {
                            this.lastCompleted = i;
                        } else if (i - this.lastCompleted === 1) {
                            available = true;
                        }

                        console.log()

                        return <SectionItem data={v} key={i.toString()} available={available} active={this.props.active === v.id} changeSection={this.props.changeSection} />
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    active: state.consumingByte.activeSection,
})

export default connect(mapStateToProps, {})(Sections);