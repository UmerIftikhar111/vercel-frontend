import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Col, Row } from 'react-bootstrap'; // Import Row and Col from react-bootstrap for responsiveness

const RoomCards = ({ rooms, updateRoomId }) => {
  const handleUpdateRoom = (id) => {
    updateRoomId(id);
  };

  return (
    <Row xs={1} sm={2} md={3}>
      {rooms.map((room) => (
        <Col key={room._id}>
          <Card>
            <Card.Body>
              <Card.Title>Room Number: {room.roomNumber}</Card.Title>
              <Card.Text>
                <p>Type: {room.type}</p>
                <p>Price: {room.price}</p>
                <p>Available: {room.availability}</p>
                <p>Capacity: {room.capacity}</p>
                <p>
                  Amenities:{' '}
                  {room.amenities.map((amenity) => (
                    <span key={amenity}>{` ${amenity}, `}</span>
                  ))}
                </p>
              </Card.Text>

              <Button onClick={() => handleUpdateRoom(room._id)}>
                <Link to="/room/update" style={{ color: 'white', textDecoration: 'none' }}>Update Room</Link>
              </Button>{' '}
              <Button onClick={() => handleUpdateRoom(room._id)}>
                <Link to="/room/bookings" style={{ color: 'white', textDecoration: 'none' }}>Bookings</Link>
              </Button>{' '}
              <Button onClick={() => handleUpdateRoom(room._id)}>
                <Link to="/room/reserve" style={{ color: 'white', textDecoration: 'none' }}>Reserve</Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export { RoomCards };
