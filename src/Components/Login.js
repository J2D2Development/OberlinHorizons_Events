import React, { Component } from 'react';

export default class Login extends Component {
    fireLogin(evt) {
        evt.preventDefault();

        let info = {
            username: this.username.value,
            password: this.password.value
        }
        this.props.login(info);
    }
    
    render() {
        return(
            <div className="login-form--wrapper">
                <div className="login-form--inner">
                    <h1>Login</h1>
                    <p className="login-instructions">
                        Access for authorized users only<br />
                        Request access
                    </p>
                    <form className="login-form" ref={input => this.loginForm = input} onSubmit={e => this.fireLogin(e)}>
                        
                            <input type="text" placeholder="Email" id="email" autoFocus ref={input => this.username = input} />
                            <input type="password" placeholder="Password" id="password" ref={input => this.password = input} />
                        <input type="submit" value="Log In" />
                    </form>
                </div>
            </div>
        )
    }
}