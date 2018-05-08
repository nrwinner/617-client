import * as React from 'react';
import { ByteType } from '@/types';
import ByteCard from './ByteCard/ByteCard';
import { Link } from 'react-router-dom';
import './ByteGroup.scss';

const ByteGroup = ({ bytes, completed, admin, collection, deleteResponder }: { bytes: Array<ByteType>, completed?: Array<string>, admin?: boolean, collection?: boolean, deleteResponder?: Function }) => {
    return (
        <div className="byte-group">
            { bytes.map((b: ByteType, i: number) =>  {
                let el = <ByteCard admin={admin} byte={b} completed={completed && completed.includes(b.id)} deleteResponder={deleteResponder} />
                return (
                    // don't link to the byte if user is an admin so that we can show the popover
                    !admin ? <Link key={i.toString()} to={'/byte/' + b.id} children={el} /> : el
                )
            }) }
            { admin && <ByteCard makeNew={true} /> }
        </div>
    )
}

export default ByteGroup;