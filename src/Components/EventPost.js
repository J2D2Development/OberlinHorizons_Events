import React from 'react';

const EventPost = (props) => {
    return(
        <div className="event-details--post">
            <i className="fa fa-window-close-o top-right icon-button" aria-hidden="true" onClick={() => { props.deletePost(props.eventId, props.postId)}} ></i>
            <i className="fa fa-2x fa-user-o post-icon" aria-hidden="true"></i>
            <div>
                <h2>{props.title}</h2>
                <div>{props.details}</div>
            </div>
        </div>
    )
}

export default EventPost;