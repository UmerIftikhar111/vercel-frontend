import React, { useState,useContext } from 'react';
import { Button, Alert, Container } from 'react-bootstrap';
import { HotelNRoomContext } from '../Room/HotelNRoomProvider';
import { RoomCards } from '../Room/RoomCards';


const AvailableRooms = () => {
  const [error, setError] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([]);
  const token = localStorage.getItem('token');
  const { hotelId } = useContext(HotelNRoomContext);
  const { updateRoomId } = useContext(HotelNRoomContext);

  const handleGetAvailableRooms = async () => {
    try {
      const response = await fetch(`https://vercel-backend-gilt.vercel.app/hotels/${hotelId}/available-rooms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableRooms(data);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setAvailableRooms([]);
      }
    } catch (error) {
      setError('Failed to retrieve available rooms');
      setAvailableRooms([]);
    }
  };

  return (
    <Container>
      <h2 className="text-center">Get Available Rooms</h2>
      <div className="my-4">
      {error && <Alert variant="danger">{error}</Alert>}
      </div>
      <div className="my-4">
      {availableRooms.length > 0 && <RoomCards rooms={availableRooms} updateRoomId={updateRoomId}/> }
      </div>
      <div className="d-flex justify-content-center">
      <Button variant="primary" onClick={handleGetAvailableRooms}>
        Get Available Rooms
      </Button>
      </div>
    </Container>
  );
};

export { AvailableRooms };
