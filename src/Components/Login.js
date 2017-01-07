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
            <div>
                <h1>Login please</h1>
                <form ref={input => this.loginForm = input} onSubmit={e => this.fireLogin(e)}>
                    <input type="text" placeholder="Email" id="email" ref={input => this.username = input} />
                    <input type="password" placeholder="Password" id="password" ref={input => this.password = input} />
                    <input type="submit" value="Log In" />
                </form>
            </div>
        )
    }
}