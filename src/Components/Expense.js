import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Expense = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook for navigation

    const handleAddExpense = async () => {
        try {
            const response = await axios.post('http://localhost/Visa/api/Expense/InsertExpense', {
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
