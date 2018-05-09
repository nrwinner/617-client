import * as React from 'react';
import './SectionItem.scss';

import { SectionItemType } from '../../../../../types';

type Props = {
    data: SectionItemType;
    active: boolean;
    available: boolean;
    changeSection: Function;
}

const SectionItem = (props: Props) => {
    return (
        <div className={'section-item' + (props.data.complete ? ' complete ' : '') + (props.active ? ' active ' : '') + (props.available ? '' : ' disabled')} onClick={() => (props.available) ? props.changeSection(props.data.id) : alert('This section is locked!')}>
            {props.data.name}
        </div>
    );
}

export default SectionItem;