import React, {Component} from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import './css/PointsTable.css'

class PointsTable extends Component {
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

        let verdicts = this.props.getVerdicts().map(verdict => {
            console.log(verdict);
            return {
                'x': verdict.x.toPrecision(2),
                'y': verdict.y.toPrecision(2),
                'r': verdict.r.toPrecision(2),
                'verdict': (verdict.verdict ? "Yes" : "No")
            }
        });

        return (
            <DataTable value={verdicts}>
                {dynamicColumns}
            </DataTable>
        );
    }
}

export default PointsTable;