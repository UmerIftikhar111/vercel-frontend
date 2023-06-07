import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddLostItemsModal = ({ show, onClose, onAdd }) => {
 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleAddItem = () => {
    
    if(true)
      onAdd(name, description, location);
    else
      alert("Error")
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Lost Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={handleNameChange} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" value={description} onChange={handleDescriptionChange} />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" value={location} onChange={handleLocationChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddItem}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLostItemsModal;
