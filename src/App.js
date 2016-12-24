import React, { Component } from 'react';
import './App.css';

import EventComponent from './Components/EventComponent';

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
    this.setState({ events: testEvents });
  }


  //manage events (general info)
  addNewEvent(event) {
    console.log('adding event:', event);
  }

  editEvent(id) {
    console.log('edit event:', id);
  }

  deleteEvent(id) {
    console.log('del event:', id);
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
        console.log(key);
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
        <button onClick={() => this.addNewEvent('hello')}>Add Event</button>
      </div>
    );
  }
}

export default App;
