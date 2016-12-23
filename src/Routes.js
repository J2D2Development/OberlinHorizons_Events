import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './App';
import Login from './Components/Login';
import EventDetails from './Components/EventDetails';
import NotFound from './Components/NotFound';

const Root = () => {
    let isLoggedIn = true;

    return(
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={isLoggedIn ? App : Login} />
                <Match exactly pattern="/:eventId" component={EventDetails} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

export default Root;