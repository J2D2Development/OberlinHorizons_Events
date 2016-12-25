import React, { Component } from 'react';

export default class AddEventForm extends Component {
    constructor() {
        super();
    }

    simpleSlugify(word) {
        return word.replace(/\s/g, '-');
    }

    addEvent(evt) {
        evt.preventDefault();

        const newEvent = {
            eventDate: this.eventDate.value,
            title: this.title.value,
            details: this.details.value,
            link: this.simpleSlugify(this.title.value)
        };

        this.props.addNewEvent(newEvent);
        this.eventForm.reset();
    }

    render() {
        return(
            <form className="form-row" ref={input => this.eventForm = input} onSubmit={e => this.addEvent(e)}>
                <input className="form-flex-grow" ref={input => this.eventDate = input} type="date" placeholder="Date" />
                <input className="form-flex-grow" ref={input => this.title = input} type="text" placeholder="Title" />
                <input className="form-flex-grow" ref={input => this.details = input} type="text" placeholder="Details" />
                <button className="form-flex-grow" type="submit">+ Add Event</button>
            </form>
        )
    }
}