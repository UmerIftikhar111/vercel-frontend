import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const BookCleaningSchedule = ({ show, onClose, onConfirm, roomNumbers }) => {
  const [roomNumber, setRoomNumber] = useState('');
  const [date, setDate] = useState('');
 
  const handleConfirm = () => {
    if (!roomNumber=="" && !date=="") {
     
    const dateTime = new Date(`${date}`);
    const formattedDate = dateTime.toISOString();

    onConfirm(roomNumber, formattedDate);
      setRoomNumber('');
      setDate('');
     
    }else
      alert("Error")
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Cleaning Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group controlId="roomNumber">
          <Form.Label>Room Number</Form.Label>
          <Form.Control as="select" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)}>
          {roomNumbers.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookCleaningSchedule;
