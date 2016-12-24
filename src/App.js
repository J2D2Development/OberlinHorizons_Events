import React, { Component } from 'react';
import './App.css';
import base from './base';

import EventComponent from './Components/EventComponent';
import AddEventForm from './Components/AddEventForm';

//placeholder: to be moved to firebase
const testEvents = {
  evt1: {
    id: 1, title: 'Beergeschmeght Dec 2016', details: 'Beers were drank drunk', link: 'beers-2016',
    posts: {
      post1: {id: 1},
      post2: {id: 2},
      post3: {id: 3}
    }
  },
  evt2: {
    id: 2, title: 'Dipcember 2016', details: 'I should have won for sure!', link: 'dipcember-2016',
    posts: {
      post1: {id: 1},
      post2: {id: 2},
      post3: {id: 3}
    }
  },
  evt3: {
    id: 3, title: 'Circlejerk 2069', details: 'Hopefully not', link: 'circlejerk-2069',
    posts: {
      post1: {id: 1},
      post2: {id: 2},
      post3: {id: 3}
    }
  }
};

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
    let confirm = window.confirm('Are you sure?'); //bootleg- make this better!
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
          title={this.state.events[key].title} 
          details={this.state.events[key].details} 
          link={this.state.events[key].link}
          editEvent={this.editEvent}
          deleteEvent={this.deleteEvent} />
    });

    return (
      <div className="App">
        <div className="App-header">
          <h2>Oberlin Horizons - Events</h2>
        </div>
        <div className="App-intro">
          {events}
        </div>
        <AddEventForm addNewEvent={this.addNewEvent} />
      </div>
    );
  }
}

export default App;
