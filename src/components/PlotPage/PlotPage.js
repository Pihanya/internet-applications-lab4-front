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

        if (!this.props.isTokenized()) {
            this.props.history.push("/");
        }

        this.state = {
            xInputValue: 0,
            yInputValue: 0,
            rInputValue: 1,

            verdicts: []
        };

        this.addPoint = this.addPoint.bind(this);

        this.onSubmitButtonClicked = this.onSubmitButtonClicked.bind(this);
        this.onClearButtonClicked = this.onClearButtonClicked.bind(this);
        this.onBackButtonClicked = this.onBackButtonClicked.bind(this);
    }

    componentDidMount() {
        this.props.getVerdicts().then(verdictsArray => {
            if (verdictsArray !== undefined) {
                this.setState({verdicts: verdictsArray})
            } else {
                console.error("Error! Could not preload verdicts: verdictsArray is undefined");
                this.setState({verdicts: []})
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.getVerdicts().then(verdictsArray => {
            if (verdictsArray !== undefined) {
                let verdicts = verdictsArray.map(verdict => {
                        return {
                            x: verdict.x,
                            y: verdict.y,
                            r: verdict.r,
                            verdict: verdict.verdict
                        };
                    }
                );

                this.setState({verdicts: verdicts});
            } else {
                console.error("Error! Could update verdicts: verdictsArray is undefined");
            }
        });
    }

    render() {
        return (
            <div className="plot-root">
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-lg-4 table-container">
                        <PointsTable
                            getVerdicts={() => this.state.verdicts}
                        />
                    </div>

                    <div className="p-col-12 p-md-6 p-lg-4 form-container">
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
                                           value={this.state.yInputValue}
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
                            <Button className="p-col" label="Вернуться назад" onClick={this.onBackButtonClicked}/>
                            <Button className="p-col" label="Очистить все точки" onClick={this.onClearButtonClicked}/>
                            <Button className="p-col" label="Добавить" onClick={this.onSubmitButtonClicked}/>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-6 p-lg-4 plot-container">
                        Приложение определяет, входят ли указанные пользователем точки в заданную область.

                        <Plot
                            getVerdicts={() => this.state.verdicts}

                            addPoint={this.addPoint}

                            r={this.state.rInputValue}
                        />
                    </div>
                </div>

                <Messages ref={(el) => this.messages = el}/>
            </div>
        );
    }

    addPoint(x, y, r) {
        console.log('Adding point: ' + x + ',' + y + ' ' + r);

        return this.props.getVerdict(x, y, r).then(verdict => {
                let verdictsArray = this.state.verdicts;
                verdictsArray.push({x: x, y: y, r: r, verdict: verdict});

                this.setState({verdicts: verdictsArray});
                return verdict;
            }
        )
    }

    onSubmitButtonClicked() {
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
                summary: 'Point {' + inputX + ", " + inputY + "} inside radius " + inputR + ' was successfully added'
            });
        }
    }

    onClearButtonClicked() {
        this.props.clearVerdicts().then(clearResult => {
                if (clearResult) {
                    this.messages.show({
                        severity: 'success',
                        summary: 'Points were successfully cleared!'
                    });
                } else {
                    this.messages.show({severity: 'error', summary: 'Failed to clear points'});
                }
            }
        )
    }

    onBackButtonClicked() {
        this.props.setToken(undefined);
        this.props.history.push('/');
    }
}

export default PlotPage;