import React, { Component } from 'react';
import { Link } from 'react-router'

export default class EventComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.details}</p>
                <Link to={`/${this.props.link}`}>View</Link>
                &nbsp;--&nbsp;
                <a onClick={() => this.props.editEvent(this.props.pk)}>Edit this Event</a>
                &nbsp;--&nbsp;
                <a onClick={() => this.props.deleteEvent(this.props.pk)}>Delete this Event</a>
            </div>
        )
    }
}