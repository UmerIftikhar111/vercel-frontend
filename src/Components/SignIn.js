import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { HotelNRoomContext } from './Room/HotelNRoomProvider';


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hotelEmail, setHotelEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { setHotelId } = useContext(HotelNRoomContext);
  let navigate= useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validations
    if (!email || !password || !hotelEmail) {
      setError('Please fill in all the required fields');
      setSuccess('');
      return;
    }

    // Make the API request
    try {
      const response = await fetch('https://vercel-backend-gilt.vercel.app/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, hotelmail: hotelEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        const { user, token, hotelId } = data;

        setHotelId(hotelId)
        
        // Save token and user ID in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user._id);

        setSuccess('User logged in successfully');
        setError('');
        // Perform any additional actions upon successful login

        navigate('/hotel/rooms')

      } else {
        setError(data.Message);
        setSuccess('');
      }
    } catch (error) {
      setError('Failed to login');
      setSuccess('');
    }
  };

  return (
    <Container>
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="hotelEmail">
          <Form.Label>Restaurant Email:</Form.Label>
          <Form.Control
            type="email"
            value={hotelEmail}
            onChange={(e) => setHotelEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
    </Container>
  );
};

export default Signin;
