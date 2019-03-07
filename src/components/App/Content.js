import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import {PropsRoute} from './PropsRoute'

import './css/Content.css';

import Landing from "../Landing/Landing";
import PlotPage from "../PlotPage/PlotPage";

class Content extends Component {
    render() {
        return (
            <Router>
                <div className="content-root">
                    <PropsRoute path="/" exact component={Landing}
                                authService={this.props.authService}
                                onLogin={this.props.onLogin}
                    />

                    <PropsRoute path="/plot" exact component={PlotPage}
                                pointsService={this.props.pointsService}
                                getToken={this.props.getToken}
                    />
                </div>
            </Router>
        )
    }
}

export default Content;