import React from 'react';
import { Modal, Table } from 'react-bootstrap';

const DisplayOrdersModal = ({ show, onHide, orders }) => {
  
    const fetchSpecificItem = async (itemId) => {
        try {
          const response = await fetch(`http://localhost:3001/inventory/get-specific-item?id=${itemId}`);
          const data = await response.json();
          alert(" Item Name : "+data.name+ " | Description : "+data.description);
        } catch (error) {
          console.error('Error fetching specific item:', error);
        }
      };
    
  
    return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Orders</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td onClick={() => fetchSpecificItem(order.itemId)}>{order.itemId}</td>
                <td>{order.quantity}</td>
                <td>${order.totalPrice}</td>
                <td>{order.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default DisplayOrdersModal;
