import React, { Component } from 'react';
import { Link } from 'react-router'

export default class EventComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <tr>
                <td>
                    {this.props.eventDate}
                </td>
                <td>
                    <strong>{this.props.title}</strong>
                </td>
                <td>
                    {this.props.details}
                </td>
                <td>
                    <Link to={`/${this.props.link}`}>View</Link>
                </td>
                <td>
                    <a onClick={() => this.props.editEvent(this.props.pk)}>Edit this Event</a>
                </td>
                <td>
                    <a onClick={() => this.props.deleteEvent(this.props.pk)}>Delete this Event</a>
                </td>
            </tr>
        )
    }
}