import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export const NavBar = (isValid) => {
    return (
        <Container>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to="/">My Hotel App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mr-auto">
                        {isValid && (
                            <>
                                <Nav.Link as={Link} to="/hotel/add">Add Hotel</Nav.Link>
                                <Nav.Link as={Link} to="/hotel/today-available-rooms">Today's Available Rooms</Nav.Link>
                                <Nav.Link as={Link} to="/hotel/rooms">Room List</Nav.Link>
                                <Nav.Link as={Link} to="/room/add">Add Room</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}