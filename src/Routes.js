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
//import ConfirmModal from './Components/ConfirmModal';

export default class Root extends Component {
    constructor(props) {
        super(props);

        this.filterType = 'current';
        this.addNewEvent = this.addNewEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.filterEvents = this.filterEvents.bind(this);

        this.state = {
            events: {},
            displayEvents: [],
            activeUsers: {},
            loggedIn: localStorage.getItem('loggedIn') || false
        };
    }

    componentWillMount() {
        this.ref = base.syncState(`allEvents`, {
                context: this,
                state: 'events',
                then: () => {
                    console.log('syncing events to firebase');
                    this.filterEvents('current');
                }
            });
    }

    componentDidMount() {
        
        // this.ref = base.syncState(`allEvents`, {
        //         context: this,
        //         state: 'events',
        //         then: () => {
        //             this.filterEvents('current');
        //         }
        //     });
    }

    //manage events (general info)
    addNewEvent(event) {
        console.log('add new event fired:', event);
        const events = {...this.state.events};
        const timestamp = Date.now();
        event.eventId = `evt${timestamp}`;
        events[`evt${timestamp}`] = event;

        this.setState({ 
            events: events 
        }, () => {
            console.log('add new event callback started FUCKFUCKFUCKFUCK');

        });

        console.log('this is after this.setState call');
    }

    editEvent(id) {
        console.log('edit event:', id);
    }

    deleteEvent(id) {
        //need to add redirect to home after delete
        //let confirm = window.confirm('Are you sure?');
        let confirm = true;
        if(confirm) {
            const events = {...this.state.events};
            events[id] = null;
            this.setState({ events },
                () => {
                    console.log('delete event setstate callback');
                });
        }
    }

    // //manage event posts (to be passed to EventDetails component)
    addNewPost(post, eventId) {
        console.log('add new post fired:', post, eventId);
        const events = {...this.state.events};
        const postId = `post${post.postedOn}`;
        const eventPosts = events[eventId]['posts'];
        if(!eventPosts) {
           events[eventId]['posts']  = {};
           
        }
        events[eventId]['posts'][postId] = post;
        this.setState({ 
            events: events
        }, () => {
            console.log('added post', post, 'to event:', events[eventId]);
        });
    }

    editPost(eventId, postId) {
        console.log('edit post:', eventId, postId);
    }

    deletePost(eventId, postId) {
        console.log('del post:', eventId, postId);
        //this.showModal();
        let confirm = true; //window.confirm('Delete this post?');
        if(confirm) {
            console.log('performing delete');
            const events = {...this.state.events};
            delete events[eventId]['posts'][postId];
            console.log(events);
            this.setState({ 
                events: events 
            });
        }
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

    // createUser() {
    //     console.log('creating user:', submitted.username, submitted.password);
    //     base.createUser({
    //         email: submitted.username,
    //         password: submitted.password
    //     }, () => console.log('user created, this is the callback:', submitted));
    // }

    login(submitted) {
        let session = this.state.loggedIn;
        base.authWithPassword({email: submitted.username, password: submitted.password}, (error, data) => {
            if(error) {
                console.log('error:', error);
                console.log('submitted:', submitted.username, submitted.password);
            } else {
                console.log('sign in success response:', data);
                session = true;
                localStorage.setItem('loggedIn', 'true');
                this.setState({ loggedIn: session });
            }
        });
    }

    logout() {
        base.unauth();
        let session = this.state.loggedIn;
        session = false;
        localStorage.removeItem('loggedIn');
        this.setState({ loggedIn: session });
    }

    filterEvents(type) {
        this.filterType = type;
        let e = Object.keys(this.state.events)
        .map(key => {
            return <EventComponent key={key} 
            pk={key} 
            eventInfo={this.state.events[key]} />
        })
        .filter(event => {
            if(type === 'current') {
                return new Date(event.props.eventInfo.eventDate) >= Date.now();
            } else {
                return new Date(event.props.eventInfo.eventDate) < Date.now();
            }
        })
        .sort((e1, e2) => e1.props.eventInfo.eventDate < e2.props.eventInfo.eventDate ? 1 : -1);
        
        this.setState({
            displayEvents: e
        }, () => {
            console.log('filter events setstate callback', this.state);
        });
    }

    render() {        
        return (
                <BrowserRouter>
                    <div className="App">
                        
                        <Match exactly pattern="/" render={(props) => {
                            if(!this.state.loggedIn) { 
                                return (
                                    <Login login={this.login} />
                                ) 
                            }

                            return (
                                <div className="outer-wrapper">
                                    <Header loggedIn={this.state.loggedIn} logout={this.logout} />
                                    <div className="App">
                                        <div className="events-main--wrapper">
                                            <div className="events-main--sidebar">
                                                <div className="events-sidebar--topmenu">
                                                    <span onClick={() => this.filterEvents('current')}>Upcoming</span>  --  
                                                    <span onClick={() => this.filterEvents('past')}>Past</span>
                                                </div>
                                                <MenuItems title={this.filterType} events={this.state.displayEvents} />
                                                <h3>Add New Event</h3>
                                                <AddEventForm addNewEvent={this.addNewEvent} />
                                            </div>
                                            <div className="events-main--full">
                                                <HomePlaceholder />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )} 
                        }/>
                        <Match exactly pattern="/:eventId" render={(props) => {
                            if(!this.state.loggedIn) { 
                                return (
                                    <Login login={this.login} />
                                ) 
                            }

                            return (
                                <div className="outer-wrapper">
                                    <Header loggedIn={this.state.loggedIn} logout={this.logout} />
                                    <div className="App">
                                        <div className="events-main--wrapper">
                                            <div className="events-main--sidebar">
                                                <div className="events-sidebar--topmenu">
                                                    <span onClick={() => this.filterEvents('current')}>Upcoming</span> -- 
                                                    <span onClick={() => this.filterEvents('past')}>Past</span>
                                                </div>
                                                <MenuItems title="test" events={this.state.displayEvents} />
                                                <h3>Add New Event</h3>
                                                <AddEventForm addNewEvent={this.addNewEvent} />
                                            </div>
                                            <div className="events-main--full">
                                                <EventDetails eventDetails={this.state.displayEvents.filter(e => {
                                                    return e.props.pk === props.params.eventId;
                                                }).map(e => {
                                                    return e.props.eventInfo;
                                                })[0]} addNewPost={this.addNewPost} deleteEvent={this.deleteEvent} editEvent={this.editEvent} deletePost={this.deletePost} {...props} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        }/>
                        <Miss component={NotFound} />
                    </div>
                </BrowserRouter>
        )
    }
}