import React, { Component } from 'react';

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
        
      </div>
    );
  }
}
