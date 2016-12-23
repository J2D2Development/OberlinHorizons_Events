import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return(
            <div>
                <h1>Login please</h1>
                <form>
                    <input type="text" placeholder="Email" id="email" />
                    <input type="password" placeholder="Password" id="password" />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}