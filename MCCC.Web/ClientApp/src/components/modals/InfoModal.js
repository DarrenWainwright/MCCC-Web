import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const InfoModal = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="link" onClick={toggle}>{buttonLabel}</Button>           
            <Modal isOpen={modal} fade={true} toggle={toggle}  modalClassName={className}>
                <ModalHeader toggle={toggle}>What this is</ModalHeader>
                <ModalBody>
                    <p>The Mother Cluckers Coop Control</p>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default InfoModal;