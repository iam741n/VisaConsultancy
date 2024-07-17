import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Signup = () => {
  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Phone_No: '',
    Email: '',
    Password: '',
    Gender: '',
    Role: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost/Visa/api/User/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setSuccessMessage('Account created successfully');
        setError('');
        // Optionally, clear the form fields after successful submission
        setFormData({
          First_Name: '',
          Last_Name: '',
          Phone_No: '',
          Email: '',
          Password: '',
          Gender: '',
          Role: ''
        });
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong');
      setSuccessMessage('');
    }
  };

  return (
    <div style={{ backgroundImage: `url(${require('../assets/login.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center mt-4" style={{ color: 'white', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Signup</h1>
            <Row className="justify-content-center mt-5">
              <Form onSubmit={handleSignup}>
                <Form.Group>
                  <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="First_Name"
                    value={formData.First_Name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="Last_Name"
                    value={formData.Last_Name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    name="Phone_No"
                    value={formData.Phone_No}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="Role"
                    value={formData.Role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="success" type="submit">
                  Sign Up
                </Button>
                {error && <Alert variant="danger">{error}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
