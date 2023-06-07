
import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Alert, Container, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HotelNRoomContext } from './HotelNRoomProvider';


const ReservationForm = () => {
    const [userId, setUserId] = useState('');
    const { roomId } = useContext(HotelNRoomContext);
    const [roomNum, setRoomNum] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
    });
    const [reservationId, setReservationId] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const [bookingCalendar, setBookingCalendar] = useState([]);

    useEffect(() => {
        const tokn = localStorage.getItem('token');
        // const userid = localStorage.getItem('userId');
        setToken(tokn);
        // setUserId(userid);
        setUserId('647ef636c30660b7844965a3');
        fetchBookingCalendar();
    }, [token]);

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
                setRoomNum(data.roomNumber)
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch (error) {
            setError('Failed to retrieve booking calendar');
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://vercel-backend-gilt.vercel.app/rooms/reserve-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
                body: JSON.stringify({
                    userId,
                    roomId,
                    checkInDate,
                    checkOutDate,
                    paymentMethod,
                    cardDetails,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setReservationId(data._id);
                setError('');
            } else {
                const errorData = await response.json();
                // setError(errorData.error);
                setError('Failed to make a reservation');
            }
        } catch (error) {
            setError('Failed to make a reservation');
        }
    };

    const handlePaymentMethodChange = (e) => {
        const selectedPaymentMethod = e.target.value;
        setPaymentMethod(selectedPaymentMethod);
        if (selectedPaymentMethod === 'card') {
            setCardDetails({
                number: '',
                exp_month: '',
                exp_year: '',
                cvc: '',
            });
        } else {
            setCardDetails(null);
        }
    };

    const isDateBooked = (date) => {
        const checkIn = new Date(date);
        const checkOut = new Date(date);
        checkOut.setDate(checkOut.getDate() );
        for (const booking of bookingCalendar) {
            const bookingStart = new Date(booking.checkInDate);
            const bookingEnd = new Date(booking.checkOutDate);
            if (checkIn >= bookingStart && checkIn < bookingEnd) {
                return true;
            }
            if (checkOut > bookingStart && checkOut <= bookingEnd) {
                return true;
            }
        }
        return false;
    };

    return (
        <>
        <div className="my-4"></div>
        <Container>
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <div className="border p-4">
              <h2 className="text-center">Make a Reservation for Room {roomNum}</h2>
    
              {error && <Alert variant="danger">{error}</Alert>}
    
              {reservationId ? (
                <Alert variant="success">Status: Reservation Successful</Alert>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Check-in Date:</Form.Label>
                    <br />
                    <DatePicker
                      selected={checkInDate}
                      onChange={(date) => setCheckInDate(date)}
                      minDate={new Date()}
                      maxDate={new Date().setDate(new Date().getDate() + 30)}
                      filterDate={(date) => !isDateBooked(date)}
                      disabledKeyboardNavigation
                      dateFormat="dd/MM/yyyy"
                      utcOffset={0}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Check-out Date:</Form.Label>
                    <br />
                    <DatePicker
                      selected={checkOutDate}
                      onChange={(date) => setCheckOutDate(date)}
                      minDate={checkInDate ? new Date(checkInDate) : new Date()}
                      maxDate={new Date().setDate(new Date().getDate() + 30)}
                      filterDate={(date) => !isDateBooked(date)}
                      disabledKeyboardNavigation
                      dateFormat="dd/MM/yyyy"
                      utcOffset={0}
                    />
                  </Form.Group>
    
                  <Form.Group className="mb-3">
                    <Form.Label>Payment Method:</Form.Label>
                    <Form.Select value={paymentMethod} onChange={handlePaymentMethodChange}>
                      <option value="">Select Payment Method</option>
                      <option value="card">Card</option>
                      {/* Add more payment methods as needed */}
                    </Form.Select>
                  </Form.Group>
    
                  {paymentMethod === 'card' && (
                    <div>
                      <Form.Group className="mb-3">
                        <Form.Label>Card Number:</Form.Label>
                        <Form.Control
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Expiration Month:</Form.Label>
                        <Form.Control
                          type="number"
                          value={cardDetails.exp_month}
                          onChange={(e) => setCardDetails({ ...cardDetails, exp_month: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Expiration Year:</Form.Label>
                        <Form.Control
                          type="number"
                          value={cardDetails.exp_year}
                          onChange={(e) => setCardDetails({ ...cardDetails, exp_year: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>CVC:</Form.Label>
                        <Form.Control
                          type="number"
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                        />
                      </Form.Group>
                    </div>
                  )}
                  <div className="d-flex justify-content-center">
                  <Button variant="primary" type="submit">
                    Reserve Room
                  </Button>
                  </div>
                </Form>
              )}
            </div>
          </Col>
        </Container>
        </>
      );
};

export { ReservationForm };
