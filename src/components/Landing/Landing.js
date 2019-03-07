import React, {Component} from "react";

import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';

import "./Landing.css"

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Misha",
            password: "Gostev",
            timestamp: new Date().toLocaleTimeString(),
            token: undefined,

            dateUpdaterIntervalId: undefined
        };

        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
        this.fetchToken = this.fetchToken.bind(this);
    }

    componentDidMount() {
        let self = this;
        let intervalId = setInterval(
            () => self.setState({timestamp: new Date().toLocaleTimeString()}),
            3000
        );

        this.setState({dateUpdaterIntervalId: intervalId});
    }

    render() {
        return (
            <div className="landing-root">
                <div className="p-col">
                    <h2>Текущее время {this.state.timestamp}</h2>

                    <h3>Окно авторизации</h3>

                    <div className="authorization-form">
                        <div className="input-box">
                            <label htmlFor="username_field">Username</label>
                            <InputText id="username_field"
                                       value={this.state.username}
                                       onChange={(e) => this.setState({username: e.target.value})}
                            />
                        </div>

                        <div className="input-box">
                            <label htmlFor="password_field">Password</label>
                            <Password id="password_field"
                                      value={this.state.password}
                                      onChange={(e) => this.setState({password: e.target.value})}
                            />
                        </div>

                        <div className="submit-form-button">
                            <Button label="Login" onClick={this.handleLoginButtonClick}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleLoginButtonClick() {
        // this.fetchToken();
        // if (this.state.token === undefined) {
        //     return; // TODO: Could not login
        // } else {
        //     if (this.state.dateUpdaterIntervalId !== undefined) {
        //         clearInterval(this.state.dateUpdaterIntervalId)
        //     }
        //
        //     this.props.history.push("/plot");
        // }

        this.props.history.push("/plot");
    }

    fetchToken() {

    }
}

export default Landing;