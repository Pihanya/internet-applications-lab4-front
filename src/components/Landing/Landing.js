import React, {Component} from "react";

import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Messages} from 'primereact/messages';

import "./Landing.css"

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timestamp: new Date().toLocaleTimeString(),

            dateUpdaterIntervalId: undefined
        };

        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
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

                    <Messages ref={(el) => this.messages = el}/>
                </div>
            </div>
        )
    }

    handleLoginButtonClick() {
        let token = this.props.authService.authorize(this.state.username, this.state.password);
        if (token === undefined) {
            this.messages.show(
                {
                    severity: 'error',
                    summary: 'Authorization fail!',
                    detail: 'Could not authorize with given creditials'
                }
            );
        } else {
            this.props.onLogin(token);

            if (this.state.dateUpdaterIntervalId !== undefined) {
                clearInterval(this.state.dateUpdaterIntervalId)
            }

            this.props.history.push("/plot");
        }
    }
}

export default Landing;