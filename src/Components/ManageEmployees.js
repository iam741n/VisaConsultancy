import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Nav, Modal,Card, NavDropdown, Navbar, Form, Alert } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../ManageEmpolyees.css'; // Corrected path to the CSS file
import maleImage from '../assets/male.png';
import femaleImage from '../assets/female.png';

const ManageEmployees = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/Visa/api/user/GetAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost/Visa/api/user/DeleteUser/${selectedUser.uid}`);
      fetchUsers(); // Refresh users after delete
      setShowDeleteModal(false);
      setShowDeleteSuccess(true); // Show success alert
      setSelectedUser(null); // Clear selected user after delete
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  return (
    <div>
    <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Jay Visa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/AdminDashboard">Home</Nav.Link>
          <NavDropdown title="Client History" id="basic-nav-dropdown">
          <Link to='/AllCustomerByDate' className="dropdown-item">Client Record by Date</Link>
            <Link to='/AllCustomers' className="dropdown-item">All clients</Link>
            </NavDropdown>
            <Nav.Link as={Link} to="/ViewReminder">View Reminders</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to='/UpdatePasswordAdmin' state={{ userData: userData }}>Change Credentials</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/CreateReminder'>Create Reminders</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/ManageEmpolyees'>Manage Empolyees</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Expense" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to='/Expense'>Add Expense</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/ViewExpense'>View Expense</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    <Container>
      <h1 className="text-center mt-4">Manage Employees</h1>

      {/* Success Alert for Delete */}
      {showDeleteSuccess && (
        <Alert variant="warning" style={{ width: '42rem', marginTop: '1rem' }} onClose={() => setShowDeleteSuccess(false)} dismissible>
          <Alert.Heading>Your user has been deleted</Alert.Heading>
        </Alert>
      )}

      <Row>
        {users.map((user) => (
          <Col key={user.uid} md={4}>
            <Card className="card-custom">
              <Card.Img variant="top" src={user.Gender === 'female' ? femaleImage : maleImage} />
              <Card.Body>
                <Card.Title>{user.First_Name} {user.Last_Name}</Card.Title>
                <Card.Text>{user.Role}</Card.Text>
                <Button variant="primary" onClick={() => openDetailsModal(user)}>
                  Details
                </Button>
                <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => openDeleteModal(user)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Details Modal */}
      {selectedUser && (
        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>First Name:</strong> {selectedUser.First_Name}</p>
            <p><strong>Last Name:</strong> {selectedUser.Last_Name}</p>
            <p><strong>Phone No:</strong> {selectedUser.Phone_No}</p>
            <p><strong>Email:</strong> {selectedUser.Email}</p>
            <p><strong>Password:</strong> {selectedUser.Password}</p>
            <p><strong>Gender:</strong> {selectedUser.Gender}</p>
            <p><strong>Role:</strong> {selectedUser.Role}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default ManageEmployees;
