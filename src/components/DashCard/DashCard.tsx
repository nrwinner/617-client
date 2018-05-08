import * as React from 'react';

import './DashCard.scss';

const DashCard = (props: any) => {
    return (
        <div className="dash-card">
            <div className="dash-card-title">
                { props.title }
            </div>
            <div className="dash-card-content">
                { props.children }
            </div>
        </div>
    )
}

export default DashCard;