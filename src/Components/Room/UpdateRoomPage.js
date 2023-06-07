import React, { useState, useContext } from 'react';
import { Form, Button, Alert, Container, Col} from 'react-bootstrap';
import { HotelNRoomContext } from './HotelNRoomProvider';
import MessageModal from './MessageModel'

const UpdateRoomPage = () => {
  const { roomId } = useContext(HotelNRoomContext);
  const [type, setType] = useState('');
  const [availability, setAvailability] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [price, setPrice] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const [updatedRoom, setUpdatedRoom] = useState()
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  
  const handleUpdateType = async (e) => {
    e.preventDefault();
    if (!type) {
      setUpdateStatus('Please enter the room type.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/rooms/update-room-type`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({ type, roomId }),
      });
      if (response.ok) {
        setUpdatedRoom( await response.json()) ;
        setType(updatedRoom.type);
        setUpdateStatus('Room type updated successfully.');
      } else {
        // Handle error response
        setUpdateStatus('Error updating room type.');
      }
    } catch (error) {
      // Handle network error
      setUpdateStatus('Network error occurred.');
    }
  };

  const handleUpdateAvailability = async (e) => {
    e.preventDefault();
    if (!availability) {
      setUpdateStatus('Please select the room availability.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/rooms/update-room-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({ availability, roomId }),
      });
      if (response.ok) {
        setUpdatedRoom( await response.json()) ;
        setAvailability(updatedRoom.availability);
        setUpdateStatus('Room availability updated successfully.');
      } else {
        // Handle error response
        setUpdateStatus('Error updating room availability.');
      }
    } catch (error) {
      // Handle network error
      setUpdateStatus('Network error occurred.');
    }
  };

  const handleUpdateAmenities = async (e) => {
    e.preventDefault();
    if (amenities.length === 0) {
      setUpdateStatus('Please select at least one amenity.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/rooms/update-room-amenities`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({ amenities, roomId }),
      });
      if (response.ok) {
        setUpdatedRoom( await response.json()) ;
        setAmenities(updatedRoom.amenities);
        setUpdateStatus('Room amenities updated successfully.');
      } else {
        // Handle error response
        setUpdateStatus('Error updating room amenities.');
      }
    } catch (error) {
      // Handle network error
      setUpdateStatus('Network error occurred.');
    }
  };

  const handleUpdatePrice = async (e) => {
    e.preventDefault();
    if (!price) {
      setUpdateStatus('Please enter the room price.');
      return;
    }
    if (price < 20) {
      setUpdateStatus('Price cannot be less than 20$');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/rooms/update-room-price`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({ price: parseInt(price), roomId }), // Parse price as an integer
      });
      if (response.ok) {
        setUpdatedRoom( await response.json()) ;
        setPrice(updatedRoom.price);
        setUpdateStatus('Room price updated successfully.');
      } else {
        // Handle error response
        setUpdateStatus('Error updating room price.');
      }
    } catch (error) {
      // Handle network error
      setUpdateStatus('Network error occurred.');
    }
  };

  const handleAmenityChange = (amenity) => {
    if (amenities.includes(amenity)) {
      // Remove the amenity from the list if it's already selected
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      // Add the amenity to the list if it's not already selected
      setAmenities([...amenities, amenity]);
    }
  };

  return (
    <Container >
      <Col xs={12} md={6} lg={4} className="mx-auto">
    <div className="border p-3 my-3">
      <h2 className="text-center">Update Room</h2>

      {updateStatus && !updateStatus.includes('success') && <Alert variant={'danger'}>{updateStatus}</Alert>}
      {updateStatus && updateStatus.includes('success') && <MessageModal room={updatedRoom} message={updateStatus} setUpdateStatus={setUpdateStatus}/>}

      <Form className="mb-3" onSubmit={handleUpdateType}>
          <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="luxury">Luxury</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </Form.Control>
          </Form.Group>
        <div className="d-flex justify-content-center">
        <Button variant="primary" type="submit">
          Update Type
        </Button>
        </div>
      </Form>

      <Form className="mb-3" onSubmit={handleUpdateAvailability}>
        <Form.Group>
          <Form.Label>Availability:</Form.Label>
          <Form.Select value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="">Select Availability</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex justify-content-center">
        <Button variant="primary" type="submit">
          Update Availability
        </Button>
        </div>
      </Form>

      <Form className="mb-3" onSubmit={handleUpdateAmenities}>
        <Form.Group>
          <Form.Label>Amenities:</Form.Label>
          <div>
            <Form.Check
              type="checkbox"
              id="amenity-wifi"
              label="WiFi"
              value="WiFi"
              checked={amenities.includes("WiFi")}
              onChange={(e) => handleAmenityChange(e.target.value)}
            />
            <Form.Check
              type="checkbox"
              id="amenity-tv"
              label="TV"
              value="TV"
              checked={amenities.includes("TV")}
              onChange={(e) => handleAmenityChange(e.target.value)}
            />
            <Form.Check
              type="checkbox"
              id="amenity-ac"
              label="AC"
              value="AC"
              checked={amenities.includes("AC")}
              onChange={(e) => handleAmenityChange(e.target.value)}
            />
            {/* Add more checkboxes for additional amenities */}
          </div>
        </Form.Group>
        <div className="d-flex justify-content-center">
        <Button variant="primary" type="submit">
          Update Amenities
        </Button>
        </div>
      </Form>

      <Form className="mb-3" onSubmit={handleUpdatePrice}>
        <Form.Group>
          <Form.Label>Price (in $):</Form.Label>
          <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>
        <div className="d-flex justify-content-center">
        <Button variant="primary" type="submit">
          Update Price
        </Button>
        </div>
      </Form>
    </div>
    </Col>
    </Container>
  );
};

export default UpdateRoomPage;
