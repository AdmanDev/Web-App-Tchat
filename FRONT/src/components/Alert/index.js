import './alert.css';
import React, { Component } from 'react';
import { MdError } from 'react-icons/md';
import { BiInfoCircle } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';

export const alertType = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error'
};

export const alertRef = React.createRef();

const iconSize = 40;

export class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            message: '',
            alertType: alertType.INFO,
        };
    }

    showAlert(message, alertType, duration = 4000) {
        if (this.state.show) {
            return
        }

        this.setState({
            show: true,
            message,
            alertType
        }, () => {
            setTimeout(() => this.setState({
                show: false
            }), duration)
        });
    }

    getIcon() {
        switch (this.state.alertType) {
            case alertType.ERROR:
                return <MdError size={iconSize} color='red' />

            case alertType.INFO:
                return <BiInfoCircle size={iconSize} color='#03b1fc' />

            case alertType.SUCCESS:
                return <FaCheckCircle size={iconSize} color='green' />

            default:
                return <></>
        }
    }

    render() {
        const visibleClass = this.state.show ? 'alert_visible' : 'alert_hidden';

        return (
            <div className={`alert_container ${visibleClass}`}>
                {this.getIcon()}
                <p>{this.state.message}</p>
            </div>
        );
    }
}

export default Alert;