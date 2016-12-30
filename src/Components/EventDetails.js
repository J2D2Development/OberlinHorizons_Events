import React, { Component } from 'react';
import { Link } from 'react-router'
import base from '../base';

export default class EventDetails extends Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props);

        return(
            <div>
                <h1>FUCK</h1>
                <Link to={'/'}>Back</Link>
            </div>
        )
    }
}