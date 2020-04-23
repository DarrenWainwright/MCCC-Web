import $ from 'jquery';
import { heartbeatReceived } from '../actions';
window.jQuery = $;
require('signalr');

const signalRConnection = $.hubConnection('http://localhost:7071/api');

export function signalRInstane(store) {
    signalRConnection.start()
        .done(function () {
            console.log('Now connected, connection ID=' + signalRConnection.id);
        })
        .fail(function () {
            console.log('Could not connect');
            window.alert('Unable to start signalR connection...')

        });

    // getting the hub proxy
    var notificationHubProxy = signalRConnection.createHubProxy('signalRNotificationHub');

    // attaching events listeners to the proxy
    //notificationHubProxy.on('locationModified', function (vehicleId, location) {
    //    store.dispatch({
    //        type: 'LOCATION_MODIFIED',
    //        payload: {
    //            vehicleId: vehicleId,
    //            location: location
    //        }
    //    });
    //});
    notificationHubProxy.on('sensorHeartbeatReceived', function (sensorId, sensor) {
        store.dispatch(heartbeatReceived(sensorId,sensor));
    )};




    //SENSOR_HEARTBEAT_RECEIVED
}