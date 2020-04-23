import { combineReducers } from 'redux';
import { REQUEST_SENSORS, RECEIVE_SENSORS_SUCCESS, RECEIVE_SENSORS_FAILED } from '../actions/allSensors'


const sensorsReducer = (state = { isFetching: false, items: [] }, action) => {

    switch (action.type) {
        case REQUEST_SENSORS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_SENSORS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.sensors,
                lastUpdated: action.receivedAt
            }
        case RECEIVE_SENSORS_FAILED:
            return {
                ...state,
                isFetching: false,
                reason : action.reason
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    sensorsReducer
})

export default rootReducer