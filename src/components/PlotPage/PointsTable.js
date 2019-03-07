import React, {Component} from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import './css/PointsTable.css'

class PointsTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.pointsRepository.getCarsSmall().then(data => this.setState({cars: data}));
    }

    render() {
        let cols = [
            {field: 'x', header: 'X'},
            {field: 'y', header: 'Y'},
            {field: 'r', header: 'R'},
            {field: 'verdict', header: 'Result'}
        ];

        let dynamicColumns = cols.map((col, i) => {
                return <Column key={col.field} field={col.field} header={col.header}/>;
            }
        );

        return (
            <DataTable value={this.props.getVerdicts()}>
                {dynamicColumns}
            </DataTable>
        );
    }
}

export default PointsTable;