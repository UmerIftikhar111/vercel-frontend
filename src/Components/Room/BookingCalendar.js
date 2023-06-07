import React, { useEffect, useState, useContext } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { HotelNRoomContext } from './HotelNRoomProvider';

const BookingCalendar = () => {
  const [bookingCalendar, setBookingCalendar] = useState([]);
  const [error, setError] = useState(null);
  const { roomId } = useContext(HotelNRoomContext);
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  const [roomNumber, setRoomNumber] = useState();

  useEffect(() => {
    const fetchBookingCalendar = async () => {
      try {
        const response = await fetch(`https://vercel-backend-gilt.vercel.app/rooms/${roomId}/getBookingCalendar`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBookingCalendar(data.bookingCalendar);
          setRoomNumber(data.roomNumber);
        } else {
          const errorData = await response.json();
          setError(errorData.error);
        }
      } catch (error) {
        setError('Failed to retrieve booking calendar');
      }
    };

    fetchBookingCalendar();
  }, [roomId, token]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <h2 className="text-center mb-4">Booking Calendar for Room {roomNumber}</h2>
      <ListGroup>
        {bookingCalendar.map((booking) => (
          <ListGroup.Item key={`${booking.checkInDate}-${booking.checkOutDate}`} className="d-flex justify-content-between">
            <div>
              <strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleString()}
            </div>
            <div>
              <strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleString()}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export { BookingCalendar};
