import React, { Component } from 'react';
import { BrowserRouter, Match, Miss, Link } from 'react-router';
import EventDetails from './Components/EventDetails';
import NotFound from './Components/NotFound';
import HomeView from './Components/HomeView';

import './App.css';
import base from './base';
import moment from 'moment';

import Login from './Components/Login';
import MenuItems from './Components/MenuItems';
import EventComponent from './Components/EventComponent';
import AddEventForm from './Components/AddEventForm';
import Header from './Components/Header';
//import ConfirmModal from './Components/ConfirmModal';

export default class Root extends Component {
    constructor() {
        super();

        this.headerHeight = 0;
        this.filterType = 'all';
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
        this.setHeader = this.setHeader.bind(this);

        this.state = {
            events: {},
            displayEvents: [],
            activeUsers: {},
            loggedIn: localStorage.getItem('loggedIn') || false
        };
    }

    setHeader() {
        const header = document.querySelector('#header');
        if(header) {
            this.headerHeight = header.clientHeight;
            console.log('should now fix padding...', this.headerHeight);
        }
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        console.log('route component did mount');
        this.setHeader();

        if(this.state.loggedIn) {
            console.log('you are logged in!');
            this.ref = base.syncState(`allEvents`, {
                context: this,
                state: 'events'
            });

            base.listenTo('allEvents', {
                context: this,
                asArray: true,
                then: () => {
                    console.log('this is after listen to:', this.state.displayEvents);
                    this.filterEvents(this.filterType);
                }
            });
            
            base.auth().onAuthStateChanged(function(user) {
                console.log('auth state changed!');
                if (user) {
                    // User is signed in.
                    console.log('got user info:', user.email);
                } else {
                    // No user is signed in.
                }
            });
        }
    }

    //manage events (general info)
    addNewEvent(event) {
        const events = {...this.state.events};
        const timestamp = Date.now();
        event.eventId = `evt${timestamp}`;
        events[`evt${timestamp}`] = event;

        base.push(`allEvents/evt${timestamp}`, {
            data: event
        }).then(() => {
            this.setState( { events });
        })
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
            console.log('deleting:', events[id]);
            delete events[id];
            base.remove(`allEvents/${id}`)
                .then(() => {
                    console.log('deleted event at:', id);
                    this.setState({ events });
                    console.log(this.state.events);
                });
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
        //this.showModal();
        let confirm = true; //window.confirm('Delete this post?');
        if(confirm) {
            const events = {...this.state.events};
            delete events[eventId]['posts'][postId];
            base.remove(`allEvents/${eventId}/posts/${postId}`)
                .then(() => {
                this.setState({ events });
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
                this.ref = base.syncState(`allEvents`, {
                    context: this,
                    state: 'events'
                });

                this.setHeader();

                base.listenTo('allEvents', {
                    context: this,
                    asArray: true,
                    then: () => {
                        console.log('this is after listen to:', this.state.displayEvents);
                        this.filterEvents(this.filterType);
                    }
                });
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

    filterEvents(type, setInitial=false) {
        console.log('inside filter, location is:', window.location);
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
            } else if(type === 'past') {
                return new Date(event.props.eventInfo.eventDate) < Date.now();
            } else {
                return event;
            }
        })
        .sort((e1, e2) => e1.props.eventInfo.eventDate < e2.props.eventInfo.eventDate ? 1 : -1);
        
        this.setState({ displayEvents: e });
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
                                            <div className="events-main--sidebar" style={{paddingTop: this.headerHeight * 1.5 + 'px'}}>
                                                <div className="events-sidebar--topmenu">
                                                    <div className={this.filterType === 'current' ? 'link-active link-nostyle' : 'link-nostyle'} onClick={() => this.filterEvents('current')}>Current</div>
                                                    <div className={this.filterType === 'past' ? 'link-active link-nostyle' : 'link-nostyle'} onClick={() => this.filterEvents('past', true)}>Past</div>
                                                    <div className={this.filterType === 'all' ? 'link-active link-nostyle' : 'link-nostyle'} onClick={() => this.filterEvents('all')}>All</div>
                                                </div>
                                                <MenuItems title={this.filterType} events={this.state.displayEvents} />
                                                <Link className="addnew-link" to={'/addnewevent'}>Add New Event</Link>
                                            </div>
                                            <div className="events-main--full" style={{paddingTop: this.headerHeight + 'px'}}>
                                                <HomeView 
                                                    events={Object.keys(this.state.events).map(event => {
                                                        const convertEvent = this.state.events[event];
                                                        const start = moment(convertEvent.eventDate);
                                                        const end = start.clone().add(1, 'day'); 
                                                        return {
                                                            title: convertEvent.title,
                                                            desc: convertEvent.details,
                                                            eventId: convertEvent.eventId,
                                                            start: start._d,
                                                            end: end._d,
                                                            allDay: true
                                                        };
                                                    })} filterEvents={this.filterEvents}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )} 
                        }/>
                        <Match exactly pattern="/events/:eventId" render={(props) => {
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
                                            <div className="events-main--sidebar" style={{paddingTop: this.headerHeight * 1.5 + 'px'}}>
                                                <div className="events-sidebar--topmenu">
                                                    <div className={this.filterType === 'current' ? 'link-active link-nostyle' : 'link-nostyle'} onClick={() => this.filterEvents('current')}>Current</div>
                                                    <div className={this.filterType === 'past' ? 'link-active link-nostyle' : 'link-nostyle'} onClick={() => this.filterEvents('past')}>Past</div>
                                                    <div className={this.filterType === 'all' ? 'link-active link-nostyle' : 'link-nostyle'} onClick={() => this.filterEvents('all')}>All</div>
                                                </div>
                                                <MenuItems title={this.filterType} events={this.state.displayEvents} />
                                                <Link className="addnew-link" to={'/addnewevent'}>Add New Event</Link>
                                            </div>
                                            <div className="events-main--full" style={{paddingTop: this.headerHeight + 'px'}}>
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

                        <Match exactly pattern="/addnewevent" render={(props) => {
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
                                            <div className="events-main--sidebar" style={{paddingTop: this.headerHeight * 1.5 + 'px'}}>
                                                <div className="events-sidebar--topmenu">
                                                    <div className={this.filterType === 'current' ? 'link-active link-nostyle' : 'link-nostyle'} onClick={() => this.filterEvents('current')}>Current</div>
                                                    <div className={this.filterType === 'past' ? 'link-active link-nostyle' : 'link-nostyle'} onClick={() => this.filterEvents('past')}>Past</div>
                                                    <div className={this.filterType === 'all' ? 'link-active link-nostyle' : 'link-nostyle'} onClick={() => this.filterEvents('all')}>All</div>
                                                </div>
                                                <MenuItems title={this.filterType} events={this.state.displayEvents} />
                                            </div>
                                            <div className="events-main--full" style={{paddingTop: this.headerHeight + 'px'}}>
                                                <AddEventForm addNewEvent={this.addNewEvent} />
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

// Root.propTypes = {

// }
// Root.contextTypes = {
//     router: React.PropTypes.func.isRequired
// };