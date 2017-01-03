import React from 'react';
import { Link } from 'react-router';

const EventComponent = (props) => {
    return(
        <Link className="link-nostyle" activeClassName="link-active" to={`/${props.pk}`}>
            <div className="event-card">
                <div className="event-card-title">{props.eventInfo.title}</div>
                <div className="date">{props.eventInfo.eventDate}</div>
            </div>
        </Link>
    )
}

export default EventComponent;