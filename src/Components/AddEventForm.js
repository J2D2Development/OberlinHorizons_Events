import React, { Component } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

export default class AddEventForm extends Component {
    simpleSlugify(word) {
        return word.replace(/\s/g, '-');
    }

    addEvent(evt) {
        evt.preventDefault();

        const newEvent = {
            eventDate: this.eventDate,
            title: this.title.value,
            details: this.details.value,
            link: this.simpleSlugify(this.title.value)
        };
        console.log(newEvent);
        this.props.addNewEvent(newEvent);
        this.eventForm.reset();
    }

    render() {
        return(
            <div className="event-form-wrapper">
                <h1>Add New Event</h1>
                <form className="form-twocolumn" ref={input => this.eventForm = input} onSubmit={e => this.addEvent(e)}>
                    <div className="datepicker">
                        <h3>Select Date</h3>
                        <InfiniteCalendar
                            width={300} height={250}
                            selectedDate={new Date()} 
                            onSelect={momentObj => {
                                console.log(momentObj.format());
                                this.eventDate = momentObj.format();
                            }}
                        />
                    </div>
                    <div className="text-input--wrapper">
                        <div className="event-card-title">
                            <h3>Event Title</h3>
                            <input className="title-input" ref={input => this.title = input} type="text" placeholder="Kickass Event Title" />

                            <h3>Event Details</h3>
                            <textarea className="title-input" ref={input => this.details = input} placeholder="Oberlin Horizons secret meeting details..."></textarea>
                        </div>
                        <div className="event-card-actions">
                            <button className="new-event-submit" type="submit">
                                <i className="fa fa-plus" aria-hidden="true"></i> Add Event
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}