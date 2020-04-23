import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SensorWidget from './SensorWidget'
import { connect } from 'react-redux';
import { fetchSensorsIfNeeded } from '../actions/allSensors'

class Home extends Component {

    static propTypes = {
        sensors: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        console.log('DID MOUNT')
        const { dispatch } = this.props;
        dispatch(fetchSensorsIfNeeded());
    }

    render() {

        const { sensors, isFetching, lastUpdated } = this.props

        const isEmpty = sensors.length === 0

        console.log(this.props)
        console.log(sensors)

        return (
            <div>
                <h3>Dashboard</h3>
                <h6>Last updated: {new Date(lastUpdated).toLocaleTimeString()}</h6>

                {isEmpty
                    ? (isFetching ? <h1>Fetching sensors. One moment</h1> : <h1>Empty.</h1>)
                    : <ul className={'list-inline', 'sensor-list'}>
                        {sensors.map(sensor => <li key={sensor.id} className={'list-inline-item'}><SensorWidget data={sensor} /></li>)}
                      </ul>
                } 
                {isEmpty
                    ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    : <ul className={'list-inline', 'sensor-list'}>
                        {sensors.map(sensor => <li key={sensor.id} className={'list-inline-item'}><SensorWidget data={sensor} /></li>)}
                      </ul>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { sensorsReducer } = state
    const {
        isFetching,
        lastUpdated,
        items: sensors
    } = sensorsReducer || {
        isFetching: true,
        items: []
    }

    return {
        sensorsReducer,
        sensors,
        isFetching,
        lastUpdated
    }
}
//export default Home
export default connect(mapStateToProps)(Home)
