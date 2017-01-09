import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const EventComponent = (props) => {
    return(
        <Link className="link-nostyle" activeClassName="link-active" to={`/${props.pk}`}>
            <div className="event-card">
                <div className="event-card-title">{props.eventInfo.title}</div>
                <div className="date">{moment(props.eventInfo.eventDate).format('MMMM Do YYYY')}</div>
            </div>
        </Link>
    )
}

export default EventComponent;