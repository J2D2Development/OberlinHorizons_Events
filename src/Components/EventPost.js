import React from 'react';

const EventPost = (props) => {
    console.log(props);

    return(
        <div>
            <h1>{props.title}</h1>
            <p>{props.details}</p>
        </div>
    )
}

export default EventPost;