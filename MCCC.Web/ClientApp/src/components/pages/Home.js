import React, { Component } from 'react';
import Sensor from '../widgets/Sensor';

export class Home extends Component {
    static displayName = Home.name;

    // get all
    // loop and create each sensor
    // signalR to keep this list up to date
    // each sensor can fetch its own sensordata and own heartbeat    

    constructor(props) {
        super(props);

        this.state = { sensorList: [], loading: true };
    }

    componentDidMount() {
        this.populateSensors();
    }


    render() {
        return (
            <div>
                <h3>Dashboard</h3>
                <ul className={'list-inline', 'sensor-list'}>
                    {this.state.sensorList.map(sensor => <li key={sensor.id} className={'list-inline-item'}><Sensor sensorData={sensor} /></li>)}
                </ul>
            </div>
        );
    }

    async populateSensors() {
        console.log('fetching sensors');
        const response = await fetch('http://localhost:7071/api/GetSensors');
        const data = await response.json();
        this.setState({ sensorList: data, loading: false });
    }
}