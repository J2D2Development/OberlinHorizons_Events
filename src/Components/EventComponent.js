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
                    {this.props.eventInfo.eventDate || 'None'}
                </td>
                <td>
                    <strong>{this.props.eventInfo.title}</strong>
                </td>
                <td>
                    {this.props.eventInfo.details}
                </td>
                <td>
                    <Link to={`/${this.props.eventInfo.link}`}>View</Link>
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