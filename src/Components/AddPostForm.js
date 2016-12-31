import React, { Component } from 'react';

export default class AddPostForm extends Component {
    constructor() {
        super();
    }

    addPost(evt) {
        evt.preventDefault();

        const timestamp = new Date();

        const newPost = {
            postedOn: timestamp,
            title: this.title.value,
            details: this.details.value,
            author: 'Joe Test'
        };

        this.props.addNewPost(newPost);
        this.postForm.reset();
    }

    render() {
        return(
            <div className="event-card">
                <h3>Add new post</h3>
                <form className="form-vertical" ref={input => this.postForm = input} onSubmit={e => this.addPost(e)}>
                    <div className="event-card">
                        <div className="event-card-title">
                            <input className="title-input" ref={input => this.title = input} type="text" placeholder="Title" />
                            <input className="title-input" ref={input => this.details = input} type="text" placeholder="Details" />
                        </div>
                        <div className="event-card-actions">
                            <button className="new-event-submit" type="submit">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}