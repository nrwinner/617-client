import * as React from 'react';
import Video from '../VideoComponent/Video';
import Quiz from '../Quiz/Quiz';

import './Content.scss';

import { ByteType, VideoType, SectionType, QuestionType } from '../../../types';

// Redux
import { connect } from 'react-redux';
import SectionItem from '../Sidebar/Sections/SectionItem/SectionItem';

type Props = {
    activeSection: string;
    byte: ByteType;
}

class Content extends React.Component<Props> {
    // container component
    section: SectionType; // active section
    video: VideoType;

    constructor(p: Props) {
        super(p);
        this.initContent(this.props.activeSection);
    }

    componentWillReceiveProps(nextProps: any) {
        this.initContent(nextProps.activeSection);
    }


    render() {
        return (
            <div className='content'>
                <Video source={this.video} />
                    <Quiz section={this.section.id} /> 
            </div>
        );
    }

    initContent(sectionID: string) {
        this.video = {
            url: this.props.byte.materials.youtubeVideo,
            start: ''
        };
        // Is there a simple way to do this? ?
        const s = this.props.byte.sections.get(sectionID);
        if (this.isSection(s)) {
            this.section = s;
        }
        
        this.video.start = this.section.videoIn;
        this.video.stop = this.section.videoOut;
    }

    isSection(section: SectionType | undefined): section is SectionType {
        return (section as SectionType).id !== undefined;
    }
}

const mapStateToProps = (state: any) => ({
    byte: state.consumingByte,
    activeSection: state.consumingByte.activeSection,
});

export default connect(mapStateToProps, {})(Content);