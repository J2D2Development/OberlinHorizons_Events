import React, { Component } from 'react';

export default class ConfirmModal extends Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props);
        return(
            <div className="modal-bg">
                <div className="modal-main-wrapper">
                    <h3>{this.props.msg}</h3>
                    <button onClick={this.props.callback}>Ok</button>
                    <button onClick={this.props.closeModal}>Cancel</button>
                </div>
            </div>
        )
    }
}