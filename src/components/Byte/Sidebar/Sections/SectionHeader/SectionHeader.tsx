
import * as React from 'react';

import './SectionHeader.scss';
import { UserType } from '../../../../../types';

type Props = {
    user: UserType;
    title: string;
    image?: string;
}

const SectionHeader = (props: Props) => {
    return (
        <div>
            <div className="section-header">
                <div className="byte-image" style={{backgroundImage: props.image ? 'url(' + props.image + ')' : undefined}}></div>
            </div>
            <div className="title">{ props.title }</div>
            <div className="owner">
                { props.user.firstname + ' ' + props.user.lastname }
            </div>
        </div>
    );
}

export default SectionHeader;