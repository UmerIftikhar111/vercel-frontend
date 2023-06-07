import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddItemToInventoryModal = ({ categories, show, onClose, onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = () => {

    if (!itemName==="" && !itemCategory==="" && !quantity==="") {
      const newItem = {
        name: itemName,
        category: itemCategory,
        description,
        quantity,
        price,
      };

      onAddItem(newItem);
      handleClose();

    } else
      alert("Error")

  };

  const handleClose = () => {
    setItemName('');
    setItemCategory('');
    setDescription('');
    setQuantity('');
    setPrice('');
    onClose();
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item to Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="itemName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="itemCategory">
          <Form.Label>Item Category</Form.Label>
          <Form.Select
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
          >

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddItem}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemToInventoryModal;
