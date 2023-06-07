// import React, { useEffect, useState, useContext } from 'react';
// import { HotelNRoomContext } from './HotelNRoomProvider';
// // import { Row, Col } from 'react-bootstrap'; // Import Row and Col from react-bootstrap
// import { RoomCards } from './RoomCards';
// import { Container } from 'react-bootstrap';

// const RoomList = () => {
//   const { updateRoomId } = useContext(HotelNRoomContext);
//   const { hotelId } = useContext(HotelNRoomContext);
//   const [rooms, setRooms] = useState([]);
//   const token = localStorage.getItem('token'); // Retrieve token from local storage

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await fetch(`https://vercel-backend-gilt.vercel.app/hotels/${hotelId}/rooms`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             token: token,
//           },
//         });
//         if (response.ok) {
//           const roomsData = await response.json();
//           setRooms(roomsData);
//         } else {
//           // Handle error response
//         }
//       } catch (error) {
//         // Handle network error
//       }
//     };

//     fetchRooms();
//   }, [hotelId, token]);

//   return (
//     <Container>
//       <h2 className="text-center">All Rooms</h2>
//       {/* <Row>
//         <Col> */}
//           {rooms.length > 0 ? (
//             <RoomCards rooms={rooms} updateRoomId={updateRoomId} />
//           ) : (
//             <p>No rooms available.</p>
//           )}
//         {/* </Col>
//       </Row> */}
//     </Container>
//   );
// };

// export default RoomList;



import React, { useEffect, useState, useContext } from 'react';
import { HotelNRoomContext } from './HotelNRoomProvider';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { RoomCards } from './RoomCards';

const RoomList = () => {
  const { updateRoomId } = useContext(HotelNRoomContext);
  const { hotelId } = useContext(HotelNRoomContext);
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [notAvailabilityChecked, setNotAvailabilityChecked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`https://vercel-backend-gilt.vercel.app/hotels/${hotelId}/rooms`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        });
        if (response.ok) {
          const roomsData = await response.json();
          setRooms(roomsData);
        } else {
          // Handle error response
        }
      } catch (error) {
        // Handle network error
      }
    };

    fetchRooms();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let searchResults = [...rooms];

    if (searchTerm !== '') {
      searchResults = searchResults.filter((room) =>
        room.roomNumber.includes(searchTerm)
      );
    }

    if (availabilityChecked) {
      searchResults = searchResults.filter((room) => room.availability);
    }

    if (notAvailabilityChecked) {
      searchResults = searchResults.filter((room) => !room.availability);
    }

    if (searchResults.length > 0) {
      setError(null);
      setSuccess('Search successful!');
    } else {
      setSuccess(null)
      setError('No rooms found.');
    }

    setSearchResults(searchResults);
  };

  return (
    <Container>
      <h2 className="text-center">All Rooms</h2>
      <div className="my-4">
        <Form onSubmit={handleSearch}>
          <Form.Group controlId="searchTerm">
            <Form.Control
              type="text"
              placeholder="Search by room number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="availabilityCheckbox">
            <Form.Check
              type="checkbox"
              label="In service"
              checked={availabilityChecked}
              onChange={(e) => setAvailabilityChecked(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="notAvailabilityCheckbox">
            <Form.Check
              type="checkbox"
              label="Out of Service"
              checked={notAvailabilityChecked}
              onChange={(e) => setNotAvailabilityChecked(e.target.checked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </div>
      <div className="my-4">
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
      {searchResults.length > 0 ? (
        <RoomCards rooms={searchResults} updateRoomId={updateRoomId} />
      ) : (
        rooms.length > 0 ? (
          <RoomCards rooms={rooms} updateRoomId={updateRoomId} />
        ) : (
          <p>No rooms available.</p>
        )
      )}

    </Container>
  );
};

export default RoomList;
