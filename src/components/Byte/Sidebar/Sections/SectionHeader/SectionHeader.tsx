
import * as React from 'react';

import './SectionHeader.scss';

type Props = {
    user: any;
    title: string;
    image?: string;
}

const SectionHeader = (props: Props) => {
    console.log('test', props);
    return (
        <div>
            <div className="section-header">
                <div className="byte-image" style={{backgroundImage: props.image ? 'url(' + props.image + ')' : undefined}}></div>
            </div>
            <div className="title">{ props.title }</div>
            <div className="owner">
                { props.user.name }
            </div>
        </div>
    );
}

export default SectionHeader;