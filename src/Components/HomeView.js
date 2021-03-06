import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

export default class HomeView extends Component {
    constructor() {
        super();
        this.activeSlide = 0;
    }

    componentDidMount() {
        this.props.filterEvents('all');
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
                        onSelectEvent={(evt) => {
                            evt.start < new Date() ? this.props.filterEvents('past') : this.props.filterEvents('current');
                            this.context.router.transitionTo(`events/${evt.eventId}`);
                        }}
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

HomeView.contextTypes = {
    router: React.PropTypes.object.isRequired
};