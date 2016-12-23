import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class EventComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.details}</p>
                <Link to={`/${this.props.link}`}>View this event</Link>
            </div>
        )
    }
}