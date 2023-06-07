import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const MessageModal = ({ message, room, setUpdateStatus }) => {
    const [showModal, setShowModal] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');


    const handleClose = () => {
        setShowModal(false);
        setErrorMessage('');
        setUpdateStatus('')
    };

    return (
        <>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>SUCCESS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>{message}</h3>
                    <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        disabled
                            as="textarea"
                            rows={3}
                            value={`Room No. ${room.roomNumber}\nRoom Type: ${room.type}\nRoom Price: ${room.price}\nRoom Amenities : ${room.amenities}`}
                        />
                    </Form.Group>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
};

export default MessageModal;