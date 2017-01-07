import React from 'react';
import { Link } from 'react-router'

const Header = (props) => {
    return(
        <nav>
            <ul className="main-nav">
                <li className="logo-center">Oberlin Horizons - Events</li>
                <ul className="main-nav">
                    <li style={{display: props.loggedIn ? 'flex' : 'none'}} onClick={props.logout} className="nav-button">Logout</li>
                    <li className="nav-button">
                        <Link to={'/'}>
                            <i className="fa fa-home" aria-hidden="true" title="Home"></i>
                        </Link>
                    </li>
                    <li className="nav-button" style={{marginRight: 6+'px'}}>
                        <i className="fa fa-user-o" aria-hidden="true" title="My Profile"></i>
                    </li>
                </ul>
            </ul>
        </nav>
    )
}

export default Header;