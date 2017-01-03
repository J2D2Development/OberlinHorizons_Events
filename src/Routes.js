import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import EventDetails from './Components/EventDetails';
import NotFound from './Components/NotFound';
import HomePlaceholder from './Components/HomePlaceholder';

import './App.css';
import base from './base';

import Login from './Components/Login';
import MenuItems from './Components/MenuItems';
import EventComponent from './Components/EventComponent';
import AddEventForm from './Components/AddEventForm';
import Header from './Components/Header';
import ConfirmModal from './Components/ConfirmModal';

export default class Root extends Component {
    constructor() {
        super();
        let isLoggedIn = true;

        this.eventsFilter = 'current';

        this.getEvents = this.getEvents.bind(this);
        this.addNewEvent = this.addNewEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            events: {}
        };
    }

    componentWillMount() {
        this.ref = base.syncState(`allEvents`, {
                context: this,
                state: 'events'
            });
    }

    getEvents() {
        const events = Object.keys(this.state.events)
        .map(key => {
            return <EventComponent key={key} 
            pk={key} 
            eventInfo={this.state.events[key]} />
        })
        .sort((e1, e2) => e1.props.eventInfo.eventDate < e2.props.eventInfo.eventDate);
        return events;
    }

    //manage events (general info)
    addNewEvent(event) {
        const events = {...this.state.events};
        const timestamp = Date.now();
        event.eventId = `evt${timestamp}`;
        events[`evt${timestamp}`] = event;

        this.setState({ events });
    }

    editEvent(id) {
        console.log('edit event:', id);
    }

    deleteEvent(id) {
        //need to add redirect to home after delete
        let confirm = window.confirm('Are you sure?');
        if(confirm) {
            const events = {...this.state.events};
            events[id] = null;
            this.setState({ events });
        }
    }

    // //manage event posts (to be passed to EventDetails component)
    addNewPost(post, eventId) {
        const events = {...this.state.events};
        const postId = `post${post.postedOn}`;
        const eventPosts = events[eventId]['posts'];
        if(!eventPosts) {
           events[eventId]['posts']  = {};
           
        }
        events[eventId]['posts'][postId] = post;
        this.setState({ events });
    }

    editPost(eventId, postId) {
        console.log('edit post:', eventId, postId);
    }

    deletePost(eventId, postId) {
        console.log('del post:', eventId, postId);
        this.showModal();
        // let confirm = window.confirm('Delete this event?');
        // if(confirm) {
        //     const events = {...this.state.events};
        //     events[eventId]['posts'][postId] = null;
        //     this.setState({ events });
        // }
    }

    //modal methods
    //<ConfirmModal msg="Hi there" closeModal={this.closeModal} callback={this.modalCallback} />
    showModal() {
        console.log('show modal');
        const bg = document.querySelector('.modal-bg');
        bg.classList.add('modal-bg--show');
    }
    closeModal() {
        console.log('close now');
        const bg = document.querySelector('.modal-bg');
        bg.classList.remove('modal-bg--show');
    }

    setEventsFilter(type) {
        this.eventsFilter = type;
        console.log('event filter set:', type);
        let events = {...this.state.events};
        events = Object.keys(events).map(key => {
            return <EventComponent key={key} 
            pk={key} 
            eventInfo={this.state.events[key]} />
        })
        .filter(event => {
            if(this.eventsFilter === 'current') {
                return Date.parse(event.props.eventInfo.eventDate) > Date.now();
            } else {
                return Date.parse(event.props.eventInfo.eventDate) < Date.now();
            }
        });
        console.log('after filter:', events);
        this.setState({ events });
    }

    render() {
        let events = this.getEvents('current');
        
        return (
                <BrowserRouter>
                    <div className="App">
                        
                        <Match exactly pattern="/" render={(props) => (
                            <div className="outer-wrapper">
                                <Header />
                                <div className="App">
                                    <div className="events-main--wrapper">
                                        <div className="events-main--sidebar">
                                            <div className="events-sidebar--topmenu">
                                                <span onClick={() => this.setEventsFilter('current')}>Upcoming</span> -- 
                                                <span onClick={() => this.setEventsFilter('past')}>Past</span> -- 
                                                <span>Add New</span>
                                            </div>
                                            <MenuItems events={events} />
                                            <h3>Add New Event</h3>
                                            <AddEventForm addNewEvent={this.addNewEvent} />
                                        </div>
                                        <div className="events-main--full">
                                            <HomePlaceholder />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} />
                        <Match exactly pattern="/:eventId" render={(props) => (
                            <div className="outer-wrapper">
                                <Header />
                                <div className="App">
                                    <div className="events-main--wrapper">
                                        <div className="events-main--sidebar">
                                            { events }
                                            <AddEventForm addNewEvent={this.addNewEvent} />
                                        </div>
                                        <div className="events-main--full">
                                            <EventDetails eventDetails={events.filter(e => {
                                                return e.props.pk === props.params.eventId;
                                            }).map(e => {
                                                return e.props.eventInfo;
                                            })[0]} addNewPost={this.addNewPost} deleteEvent={this.deleteEvent} editEvent={this.editEvent} deletePost={this.deletePost} {...props} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} />
                        <Miss component={NotFound} />
                    </div>
                </BrowserRouter>
        )
    }
}