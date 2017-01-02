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
            title: this.title.value,
            details: this.details.value,
            author: 'Joe Test',
            approved: true
        };
        this.props.addNewPost(newPost, this.props.eventId);
        this.postForm.reset();
    }

    render() {
        return(
            <div className="form-newpost--wrapper">
                <h3>Add new post</h3>
                <form className="form-newpost" ref={input => this.postForm = input} onSubmit={e => this.addPost(e)}>
                    <div className="form-newpost--main">
                        <div className="form-newpost--inputs">
                            <input className="title-input" ref={input => this.title = input} type="text" placeholder="Title" />
                            <input className="title-input" ref={input => this.details = input} type="text" placeholder="Details" />
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