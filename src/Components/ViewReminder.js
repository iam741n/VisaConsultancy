import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const ViewReminder = () => {
  const [reminders, setReminders] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [ampm, setAmpm] = useState('AM');
  const [time, setTime] = useState('');
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await axios.get('http://localhost/Visa/api/Reminder/GetReminders');
      setReminders(response.data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      // Handle error scenario
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost/Visa/api/Reminder/PutReminder/${selectedReminder.Id}`, selectedReminder);
      fetchReminders(); // Refresh reminders after update
      setShowUpdateModal(false);
      setShowUpdateSuccess(true); // Show success alert
      setSelectedReminder(null); // Clear selected reminder after update
    } catch (error) {
      console.error('Error updating reminder:', error);
      // Handle error scenario
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
      // Handle error scenario
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

  return (
    <Container>
      <h1 className="text-center mt-4">Reminder Manager</h1>

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
    <Col key={reminder.id} md={4}>
      <Card style={{ marginBottom: '20px' }}>
        <Card.Body>
          <Card.Title>{reminder.Title}</Card.Title>
          <Card.Text>{reminder.Description}</Card.Text>
          <Card.Text>Date: {reminder.Date}</Card.Text>
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
  );
};

export default ViewReminder;