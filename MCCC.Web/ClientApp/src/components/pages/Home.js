import React, { Component } from 'react';
import Sensor from '../widgets/Sensor';

export class Home extends Component {
    static displayName = Home.name;

    // get all
    // loop and create each sensor
    // signalR to keep this list up to date
    // each sensor can fetch its own sensordata
   

  render () {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your new single-page application, built with:</p>
            <ul>
                <li><Sensor name={'sensor 1'} /></li>
                <li><Sensor name={'sensor 2'} /></li>
            </ul>
      </div>
    );
  }
}
