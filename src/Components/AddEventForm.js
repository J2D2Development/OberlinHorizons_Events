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
            <div className="event-card">
                <form className="form-vertical" ref={input => this.eventForm = input} onSubmit={e => this.addEvent(e)}>
                    <div className="event-card">
                        <div className="date">
                            <input className="date-input" ref={input => this.eventDate = input} type="date" placeholder="Date" />
                        </div>
                        <div className="event-card-title">
                            <input className="title-input" ref={input => this.title = input} type="text" placeholder="Event Title" />
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