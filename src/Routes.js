import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './App';
import Header from './Components/Header';
import Login from './Components/Login';
import EventDetails from './Components/EventDetails';
import NotFound from './Components/NotFound';

const Root = () => {
    let isLoggedIn = true;

    return(
        <div>
            <Header />
            <BrowserRouter>
                <div>
                    <Match exactly pattern="/" component={isLoggedIn ? App : Login} />
                    <Match exactly pattern="/:eventId" render={(props) => (
                        <EventDetails eventTest={'world'} {...props} />
                    )} />
                    <Miss component={NotFound} />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default Root;