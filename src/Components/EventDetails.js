import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import AddPostForm from './AddPostForm';
import EventPost from './EventPost';

const EventDetails = (props) => {
    let d, posts;
    if(props.eventDetails) {
        d = props.eventDetails;
        if(d.posts) {
            posts = Object.keys(d.posts).filter(key => {
                //only return approved posts
                return d.posts[key].approved;
            })
            .map(key => {
                return(
                    <EventPost key={key} postId={key} eventId={d.eventId} title={d.posts[key].title} details={d.posts[key].details} deletePost={props.deletePost} />
                )
            });
        }
    }

    return(
        <div style={{minWidth: 100 + '%'}}>
            <div className="event-details--headline">
                <div className="event-details--flex">
                    <h1>{d && d.title}</h1>
                    <div className="event-details--more">
                        Date: {d && d.eventDate}<br />
                        Creator: ...
                    </div>
                </div>
                {d && d.details}
            </div>
            <div className="event-details--body">
                <div className="event-details--posts">
                    <ReactCSSTransitionGroup
                        transitionName="post"
                        transitionEnterTimeout={500}
                        transitionLeave={false}>
                        { posts }
                    </ReactCSSTransitionGroup>
                </div>
                <div>
                    <AddPostForm addNewPost={props.addNewPost} eventId={d && d.eventId} />
                </div>
            </div>
        </div>
    )
}

export default EventDetails;