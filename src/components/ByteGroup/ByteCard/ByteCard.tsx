import * as React from 'react';
import { ByteType } from '../../../types';
import { Link } from 'react-router-dom';
import './ByteCard.scss';

const ByteCard = (
    { byte, completed, admin, makeNew, deleteResponder, adminClickHandler, clickHandler, selected}:
    { byte?: ByteType, completed?: boolean, admin?: boolean, makeNew?: boolean, deleteResponder?: Function, adminClickHandler?: Function, clickHandler?: Function, selected?: boolean }
) => {
    if (!makeNew && byte) {
        return (
            <div className={'byte-card ' + (completed ? 'completed ' : '') +  (admin ? 'admin ' : '') + (selected ? 'selected ' : '')} onClick={() => clickHandler ? clickHandler(byte.id) : undefined}>
                <div className="byte-card-image" style={{backgroundImage: byte.image ? 'url(' + byte.image + ')' : ''}}></div>
                <div className="byte-card-name">{ truncate(byte.name, 49) }</div>
                <div className="byte-card-creator">{ byte.creator.firstname + ' ' + byte.creator.lastname }</div>
                { completed && <div className="byte-completed">
                    <i className="far fa-check"></i>
                    Completed!
                </div> }
                { admin && <div className="byte-admin-popover">
                    <div className="byte-admin-popover-options">
                        <Link to={'/byte/' + byte.id}> <div className="byte-nav" /></Link>
                        <div className="byte-remove" onClick={() => deleteResponder ? deleteResponder(byte.id) : undefined}/>
                    </div>
                    <div className="byte-admin-popover-title">Admin Options</div>
                </div> }
            </div>
        )
    } else if (makeNew) {
        return (
            <div className="byte-card new" onClick={() => adminClickHandler ? adminClickHandler() : undefined}></div>
        )
    } else {
        return <span />;
    }
}

export default ByteCard;

function truncate(text: string, count: number): string {
    return text.length > count ? text.substring(0, count) + '...' : text;
}