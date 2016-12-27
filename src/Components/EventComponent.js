import React, { Component } from 'react';
import { Link } from 'react-router'

import defaultImage from '../img/corona.jpg';

export default class EventComponent extends Component {
    constructor() {
        super();
    }

    render() {
        const source = this.props.eventInfo.img || defaultImage;
        return(
            <div className="event-card">
                <div className="event-card-main">
                    <div className="date">{this.props.eventInfo.eventDate}</div>
                    <img src={source} alt="Event Image" className="event-image--default" />
                </div>
                <div className="event-card-footer">
                    <div className="event-card-footer--title">
                        {this.props.eventInfo.title}
                    </div>
                    <div className="event-card-footer--actions">
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
            </div>
        )
    }
}