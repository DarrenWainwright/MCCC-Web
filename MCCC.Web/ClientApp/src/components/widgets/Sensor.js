import React, { Component, useState } from 'react';
import { WiHumidity, WiCelsius, WiFahrenheit, WiThermometer } from 'react-icons/wi';
import { FaTemperatureHigh } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Sensor.css';

export default class Sensor extends Component {

   

    constructor(props) {
        super(props);
        console.log(props);
        this.sensor = props.data;
    }

    centerIcon() {
        switch (this.sensor.type) {
            case 'DHT22':
                return <WiThermometer fontSize={'7.5em'} />;
                break;
            default:
                return <span>x</span>;
        }
    }

    // buffer in seconds, to account for any latency
    buffer = 5;

    isSensorActive() {
        var lc = new Date(this.sensor.lastConnected);
        lc.setSeconds(lc.getSeconds() + this.sensor.heartbeatInterval);  
        var c = new Date();
        c.setSeconds(c.getSeconds() + this.buffer);
        return ((c - lc) / 100 < 0);
    }



    render() {
        return (
            <div className={'sensor'}>
                <div className={(this.isSensorActive() ? 'active' : '')} >
                    <div className={'icon'}>{this.centerIcon()}</div>
                    <ul className={'detail list-inline'}>
                        <li className={'list-inline-item'}><WiCelsius className={'detail-icon'} /><br />23</li>
                        <li className={'list-inline-item'}><WiFahrenheit className={'detail-icon'} /><br />49</li>
                        <li className={'list-inline-item'}><WiHumidity className={'detail-icon'} /><br />23</li>
                    </ul>
                </div>
                <h6>{this.sensor.name}</h6>
            </div>
        );
    }

}