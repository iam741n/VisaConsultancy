import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const AlarmModal = ({ show, onClose, onSnooze, reminder }) => {
  if (!reminder) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title><FontAwesomeIcon icon={faBell} /> Reminder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <strong><p>{reminder.Title}</p></strong> 
        <p>{reminder.Description}</p>
        <p>Date: {new Date(reminder.Date).toLocaleDateString()}</p>
        <p>Time: {new Date(`1970-01-01T${reminder.Time}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onSnooze}>Snooze</Button>
        <Button variant="primary" onClick={onClose}>Stop</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlarmModal;
