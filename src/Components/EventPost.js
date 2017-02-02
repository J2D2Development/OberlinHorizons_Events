import React from 'react';

const EventPost = (props) => {
    return(
        <div className="event-details--post">
            <div className="post-wrapper">
                <i className="fa fa-2x fa-user-o post-icon" aria-hidden="true"></i>
            </div>
            <div className="post-wrapper--text">
                <div style={{display: 'flex'}}>
                    <div className="post-author">{props.author}</div>
                    <i className="fa fa-times icon-button" style={{marginLeft: 32 + 'px'}} aria-hidden="true" onClick={() => { props.deletePost(props.eventId, props.postId)}} ></i>
                </div>
                <div style={{backgroundColor: '#ccc', padding: 6 + 'px', borderRadius: 6 + 'px'}}>
                    <div>{props.details}</div>
                </div>
            </div>
        </div>
    )
}

export default EventPost;