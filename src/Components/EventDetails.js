import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import { Link } from 'react-router';
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
                    <EventPost key={key} postId={key} eventId={d.eventId} author={d.posts[key].author} details={d.posts[key].details} deletePost={props.deletePost} />
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
                        Creator: ...<br />
                        <div className="event-card-actions">
                            <i
                                onClick={() => props.editEvent(d.eventId)}
                                className="fa fa-pencil-square-o" aria-hidden="true">
                            </i>
                            <i
                                onClick={() => props.deleteEvent(d.eventId)}
                                className="fa fa-times" aria-hidden="true">
                            </i>
                        </div>
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
                    <AddPostForm addNewPost={props.addNewPost} eventId={d && d.eventId} />
                </div>
                <div>
                    Active User Info
                </div>
            </div>
        </div>
    )
}

export default EventDetails;