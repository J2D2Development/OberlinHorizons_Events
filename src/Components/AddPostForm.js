import React, { Component } from 'react';

export default class AddPostForm extends Component {
    constructor() {
        super();
    }

    addPost(evt) {
        evt.preventDefault();

        const timestamp = Date.now();

        const newPost = {
            postedOn: timestamp,
            details: this.details.value,
            author: 'Joe Test',
            approved: true
        };
        this.props.addNewPost(newPost, this.props.eventId);
        this.postForm.reset();
    }

    render() {
        return(
            <div className="event-details--post">
                <div className="post-wrapper">
                    <i className="fa fa-2x fa-user-o post-icon" aria-hidden="true"></i><br />
                    <span className="post-author">user</span>
                </div>
                <form className="form-newpost" ref={input => this.postForm = input} onSubmit={e => this.addPost(e)}>
                    <div className="form-newpost--main">
                        <div className="form-newpost--inputs">
                            <input className="newpost-input--text" ref={input => this.details = input} type="text" placeholder="Add New Post" />
                        </div>
                        <div className="form-newpost--actions">
                            <button className="new-post-submit" type="submit">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}