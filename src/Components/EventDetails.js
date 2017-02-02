import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AddPostForm from './AddPostForm';
import EventPost from './EventPost';
import moment from 'moment';

const EventDetails = (props) => {
    let d, posts, detailsAvailable = true;
    console.log('in details:', props);
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
    } else if(props && !props.eventDetails) {
        console.log('props loaded, eventDetails undefined');
        detailsAvailable = false;
    }

    if(!detailsAvailable) {
        return(
            <div className="home-wrapper no-event-selected">
                <i className="fa fa-arrow-left no-event-arrow" aria-hidden="true"></i>
                Please select an event
            </div>
        );
    }

    return(
        <div style={{minWidth: 100 + '%'}}>
            <div className="event-details--headline">
                <div className="event-details--flex">
                    <div style={{width: 85 + '%', backgroundColor: '#ccc', marginTop: 30 + 'px', padding: 16 + 'px'}}>
                        <h1>{d && d.title}</h1>
                        <div style={{fontStyle: 'italic'}}>{d && moment(d.eventDate).format('MMMM Do YYYY')}</div>
                    </div>
                    <div className="event-details--more">
                        Created By: ...<br />
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
                <div style={{marginLeft: 32 + 'px', width: 85 + '%'}}>
                    {d && d.details}
                </div>
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
            </div>
            <div style={{position: 'fixed', bottom: 0, right: 0}}>
                <AddPostForm addNewPost={props.addNewPost} eventId={d && d.eventId} />
            </div>
        </div>
    )
}

export default EventDetails;