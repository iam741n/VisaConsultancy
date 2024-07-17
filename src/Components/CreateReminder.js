import React, { useState } from 'react';
import { Form, Navbar, Nav, NavDropdown, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

const CreateReminder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const location = useLocation();
  const userData = location.state?.userData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const timeWithAmpm = `${time} ${ampm}`;
    const reminderData = {
      Title: title,
      Description: description,
      Date: date,
      Time: timeWithAmpm,
    };

    try {
      const response = await axios.post('http://localhost/Visa/api/Reminder/PostReminder', reminderData);
      console.log('Reminder created:', response.data);
      setShowSuccessAlert(true);
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error('Error creating reminder:', error);
      setShowErrorAlert(true);
      // Handle error scenarios here
    }
  };

  return (
    <div style={{ backgroundImage: `url(${require('../assets/dash.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Jay Visa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/Dashboard">Home</Nav.Link>
              <NavDropdown title="Client History" id="basic-nav-dropdown">
                <Link to='/AllCustomerByDate' className="dropdown-item">Client Record by Date</Link>
                <Link to='/AllCustomers' className="dropdown-item">All clients</Link>
              </NavDropdown>
              <Nav.Link href="/ViewReminder">View Reminders</Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <Link to='/UpdatePasswordEmpolyee' state={{ userData: userData }} className="dropdown-item">Change Credentials</Link>
                <Link to='/CreateReminder' state={{ userData: userData }} className="dropdown-item">Schedule Reminder</Link>
              </NavDropdown>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h1
          className="text-center mt-4"
          style={{
            color: 'White',
            fontFamily: 'Arial, sans-serif',
            fontSize: '2.5rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            fontWeight: 'bold'
          }}
        >
          Schedule Reminder
        </h1>
        <Row className="justify-content-md-center">
          <Col md="6">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter reminder title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter reminder description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDate">
                <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTime">
                <Form.Label style={{ color: 'white', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Time</Form.Label>
                <div style={{ display: 'flex' }}>
                  <Form.Control
                    type="time"
                    placeholder="Enter time in 12-hour format (HH:MM)"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    style={{ marginRight: '10px' }}
                  />
                </div>
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Schedule Reminder
              </Button>
            </Form>
          </Col>
        </Row>
        {showSuccessAlert && (
          <Alert variant="success" style={{ width: "42rem", marginTop: '20px' }}>
            <Alert.Heading>
              Reminder is Successfully Scheduled
            </Alert.Heading>
          </Alert>
        )}
        {showErrorAlert && (
          <Alert variant="danger" style={{ width: "42rem", marginTop: '20px' }}>
            <Alert.Heading>
              Something went Wrong
            </Alert.Heading>
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default CreateReminder;