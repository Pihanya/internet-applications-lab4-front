import React, {Component} from 'react';
import {Slider} from 'primereact/slider';
import {InputText} from 'primereact/inputtext';
import {Button} from "primereact/button";

import PointsTable from "./PointsTable";
import Plot from "./Plot";

import "./css/PlotPage.css";
import "primeflex/primeflex.css"
import {Messages} from "primereact/messages";

export class PlotPage extends Component {
    constructor(props) {
        super(props);

        console.log("Token in PlotPage: " + this.props.getToken());
        if (this.props.getToken() === undefined) {
            this.props.history.push("/");
        }

        this.state = {
            xInputValue: 0,
            yInputValue: 0,
            rInputValue: 1,

            verdicts: [
                // {x: 0.5, y: 0.5, r: 1, verdict: true},
                // {x: -0.5, y: -1, r: 2, verdict: false}
            ]
        };

        this.getVerdicts = this.getVerdicts.bind(this);
        this.addPoint = this.addPoint.bind(this);
        this.onSubmitPointButtonClicked = this.onSubmitPointButtonClicked.bind(this);
        this.clearVerdicts = this.clearVerdicts.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    render() {
        return (
            <div className="plot-root">
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-lg-3 table-container">
                        <PointsTable
                            getVerdicts={this.getVerdicts}
                        />
                    </div>

                    <div className="p-col-12 p-md-6 p-lg-3 form-container">
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
                                <InputText keyfilter="num"
                                           onChange={(e) => this.setState({yInputValue: e.target.value})}
                                />
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

                        <div className="p-grid buttons-panel">
                            <Button className="p-col" label="Вернуться назад"
                                    onClick={() => this.props.history.push('/')}/>
                            <Button className="p-col" label="Очистить все точки" onClick={this.clearVerdicts}/>
                            <Button className="p-col" label="Добавить" onClick={this.onSubmitPointButtonClicked}/>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-6 p-lg-3 plot-container">
                        {/*<div className="column plot-column">*/}
                        Приложение определяет, входят ли указанные пользователем точки в заданную область.

                        <Plot
                            getVerdicts={this.getVerdicts}

                            addPoint={this.addPoint}

                            r={this.state.rInputValue}
                        />
                    </div>
                </div>

                <Messages ref={(el) => this.messages = el}/>
            </div>
        );
    }

    getToken = this.props.getToken;

    clearVerdicts = () => {
        // this.props.pointsService.clearVerdicts(this.getToken());
        this.setState({verdicts: []});
    };

    getVerdicts = () => {
        // this.props.pointsService.getVerdicts(this.getToken());
        return this.state.verdicts;
    };

    addPoint(x, y, r) {
        console.log(this.getToken());
        console.log("Plot clicked " + x + " " + y + " " + r);

        // TODO: Add validation
        // let verdict = this.props.pointsService.getVerdict(this.getToken(), x, y, r).verdict;

        let verdictsArray = this.state.verdicts;
        verdictsArray.push({x: x, y: y, r: r, verdict: Math.random() > 0.5});
        // verdictsArray.push({x: x, y: y, r: r, verdict: verdict});

        this.setState({verdicts: verdictsArray});
    }

    onSubmitPointButtonClicked() {
        let inputX = this.state.xInputValue;
        let inputY = parseFloat(this.state.yInputValue);
        let inputR = this.state.rInputValue;

        if (inputX === undefined ||
            inputY === undefined ||
            inputR === undefined) {
            this.messages.show({severity: 'error', summary: 'Some of values are undefined'});
        } else if (inputY < -3 || inputY > 3) {
            this.messages.show({severity: 'error', summary: 'Y should be in the interval [-3; 3]'});
        } else {
            this.addPoint(inputX, inputY, inputR);
            this.messages.show({
                severity: 'success',
                summary: 'X: ' + inputX + " Y: " + inputY + " R: " + inputR + " were successfully added"
            });
        }
    }
}

export default PlotPage;