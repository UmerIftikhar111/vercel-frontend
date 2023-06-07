import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ReturnLostItemsModal = ({ show, onClose, onConfirm }) => {
  const [returnDescription, setReturnDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setReturnDescription('');
    setErrorMessage('');
    onClose();
  };

  const handleConfirm = async () => {
    try {
      // Perform the necessary validation or data processing here

      if (returnDescription && !returnDescription==="") {
      // Call the onConfirm callback with the return description
      onConfirm(returnDescription);
      
      // Reset the form and close the modal
      setReturnDescription('');
      setErrorMessage('');
      onClose();
      }else
      alert("Error")
    } catch (error) {
      console.error(error);
      setErrorMessage('Error: Failed to return the lost item');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Return Lost Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Modal content goes here */}
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
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReturnLostItemsModal;
