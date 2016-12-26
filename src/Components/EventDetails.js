import React, { Component } from 'react';
import { Link } from 'react-router'
import base from '../base';

export default class EventDetails extends Component {
    constructor() {
        super();
    }

    componentWillMount(){
        base.bindToState('allEvents', {
            context: this,
            state: 'allEvents',
            queries: {
                orderByChild: 'link',
                equalTo: this.props.params.eventId
            },
            asArray: true
        });
    }

    render() {
        let details;
        if(this.state) {
            details = this.state.allEvents[0];
        }
        
        
        return(
            <div>
                <h1>{details && details.title} Details!</h1>
                <p>{details && details.details}</p>
                <Link to={'/'}>Back</Link>
            </div>
        )
    }
}