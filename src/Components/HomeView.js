import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

// const MyCalendar = props => (
//   <div>
    
//   </div>
// );

export default class HomeView extends Component {
    constructor() {
        super();
        this.activeSlide = 0;
        //this.myEvents = [];
    }

    componentDidMount() {
        // console.log('home:', this.props);
        // if(this.props && this.props.events.length > 0) {
        //     this.myEvents = this.props.events;
        //     console.log('events loaded:', this.myEvents);
        // }
        this.activeSlide = 0;
        const messages = document.querySelectorAll('.home-messages div');
        const totalSlides = messages.length;
        const homeSlider = () => {
            if(this.activeSlide < totalSlides - 1) {
                this.activeSlide += 1;
                this.timerHandler = setTimeout(homeSlider, 4000);
            } else {
                clearTimeout(this.timerHandler);
                this.timerHandler = null;
            }
            this.forceUpdate();
            
        }
        this.initTimer = setTimeout(homeSlider, 4000);
    }

    componentWillUnmount() {
        if(this.timerHandler) {
            clearTimeout(this.timerHandler);
            this.timerHandler = null;
        }
        if(this.initTimer) {
            clearTimeout(this.initTimer);
            this.initTimer = null;
        }
        this.activeSlide = 0;
    }

    render() {
        return (
            <div className="home-wrapper">
                <div className="home-calendar">
                    <BigCalendar
                        {...this.props}
                        events={this.props.events}
                        startAccessor='start'
                        endAccessor='end'
                    />
                </div>
                <div className="home-messages">
                    <div className={this.activeSlide === 0 ? 'activeSlide' : 'hiddenSlide'}>Choose an event...</div>
                    <div className={this.activeSlide === 1 ? 'activeSlide' : 'hiddenSlide'}>Create an event...</div>
                    <div className={this.activeSlide === 2 ? 'activeSlide' : 'hiddenSlide'}>Hang with your bros...</div>
                    <div className={this.activeSlide === 3 ? 'activeSlide' : 'hiddenSlide'}>Reach the Horizon!</div>
                    <div className={this.activeSlide === 4 ? 'activeSlide' : 'hiddenSlide'}>Oberlin Horizons</div>
                </div>
            </div>
        )
    }
}