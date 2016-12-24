import React, { Component } from 'react';
import { Link } from 'react-router'

export default class EventDetails extends Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props);
        console.log('params:', this.params);
        return(
            <div>
                <h1>{this.props.params.eventId} Details!</h1>
                <Link to={'/'}>Back</Link>
            </div>
        )
    }
}