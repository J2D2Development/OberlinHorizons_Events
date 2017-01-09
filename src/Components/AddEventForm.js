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
                <form className="form-vertical" ref={input => this.eventForm = input} onSubmit={e => this.addEvent(e)}>
                    <div className="date">
                        <InfiniteCalendar
                            width={200} height={300}
                            selectedDate={new Date()} 
                            onSelect={momentObj => {
                                console.log(momentObj.format());
                                this.eventDate = momentObj.format();
                            }}
                        />
                    </div>
                    <div className="event-card-title">
                        <input className="title-input" ref={input => this.title = input} type="text" placeholder="Event Title" />
                        <input className="title-input" ref={input => this.details = input} type="text" placeholder="Event Details" />
                    </div>
                    <div className="event-card-actions">
                        <button className="new-event-submit" type="submit">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}