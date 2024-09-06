import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Nav, Modal,Card, NavDropdown, Navbar, Form, Alert } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Expense = () => {
  const location = useLocation();
  const { userData } = location.state || {};
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook for navigation

    const handleAddExpense = async () => {
        try {
            const response = await axios.post('https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/Expense/InsertExpense', {
                Title: title,
                Amount: amount
            });

            console.log(response.data); // Log the response from the server
            setSuccessMessage('Expense added successfully');
            setErrorMessage('');
            setTitle('');
            setAmount('');
        } catch (error) {
            console.error(error.response.data); // Log any errors
            setSuccessMessage('');
            setErrorMessage(error.response.data.Message);
        }
    };

    return (
        <div style={{ backgroundImage: `url(${require('../assets/dash.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand as={Link} to="/AdminDashboard">Jay Visa</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/AdminHome">Home</Nav.Link>
                            <NavDropdown title="Client History" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to='/AllCustomerByDate'>Client Record by Date</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/AllCustomers'>All clients</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/ViewReminder">View Reminders</Nav.Link>
                            <Nav.Link as={Link} to="/UpdateCustomerForm">Update Customer Form</Nav.Link>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to='/UpdatePasswordAdmin' state={{ userData: userData }}>Change Credentials</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/CreateReminder'>Create Reminders</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/ManageEmpolyees'>Manage Empolyees</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Expense" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to='/Expense'>Add Expense</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/ViewExpense'>View Expense</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Progress" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to='/DailyProgressChart'>Today Progress</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/ProfitLossChart">Multiple days Progress</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <Button variant="secondary" onClick={() => navigate('/AdminDashboard')} className="mb-3">Back</Button>
                        <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Add Expense</h1>
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Expense Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter expense name"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formAmount">
                                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary" onClick={handleAddExpense}>
                                Add Expense
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Expense;
