import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit, faShoppingCart, faEye } from '@fortawesome/free-solid-svg-icons';
import AddItemToInventoryModal from '../Modals/AddItemToInventoryModal'
import DisplayOrdersModal from '../Modals/DisplayOrdersModal'

const InventoryDashboard = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [orders, setOrders] = useState([]);


  const categories = ['Room Utility', 'Kitchen Utility', 'General Utility'];

  const fetchInventoryItems = async () => {
    try {
      const response = await fetch('https://vercel-backend-gilt.vercel.app/inventory/get-inventory');
      const data = await response.json();
      setInventoryItems(data);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterBy(e.target.value);
  };

  const filteredItems = inventoryItems.filter((item) => {
    if (filterBy === 'name') {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filterBy === 'category') {
      return item.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch('https://vercel-backend-gilt.vercel.app/inventory/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        fetchInventoryItems();
      } else {
        throw new Error('Failed to add item to inventory');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = (itemId) => {
    fetch(`https://vercel-backend-gilt.vercel.app/inventory/remove-item?id=${itemId}`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          alert('Item deleted successfully');
          fetchInventoryItems()
        } else {
          throw new Error('Failed to delete the item');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to delete the item');
      });
    }

    const handleEditItem = (itemId) => {
        const newQty = prompt('Enter the new quantity:');
        if (newQty !== null) {
          fetch('https://vercel-backend-gilt.vercel.app/inventory/update-item', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: itemId,
              qty: newQty,
            }),
          })
            .then((response) => {
              if (response.ok) {
                alert('Item quantity updated successfully');
                fetchInventoryItems()
            } else {
                throw new Error('Failed to update item quantity');
              }
            })
            .catch((error) => {
              console.error(error);
              alert('Failed to update item quantity');
            });
        }
      };

      const handleOrderItem = (itemId) => {
        const qty = prompt('Enter the quantity:');
        if (qty !== null) {
          fetch('https://vercel-backend-gilt.vercel.app/inventory/place-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              itemId: itemId,
              quantity: qty,
            }),
          })
            .then((response) => {
              if (response.status === 200) {
                alert('Order is successfull');
                fetchInventoryItems()
            } else if(response.status === 500){
               alert("This item didnt have required quantity, however available quantity has been ordered. Please refill the inventory");
               fetchInventoryItems()
            }else{
                throw new Error('Failed to place order');
              }
            })
            .catch((error) => {
              console.error(error);
              alert('Failed to place order');
            });
        }
      };

      const handleFetchOrders = async () => {
        try {
          const response = await fetch('https://vercel-backend-gilt.vercel.app/inventory/get-orders');
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

  return (
    <Container>
      <h1>Inventory Dashboard</h1>

      <Row>
        <Col md={3}>
        <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>Total Items</Card.Title>
              <Card.Text>{inventoryItems.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
        <Card bg="primary" text="white" onClick={()=>{alert("Categories: [ Room Utility - Kitchen Utility - General Utility ]")}}>
            <Card.Body >
              <Card.Title>Total Categories</Card.Title>
              {/* <Card.Text>{new Set(inventoryItems.map((item) => item.category)).size}</Card.Text> */}
              <Card.Text> {categories.length} </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
        <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>Out of Stock</Card.Title>
              <Card.Text>{inventoryItems.filter((item) => item.quantity === 0).length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
        <br/> <br/>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Search by Name or Category" onChange={handleSearch} />
            </Form.Group>
            <Form.Group>
              <Form.Check
                inline
                type="radio"
                label="Search by Name"
                name="filterBy"
                value="name"
                checked={filterBy === 'name'}
                onChange={handleFilter}
              />
              <Form.Check
                inline
                type="radio"
                label="Search by Category"
                name="filterBy"
                value="category"
                checked={filterBy === 'category'}
                onChange={handleFilter}
              />
            </Form.Group>
          </Form>
          <br/>
          <Button variant="primary" onClick={()=>{
            setShowModal(true);
            
          }}>
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Add Item
          </Button>
          <span> </span>
          <Button variant="primary">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Add Category
          </Button>
          <span> </span>
          <Button variant="primary" onClick={()=>{
            handleFetchOrders();
            setOrderModal(true);
            
          }}>
                <FontAwesomeIcon icon={faEye} className="me-2" />
                    View Orders
          </Button>

        </Col>
      </Row>

      {showModal && 
            <AddItemToInventoryModal
            categories={categories}
            show={showModal}
            onClose={() => setShowModal(false)}
            onAddItem={handleAddItem}
          />
      }

    {orderModal && 
            <DisplayOrdersModal
            
            show={showModal}
            onHide={() => setOrderModal(false)}
            orders={orders}
          />
      }

      <br/> <br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
           <tr key={item.id} style={item.quantity === 0 ? { backgroundColor: 'red' } : {}}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>
            <FontAwesomeIcon
              icon={faEdit}
              className="cursor-pointer"
               onClick={() => handleEditItem(item._id)}
            />
          </td>
            <td>
            <FontAwesomeIcon
              icon={faTrash}
              className="cursor-pointer"
              onClick={() => handleDeleteItem(item._id)}
            />
          </td>
          <td>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="cursor-pointer"
              onClick={() => handleOrderItem(item._id)}
            />
          </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default InventoryDashboard;
