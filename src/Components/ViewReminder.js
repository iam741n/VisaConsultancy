import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Nav, Modal,Card, NavDropdown, Navbar, Form, Alert } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const ViewReminder = () => {
    const location = useLocation();
    const { userData } = location.state || {};
  const [reminders, setReminders] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await axios.get('https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/Reminder/GetReminders');
      setReminders(response.data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/Reminder/PutReminder/${selectedReminder.Id}`, selectedReminder);
      fetchReminders(); // Refresh reminders after update
      setShowUpdateModal(false);
      setShowUpdateSuccess(true); // Show success alert
      setSelectedReminder(null); // Clear selected reminder after update
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost/Visa/api/Reminder/DeleteReminder/${selectedReminder.Id}`);
      fetchReminders(); // Refresh reminders after delete
      setShowDeleteModal(false);
      setShowDeleteSuccess(true); // Show success alert
      setSelectedReminder(null); // Clear selected reminder after delete
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const openUpdateModal = (reminder) => {
    setSelectedReminder(reminder);
    setShowUpdateModal(true);
  };

  const openDeleteModal = (reminder) => {
    setSelectedReminder(reminder);
    setShowDeleteModal(true);
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? 'Invalid date' : parsedDate.toLocaleDateString();
  };

  return (
    <div style={{ backgroundImage: `url(${require('../assets/dash.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

    <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
    <Navbar.Brand as={Link} to="/AdminDashboard">Jay Visa</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/AdminDashboard">Home</Nav.Link>
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
    <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Reminder Manager</h1>

      {/* Success Alert for Update */}
      {showUpdateSuccess && (
        <Alert variant="success" style={{ width: "42rem", marginTop: "1rem" }} onClose={() => setShowUpdateSuccess(false)} dismissible>
          <Alert.Heading>Your reminder is successfully updated</Alert.Heading>
        </Alert>
      )}

      {/* Success Alert for Delete */}
      {showDeleteSuccess && (
        <Alert variant="warning" style={{ width: "42rem", marginTop: "1rem" }} onClose={() => setShowDeleteSuccess(false)} dismissible>
          <Alert.Heading>Your reminder has been deleted</Alert.Heading>
        </Alert>
      )}

      <Row>
        {reminders.map((reminder) => (
          <Col key={reminder.Id} md={4}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>{reminder.Title}</Card.Title>
                <Card.Text>{reminder.Description}</Card.Text>
                <Card.Text>Date: {formatDate(reminder.Date)}</Card.Text>
                <Card.Text>Time: {reminder.Time}</Card.Text>
                <Button variant="primary" onClick={() => openUpdateModal(reminder)}>
                  Update
                </Button>
                <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => openDeleteModal(reminder)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Update Reminder Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reminder title"
                value={selectedReminder?.Title || ''}
                onChange={(e) => setSelectedReminder({ ...selectedReminder, Title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter reminder description"
                value={selectedReminder?.Description || ''}
                onChange={(e) => setSelectedReminder({ ...selectedReminder, Description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedReminder?.Date || ''}
                onChange={(e) => setSelectedReminder({ ...selectedReminder, Date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={selectedReminder?.Time || ''}
                onChange={(e) => {
                  const timeValue = e.target.value;
                  setSelectedReminder({
                    ...selectedReminder,
                    Time: timeValue, // HH:mm format from input type="time"
                    TimeFormatted: timeValue + ' ' + (parseInt(timeValue.split(':')[0]) >= 12 ? 'PM' : 'AM') // Example logic for AM/PM
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this reminder?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default ViewReminder;
