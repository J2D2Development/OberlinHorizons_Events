import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import EventDetails from './Components/EventDetails';
import NotFound from './Components/NotFound';
import HomePlaceholder from './Components/HomePlaceholder';

import './App.css';
import base from './base';

import Login from './Components/Login';
import EventComponent from './Components/EventComponent';
import AddEventForm from './Components/AddEventForm';
import Header from './Components/Header';

export default class Root extends Component {
    constructor() {
        super();
        let isLoggedIn = true;

        this.addNewEvent = this.addNewEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);

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

    //method for 'get past events' - click button, get old events from db

    confirmModal(msg) {
        return false;
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
    }

    render() {
        const events = Object.keys(this.state.events)
            .map(key => {
                return <EventComponent key={key} 
                pk={key} 
                eventInfo={this.state.events[key]}
                editEvent={this.editEvent}
                deleteEvent={this.deleteEvent}
                addNewPost={this.addNewPost} />
            })
            .sort((e1, e2) => e1.props.eventInfo.eventDate < e2.props.eventInfo.eventDate);

        return (
                <BrowserRouter>
                    <div className="App">
                        <Match exactly pattern="/" render={(props) => (
                            <div className="outer-wrapper">
                                <Header />
                                <div className="App">
                                    <div className="events-main--wrapper">
                                        <div className="events-main--sidebar">
                                            { events }
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
                                            })[0]} addNewPost={this.addNewPost}  {...props} />
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