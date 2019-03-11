import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";

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
                                authorize={(user, password) => this.props.authService.authorize(user, password)}

                                setToken={this.props.setToken}
                    />

                    <PropsRoute path="/plot" exact component={PlotPage}
                                isTokenized={() => this.props.token !== undefined}
                                setToken={this.props.setToken}

                                getVerdict={(x, y, r) => this.props.pointsService.getVerdict(this.props.token, x, y, r)}
                                getVerdicts={() => this.props.pointsService.getVerdicts(this.props.token)}
                                clearVerdicts={() => this.props.pointsService.clearVerdicts(this.props.token)}
                    />
                </div>
            </Router>
        )
    }
}

export default Content;