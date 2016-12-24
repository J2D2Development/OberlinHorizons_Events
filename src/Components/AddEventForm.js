import React, { Component } from 'react';

export default class AddEventForm extends Component {
    constructor() {
        super();
    }

    simpleSlugify(word) {
        return word.replace(' ', '-');
    }

    addEvent(evt) {
        evt.preventDefault();

        const newEvent = {
            title: this.title.value,
            details: this.details.value,
            link: this.simpleSlugify(this.title.value)
        };

        this.props.addNewEvent(newEvent);
        this.eventForm.reset();
    }

    render() {
        return(
            <div>
                <form ref={input => this.eventForm = input} onSubmit={e => this.addEvent(e)}>
                    <input ref={input => this.title = input} type="text" placeholder="Title" />
                    <input ref={input => this.details = input} type="text" placeholder="Details" />
                    <button type="submit">+ Add Event</button>
                </form>
            </div>
        )
    }
}