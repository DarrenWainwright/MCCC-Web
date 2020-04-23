
/* Action Types for SensorList */
export const REQUEST_SENSORS = 'REQUEST_SENSORS'
export const RECEIVE_SENSORS_SUCCESS = 'RECEIVE_SENSORS_SUCCESS'
export const RECEIVE_SENSORS_FAILED = 'RECEIVE_SENSORS_FAILED'


export const requestSensors = ({
    type: REQUEST_SENSORS
});

export const receiveSensorsSuccess = json => ({
    type: RECEIVE_SENSORS_SUCCESS,
    sensors: json.data.children.map(child => child.data),
    receivedAt: Date.now()
});

export const receiveSensorsFailed = reason => ({
    type: RECEIVE_SENSORS_FAILED,
    reason
});

/* Actions for Sensor list */

export const fetchSensors = dispatch => {
    dispatch(requestSensors());
    return fetch('http://localhost:7071/api/GetSensors')
        .then(response => response.json())
        .then(json => dispatch(receiveSensorsSuccess(json)))
        .catch(error => dispatch(receiveSensorsFailed(error)));
}

const shouldFetchSensors = (state) => {
    const sensors = state.sensors
    if (!sensors)
        return true

    if (sensors.isFetching)
        return false;

    return true;
}

export const fetchSensorsIfNeeded = (dispatch, getState) => {
    console.log(getState)
    if (shouldFetchSensors(getState()))
        return dispatch(fetchSensors());
}