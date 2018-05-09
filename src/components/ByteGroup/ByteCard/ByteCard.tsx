import * as React from 'react';
import { ByteType } from '../../../types';
import { Link } from 'react-router-dom';
import './ByteCard.scss';

const ByteCard = ({ byte, completed, admin, makeNew, deleteResponder }: { byte?: ByteType, completed?: boolean, admin?: boolean, makeNew?: boolean, deleteResponder?: Function }) => {
    if (!makeNew && byte) {
        return (
            <div className={'byte-card ' + (completed ? 'completed ' : '') +  (admin ? 'admin ' : '')}>
                <div className="byte-card-image" style={{backgroundImage: byte.image ? 'url(' + byte.image + ')' : ''}}></div>
                <div className="byte-card-name">{ truncate(byte.name, 49) }</div>
                <div className="byte-card-creator">{ byte.creator.firstname + ' ' + byte.creator.lastname }</div>
                { completed && <div className="byte-completed">
                    <i className="far fa-check"></i>
                    Completed!
                </div> }
                { admin && <div className="byte-admin-popover">
                    <Link to={'/byte/' + byte.id}> <div className="byte-nav" /></Link>
                    <div className="byte-remove" />
                </div> }
            </div>
        )
    } else if (makeNew) {
        return (
            <div className="byte-card new"></div>
        )
    } else {
        return <span />;
    }
}

export default ByteCard;

function truncate(text: string, count: number): string {
    return text.length > count ? text.substring(0, count) + '...' : text;
}