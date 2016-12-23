import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import EventComponent from './Components/EventComponent';

//placeholder: to be moved to firebase
const testEvents = [
  {id: 1, title: 'Beergeschmeght Dec 2016', details: 'Beers were drank drunk', link: 'beers-2016'},
  {id: 2, title: 'Dipcember 2016', details: 'I should have won for sure!', link: 'dipcember-2016'},
  {id: 3, title: 'Circlejerk 2069', details: 'Hopefully not', link: 'circlejerk-2069'}
];

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const events = testEvents.map(event => {
      return <EventComponent key={event.id} pk={event.id} title={event.title} details={event.details} link={event.link} />
    });

    return (
      <div className="App">
        <nav>
          <ul>
            <li>Home</li>
          </ul>
        </nav>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Oberlin Horizons - Events</h2>
        </div>
        <div className="App-intro">
          {events}
        </div>
      </div>
    );
  }
}

export default App;
