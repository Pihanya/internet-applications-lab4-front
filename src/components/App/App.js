import React, {Component} from 'react';

import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

import AuthService from "../../service/AuthService";
import PointsService from "../../service/PointsService";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            r: 1,
            token: undefined
        };

        this.setToken = this.setToken.bind(this);

        this.authService = new AuthService();
        this.pointsService = new PointsService();
    }

    setToken(token) {
        this.setState({token: token})
    }

    render() {
        return (
            <div className="app-root">
                <Header/>

                <Content
                    authService={this.authService}
                    pointsService={this.pointsService}

                    token={this.state.token}
                    setToken={this.setToken}
                />

                <Footer/>
            </div>
        );
    }
}

export default App;
