import React, { Component } from 'react';
import { Link } from 'react-router'

// import defaultImage from '../img/corona.jpg';

export default class EventComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="event-card">
                <div className="date">{this.props.eventInfo.eventDate}</div>
                <div className="event-card-title">{this.props.eventInfo.title}</div>
                <div className="event-card-actions">
                    <Link to={`/${this.props.eventInfo.link}`}>View</Link>
                    <i
                        onClick={() => this.props.editEvent(this.props.pk)}
                        className="fa fa-pencil-square-o" aria-hidden="true">
                    </i>
                    <i
                        onClick={() => this.props.deleteEvent(this.props.pk)}
                        className="fa fa-times" aria-hidden="true">
                    </i>
                </div>
            </div>
        )
    }
}