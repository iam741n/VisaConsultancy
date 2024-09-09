import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Nav, NavDropdown, Navbar, Form, Alert } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import Footer from './Footer';

const UpdatePasswordAdmin = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [email, setEmail] = useState(userData?.Email || ''); // Initialize with passed email
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState(''); // State to control alert variant
  const [showOldPassword, setShowOldPassword] = useState(false); // State for toggling old password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State for toggling new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setAlertVariant('warning');
      return;
    }

    try {
      const response = await axios.post('https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/User/UpdatePassword', {
        Email: email,
        OldPassword: oldPassword,
        NewPassword: newPassword,
        ConfirmPassword: confirmPassword
      });

      console.log(response.data); // Log the response from the server
      // Show alert if password is changed successfully
      setMessage('Password updated successfully.');
      setAlertVariant('success');
      // Clear form fields
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error.response.data); // Log any errors
      const errorMessage = error.response.data.Message;

      if (errorMessage === "Old password is incorrect.") {
        setAlertVariant('danger');
      } else if (errorMessage === "New password and confirm password do not match.") {
        setAlertVariant('warning');
      } else {
        setAlertVariant('danger');
      }

      setMessage(errorMessage);
    }
  };

  return (
    <>
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
            <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Update Password</h1>
            {message && <Alert variant={alertVariant}>{message}</Alert>}
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label style={{ color: 'white' }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formOldPassword">
                <Form.Label style={{ color: 'white' }}>Old Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowOldPassword(!showOldPassword)}>
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Form.Group controlId="formNewPassword">
                <Form.Label style={{ color: 'white' }}>New Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label style={{ color: 'white' }}>Confirm Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Button variant="primary" onClick={handleUpdatePassword}>
                Update Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer/>
    </>
  );
};

export default UpdatePasswordAdmin;
