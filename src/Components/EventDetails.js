import React from 'react';
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
                    <EventPost key={key} title={d.posts[key].title} details={d.posts[key].details} />
                )
            });
        }
    }

    return(
        <div>
            <h1>{d && d.title}</h1>
            <p>{d && d.details}</p>
            { posts }
            <AddPostForm addNewPost={props.addNewPost} eventId={d && d.eventId} />
        </div>
    )
}

export default EventDetails;