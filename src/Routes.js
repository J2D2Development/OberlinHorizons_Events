import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import EventDetails from './Components/EventDetails';
import NotFound from './Components/NotFound';
import HomePlaceholder from './Components/HomePlaceholder';

const Root = () => {
    return(
        <div>
            <BrowserRouter>
                <div>
                    <Match exactly pattern="/" render={(props) => (
                        <HomePlaceholder />
                    )} />
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