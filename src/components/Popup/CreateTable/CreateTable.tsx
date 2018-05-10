import * as React from 'react';
import './CreateTable.scss';

type State = {
    tableName: string;
}

class CreateTable extends React.Component<{ data: {respond: Function}}> {
    state: State;

    constructor(props: any) {
        super(props);

        this.state = {
            tableName: 'My Awesome Table Name'
        }
    }

    updateTableName(tableName: string) {
        this.setState({
            tableName
        });
    }
    
    render() {
        return (
            <div className="create-table">
                <div className="popup-title"> Create a Table </div>
                <input type="text" placeholder="Table name" value={this.state.tableName} onChange={(e) => this.updateTableName(e.target.value)} />
                <div className="btn-group">
                    <div className={'button ' + (!this.state.tableName.length ? 'disabled ' : '') } onClick={() => this.state.tableName.length  ? this.props.data.respond(this.state.tableName) : alert('Your table name can\'t be empty!')}>Create Table</div>
                </div>        
            </div>
        );
    }
};

export default CreateTable;