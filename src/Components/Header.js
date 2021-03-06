import React from 'react';
import { Link } from 'react-router';
import logo from '../img/logoSm.png';

const Header = (props) => {
    return(
        <nav id="header">
            <ul className="main-nav">
                <li className="logo-center">
                    <Link to={'/'}><img src={logo} alt="Ob-logo" /></Link>
                    Events
                </li>
                <ul className="main-nav">
                    <li style={{display: props.loggedIn ? 'flex' : 'none'}} onClick={props.logout} className="nav-button">Logout</li>
                    <li className="nav-button">
                        <Link to={'/'}>
                            <i className="fa fa-home" aria-hidden="true" title="Home"></i>
                        </Link>
                    </li>
                    <li className="nav-button" style={{marginRight: 6+'px'}}>
                        <Link to={'/profile'}>
                            <i className="fa fa-user-o" aria-hidden="true" title="My Profile"></i>
                        </Link>
                    </li>
                </ul>
            </ul>
        </nav>
    )
}

export default Header;