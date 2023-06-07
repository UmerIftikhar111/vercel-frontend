import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const LostItemCard = ({ lostItem, onRemoveItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [returnDescription, setReturnDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleReturn = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setReturnDescription('');
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://vercel-backend-gilt.vercel.app/lostAndfound/return-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: lostItem._id, returnDescription }),
      });

      if (response.ok) {
        alert('Item has returned successfuly')
        setShowModal(false);
        setReturnDescription('');
        setErrorMessage('');
        onRemoveItem(lostItem._id);
        
      } else {
        throw new Error('Failed to return the lost item');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error: Failed to return the lost item');
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{lostItem.name}</Card.Title>
          <Card.Text>{lostItem.description}</Card.Text>
          <Card.Text>{lostItem.location}</Card.Text>
          <Button variant="primary" onClick={handleReturn}>
            Return
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Return Lost Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Lost Item ID: {lostItem._id}</p>
          <Form.Group controlId="returnDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={returnDescription}
              onChange={(e) => setReturnDescription(e.target.value)}
            />
          </Form.Group>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LostItemCard;