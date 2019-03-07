import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import './css/Content.css';

import Landing from "../Landing/Landing";
import PlotPage from "../PlotPage/PlotPage";

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="content-root">
                    <Route path="/" exact component={Landing}
                           authService={this.props.authService} />
                    {/*<Route path="/" exact render={() => (
                        <Landing authService={this.props.authService}/>
                    )}/>*/}

                    <Route path="/plot" exact component={PlotPage}
                           pointsService={this.props.pointsService}/>
                    {/*< Route path="/plot" exact render={() => (
                        <PlotPage pointsService={this.props.pointsService}/>
                    )}/>*/}
                </div>
            </Router>
        )
    }
}

export default Content;