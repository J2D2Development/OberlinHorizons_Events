import React, { Component } from 'react';
import logo from '../img/logo.png';

export default class Login extends Component {
    fireLogin(evt) {
        evt.preventDefault();

        let info = {
            username: this.username.value,
            password: this.password.value
        }
        let result = this.props.login(info);
        console.log('result is:', result);

        if(result) {
            console.log('failed login, reset forms:', this.loginForm);
        }
    }
    
    render() {
        return(
            <div className="login-form--wrapper">
                <div className="login-form--inner">
                    <h1>
                        <img src={logo} alt="Ob-logo" />
                        <div>
                            Oberlin Horizons
                            <div className="subhead">Events</div>
                        </div>
                    </h1>
                    
                    <form className="login-form" ref={input => this.loginForm = input} onSubmit={e => this.fireLogin(e)}>
                            <input type="text" placeholder="Email" id="email" autoFocus ref={input => this.username = input} />
                            <input type="password" placeholder="Password" id="password" ref={input => this.password = input} />
                        <div className="login-bottom--wrapper">
                            <button type="submit">
                                Reach The Horizon!
                                <i className="fa fa-arrow-right" aria-hidden="true"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}