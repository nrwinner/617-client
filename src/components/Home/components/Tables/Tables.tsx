import * as React from 'react';
import './Tables.scss';
import { TableType } from '../../../../types';
// @ts-ignore
import { Link } from 'react-router-dom';

const Tables = ({ tables, uid }: { tables: TableType[], uid: string }) => {
    let showOwn = tables.map((t: TableType) => t.owner.id).includes(uid);
    return (
        <div className={'tables-container ' + (showOwn ? 'showOwn ' : '')}>
            { tables && tables.length && tables.map((i: any, index: number) => {
                    // FIXME: Should link to the table
                    return (
                        <Link to={'/table/' + i.id}>
                            <div className={'table-element ' + (i.owner.id === uid ? 'own ' : '')} key={index}>
                                <div className="table-name"> { i.name } </div>
                                <div className="table-owner"> { i.owner.firstname + ' ' + i.owner.lastname } </div>
                                <div className="table-link">
                                    <i className="far fa-chevron-right"></i>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            { (!tables || !tables.length) && <div className="none">You don't have any tables here!</div> }
        </div>
    )
}

export default Tables;