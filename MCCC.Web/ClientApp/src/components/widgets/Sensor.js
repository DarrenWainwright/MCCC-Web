import React, { useState } from 'react';
import { WiHumidity, WiCelsius, WiFahrenheit } from 'react-icons/wi';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// accepts the sensor data pulled from the GetSensors az function
const Sensor = (props) => {
    const {
        sensor,
        name

    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (<div>
        sensor {name} <WiCelsius /> <WiFahrenheit /> <WiHumidity />
            </div>);

}

export default Sensor;