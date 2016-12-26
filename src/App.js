import React, { Component } from 'react';
import './App.css';
import base from './base';

import EventComponent from './Components/EventComponent';
import AddEventForm from './Components/AddEventForm';
// import ConfirmModal from './Components/ConfirmModal';

class App extends Component {
  constructor() {
    super();

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

  confirmModal(msg) {
    return false;
  }

  //manage events (general info)
  addNewEvent(event) {
    const events = {...this.state.events};
    const timestamp = Date.now();

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

  //manage event posts (to be passed to EventDetails component)
  addNewPost(post, eventId) {
    console.log('adding post:', eventId, post);
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
          deleteEvent={this.deleteEvent} />
    });

    return (
      <div className="App">
        <div className="App-header">
          <h2>Oberlin Horizons - Events</h2>
        </div>
        <div className="events-main--wrapper">
          <h2>Upcoming Events</h2>
          <table>
            <tbody>
            <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Details</th>
                <th colSpan="3">Action</th>
            </tr>
              {events}
            </tbody>
          </table>
          <h2>Add New Event</h2>
          <AddEventForm addNewEvent={this.addNewEvent} />
        </div>
      </div>
    );
  }
}

export default App;
