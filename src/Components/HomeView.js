import React, { Component } from 'react';
import logo from '../img/logoSm.png';

export default class HomeView extends Component {
    constructor() {
        super();
        this.activeSlide = 0;
    }

    componentDidMount() {
        this.activeSlide = 0;
        const messages = document.querySelectorAll('.home-messages div');
        const totalSlides = messages.length;
        const homeSlider = () => {
            this.activeSlide = this.activeSlide < totalSlides - 1 ? this.activeSlide + 1 : 0;
            this.forceUpdate();
            this.timerHandler = setTimeout(homeSlider, 4000);
        }
        setTimeout(homeSlider, 4000);
    }

    componentWillUnmount() {
        clearTimeout(this.timerHandler);
        this.activeSlide = 0;
    }

    render() {
        return (
            <div className="home-wrapper">
                <div className="home-messages">
                    <div className={this.activeSlide === 0 ? 'activeSlide' : 'hiddenSlide'}>Choose an event...</div>
                    <div className={this.activeSlide === 1 ? 'activeSlide' : 'hiddenSlide'}>Create an event...</div>
                    <div className={this.activeSlide === 2 ? 'activeSlide' : 'hiddenSlide'}>Hang with your bros...</div>
                    <div className={this.activeSlide === 3 ? 'activeSlide' : 'hiddenSlide'}>Reach the Horizon!</div>
                </div>
                <div className="home-text">
                    <img src={logo} alt="Oberlin Horizons" /><br />
                    Oberlin Horizons
                </div>
            </div>
        )
    }
}