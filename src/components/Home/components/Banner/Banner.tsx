import * as React from 'react';

import './Banner.scss';

const Banner = ({ title, text }: { title: string, text: string }) => {
    return (
    <div className="banner">
        <div className="grid-inner">
            <div className="banner-title">{ title }</div>
            <div className="banner-text">{ text }</div>
        </div>
    </div>
    );
};

export default Banner;