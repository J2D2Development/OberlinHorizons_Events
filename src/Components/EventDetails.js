import React, { Component } from 'react';
import { Link } from 'react-router'
import base from '../base';

export default class EventDetails extends Component {
    constructor() {
        super();

        this.addNewPost = this.addNewPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);

        this.state = {
            posts: {}
        }
    }

    componentWillMount() {
        this.ref = base.syncState(`allEvents/${this.props.params.eventId}`, {
                context: this,
                state: `allEvents/${this.props.params.eventId}`
            });
        console.log('state in child is:', this.state);
        console.log('ref in child:', this.ref);
    }

    //manage event posts (to be passed to EventDetails component)
    addNewPost(post, eventId) {
        console.log('adding post:', eventId, post);
        const posts = {...this.state.posts};
        const timestamp = Date.now();

        posts[`post${timestamp}`] = post;

        this.setState({ posts });
    }

    editPost(eventId, postId) {
        console.log('edit post:', eventId, postId);
    }

    deletePost(eventId, postId) {
        console.log('del post:', eventId, postId);
    }

    render() {
        console.log(this.props);
        console.log('in render:', this.state);
        const myProps = this.state[`allEvents/${this.props.params.eventId}`];
        console.log('my props:', myProps);

        return(
            <div>
                <h1>{ myProps && myProps.title }</h1>
                <Link to={'/'}>
                    <i className="fa fa-pencil-square-o"></i>
                </Link>
                <i
                    onClick={() => this.editPost(1)}
                    className="fa fa-pencil-square-o" aria-hidden="true">
                </i>
                <i
                    onClick={() => this.deletePost(1)}
                    className="fa fa-times" aria-hidden="true">
                </i>
            </div>
        )
    }
}