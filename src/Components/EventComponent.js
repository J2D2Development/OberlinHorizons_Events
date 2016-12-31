import React from 'react';
import { Link } from 'react-router';

const EventComponent = (props) => {
    return(
        <div className="event-card">
            <div className="date">{props.eventInfo.eventDate}</div>
            <div className="event-card-title">{props.eventInfo.title}</div>
            <div className="event-card-actions">
                <Link to={`/${props.pk}`}>View</Link>
                <i
                    onClick={() => props.editEvent(props.pk)}
                    className="fa fa-pencil-square-o" aria-hidden="true">
                </i>
                <i
                    onClick={() => props.deleteEvent(props.pk)}
                    className="fa fa-times" aria-hidden="true">
                </i>
            </div>
        </div>
    )
}

export default EventComponent;