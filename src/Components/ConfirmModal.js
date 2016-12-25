import React, { Component } from 'react';

export default class ConfirmModal extends Component {
    constructor() {
        super();
    }

    closeModal() {
        console.log('close now');
    }

    render() {
        return(
            <div className="modal-bg">
                <div className="modal-main-wrapper">
                    <h3>{this.props.msg}</h3>
                    <button>Ok</button>
                    <button onClick={this.closeModal}>Cancel</button>
                </div>
            </div>
        )
    }
}