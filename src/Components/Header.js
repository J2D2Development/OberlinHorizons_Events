import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return(
            <nav>
                <ul className="main-nav">
                    <li className="logo-center">Oberlin Horizons - Events</li>
                    <ul className="main-nav">
                        <li className="nav-button">
                            <i className="fa fa-home" aria-hidden="true" title="Home"></i>
                        </li>
                        <li className="nav-button" style={{marginRight: 6+'px'}}>
                            <i className="fa fa-user-o" aria-hidden="true" title="My Profile"></i>
                        </li>
                    </ul>
                </ul>
            </nav>
        )
    }
}