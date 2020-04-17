import React, { Component, useState } from 'react';
import { WiHumidity, WiCelsius, WiFahrenheit, WiThermometer } from 'react-icons/wi';
import { FaTemperatureHigh } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Sensor.css';

export default class Sensor extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.sensorData = props.sensorData;
    }

    centerIcon() {
        switch (this.sensorData.type) {
            case 'DHT22':
                return <WiThermometer fontSize={'7.5em'} />;
                break;
            default:
                return <span>x</span>;
        }
    }

    sensorIsActive() {

        return 'active';
    }
       
   
    render() {       
        return (
            <div className={'sensor'}>
                <div className={this.sensorIsActive()} >
                    <div className={'icon'}>{this.centerIcon()}</div>
                    <ul className={'detail list-inline'}>
                        <li className={'list-inline-item'}><WiCelsius className={'detail-icon'} /><br />23</li>
                        <li className={'list-inline-item'}><WiFahrenheit className={'detail-icon'} /><br />49</li>
                        <li className={'list-inline-item'}><WiHumidity className={'detail-icon'} /><br />23</li>
                    </ul>
                </div>
                <h6>{this.sensorData.name}</h6>
                <span>{this.sensorData.lastConnected}</span>
            </div>
        );
    }

}