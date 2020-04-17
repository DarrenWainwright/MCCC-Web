import React, { Component } from 'react';
import Sensor from '../widgets/Sensor';

export class Home extends Component {
   static displayName = Home.name;

    // get all
    // loop and create each sensor
    // signalR to keep this list up to date
    // each sensor can fetch its own sensordata

    sensorData = [
        { id: '123456-1234-1234-123456', name: 'Coop indoor', type: 'DHT22', heartbeatInterval: 10, lastConnected: '2020-04-17 16:50:22' },
        { id: '123456-1234-1234-654321', name: 'Coop outdoor', type: 'DHT22', heartbeatInterval: 10, lastConnected: '2020-02-13 11:12:22' }
    ]
   

  render () {
    return (
      <div>
        <h3>Dashboard</h3>        
            <ul className={'list-inline','sensor-list'}>
                {this.sensorData.map(sensor => <li key={sensor.id} className={'list-inline-item'}><Sensor sensorData={sensor} /></li>)}
            </ul>
      </div>
    );
  }
}
