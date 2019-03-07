import React, {Component} from 'react';
import {Slider} from 'primereact/slider';
import {InputText} from 'primereact/inputtext';
import {Button} from "primereact/button";

import PointsTable from "./PointsTable";
import Plot from "./Plot";

import "./css/PlotPage.css";
import "primeflex/primeflex.css"

import PointsService from '../../service/PointsService'

export class PlotPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xInputValue: 0,
            yInputValue: null,
            rInputValue: 1,

            verdicts: [
                {x: 0.5, y: 0.5, r: 1, verdict: true},
                {x: -0.5, y: -1, r: 2, verdict: false}
            ]
        };

        this.pointsService = new PointsService();

        this.getVerdicts = this.getVerdicts.bind(this);
        this.onPlotClicked = this.onPlotClicked.bind(this);
        this.updateYTextValue = this.updateYTextValue.bind(this);
        this.clearVerdicts = this.clearVerdicts.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    render() {
        return (
            <div className="plot-root">
                <div className="p-grid">
                    {/*<div className="table-row plot-root">*/}
                    <div className="p-col table-container">
                        {/*<div className="column table-column">*/}
                        <PointsTable
                            getVerdicts={this.getVerdicts}
                        />
                    </div>

                    <div className="p-col form-container">
                        <div className="data-box">
                            <div className="data-header">
                                Значение X [-3; 5]
                            </div>


                            <div className="data-input slider">
                                <div className="data-input-text">Текущее значение X: {this.state.xInputValue}</div>
                                <Slider
                                    min={-3} max={5}
                                    value={this.state.xInputValue}
                                    onChange={(e) => this.setState({xInputValue: e.value})}
                                />
                            </div>
                        </div>

                        <div className="data-box">
                            <div className="data-header">
                                Значение Y [-3; 3]
                            </div>

                            <div className="data-input">
                                <span className="p-float-label">
                                    <InputText keyfilter="num" id="in" value={this.state.yInputValue}
                                        // onChange={(e) => this.setState({y: e.target.value})}
                                               onChange={(e) => this.updateYTextValue(e.value)}
                                    />
                                    <label htmlFor="in">Y</label>
                                </span>
                            </div>
                        </div>

                        <div className="data-box">
                            <div className="data-header">
                                Значение R
                            </div>

                            <div className="data-input slider">
                                <div className="data-input-text">Текущее значение R: {this.state.rInputValue}</div>
                                <Slider
                                    min={-3} max={5}
                                    value={this.state.rInputValue}
                                    onChange={(e) => this.setState({rInputValue: e.value})}
                                />
                            </div>
                        </div>

                        <Button label="Очистить все точки" onClick={this.clearVerdicts}/>
                        <Button label="Добавить"/>
                    </div>

                    <div className="p-col plot-container">
                        {/*<div className="column plot-column">*/}
                        <text>Приложение определяет, входят ли указанные пользователем точки в заданную область.</text>

                        <Plot
                            getVerdicts={this.getVerdicts}

                            onPlotClicked={this.onPlotClicked}

                            r={this.state.rInputValue}
                        />
                    </div>
                </div>
            </div>
        );
    }

    getToken() {
        this.props.getToken();
    }

    clearVerdicts() {
        this.setState({verdicts: []})
    }

    getVerdicts() {
        return this.state.verdicts;
    }

    onPlotClicked(x, y, r) {
        console.log("Plot clicked " + x + " " + y + " " + r);

        let verdictsArray = this.state.verdicts;
        verdictsArray.push({x: x, y: y, r: r, verdict: Math.random() > 0.5});

        this.setState({verdicts: verdictsArray});
    }

    // Y length validation
    updateYTextValue(value) {
        if (value < 0 && value.toString().length > 6) {
            return;
        }

        if (value >= 0 && value.toString().length > 5) {
            return;
        }

        this.setState({y: value})
    }
}

export default PlotPage;