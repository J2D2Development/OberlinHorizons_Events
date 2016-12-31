import React from 'react';
import { Link } from 'react-router';
import AddPostForm from './AddPostForm';

const EventDetails = (props) => {
    let d;
    if(props.eventDetails) {
        d = props.eventDetails;
    }

    return(
        <div>
            <h1>{d && d.title}</h1>
            <p>{d && d.details}</p>
            <AddPostForm addNewPost={props.addNewPost} />
            <Link to={'/'}>
                <i className="fa fa-pencil-square-o"></i>
            </Link>
        </div>
    )
}

export default EventDetails;