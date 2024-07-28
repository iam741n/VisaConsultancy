import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Button, Modal, Table, Form } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function AllCustomerByDate() {
  const location = useLocation();
  const userData = location.state?.userData;
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');

  const fetchCustomers = (selectedDate) => {
    axios.get(`http://localhost/Visa/api/Customer/GetCustomersByDate?date=${selectedDate}`)
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the customers!", error);
      });
  };

  useEffect(() => {
    if (date) {
      fetchCustomers(date);
    }
  }, [date]);

  const handleShowDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

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
      <Container className="mt-4">
        <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Client Details</h1>
        
        <Form.Group controlId="datePicker">
          <Form.Label style={{ color: 'white' }}>Select Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Client Name</th>
              <th>Visa Type</th>
              <th>Due Date</th>
              <th>Expected Date</th>
              <th>Paid To</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.customer_name}</td>
                <td>{customer.visa_type}</td>
                <td>{new Date(customer.due_date).toLocaleDateString()}</td>
                <td>{new Date(customer.expected_date).toLocaleDateString()}</td>
                <td>{customer.paid_to}</td>
                <td>{customer.total}</td>
                <td>{customer.paid_amount}</td>
                <td>
                  <Button variant="info" onClick={() => handleShowDetails(customer)}>Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <>
              <p><strong>Id:</strong> {selectedCustomer.id}</p>
              <p><strong>Client Name:</strong> {selectedCustomer.customer_name}</p>
              <p><strong>Visa Type:</strong> {selectedCustomer.visa_type}</p>
              <p><strong>Due Date:</strong> {new Date(selectedCustomer.due_date).toLocaleDateString()}</p>
              <p><strong>Expected Date:</strong> {new Date(selectedCustomer.expected_date).toLocaleDateString()}</p>
              <p><strong>Term Days:</strong> {selectedCustomer.term_days}</p>
              <p><strong>Documents:</strong> {selectedCustomer.documents}</p>
              <p><strong>Notes:</strong> {selectedCustomer.notes}</p>
              <p><strong>Consultancy Fee:</strong> {selectedCustomer.consultancy_fee}</p>
              <p><strong>Registration Fee:</strong> {selectedCustomer.registration_fee}</p>
              <p><strong>Application Form:</strong> {selectedCustomer.application_form}</p>
              <p><strong>Hotel Booking:</strong> {selectedCustomer.hotel_booking}</p>
              <p><strong>Travel Insurance:</strong> {selectedCustomer.travel_insurance}</p>
              <p><strong>Appointment:</strong> {selectedCustomer.appointment}</p>
              <p><strong>Tickets:</strong> {selectedCustomer.tickets}</p>
              <p><strong>Paid By:</strong> {selectedCustomer.paid_by}</p>
              <p><strong>Paid To:</strong> {selectedCustomer.paid_to}</p>
              <p><strong>Balance:</strong> {selectedCustomer.balance}</p>
              <p><strong>Discount:</strong> {selectedCustomer.discount}</p>
              <p><strong>Paid Amount:</strong> {selectedCustomer.paid_amount}</p>
              <p><strong>Remaining Amount:</strong> {selectedCustomer.remaining_amount}</p>
              <p><strong>Total:</strong> {selectedCustomer.total}</p>
              <p><strong>Created At:</strong> {new Date(selectedCustomer.created_at).toLocaleDateString()}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AllCustomerByDate;
