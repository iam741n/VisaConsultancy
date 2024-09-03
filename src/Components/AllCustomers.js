import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Button, Modal, Table, Form, Alert } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../SearchBar.css'; // Ensure this is the correct path

function AllCustomers() {
  const location = useLocation();
  const userData = location.state?.userData;
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/Customer/GetCustomersHighlighted') // Replace with your actual endpoint
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the customers!", error);
      });
  }, []);

  const handleShowDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => setShowDetailsModal(false);

  const handleShowDeleteModal = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (selectedCustomer) {
      axios.delete(`http://localhost/Visa/api/Customer/DeleteCustomer/${selectedCustomer.id}`)
        .then(response => {
          setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
          setSuccessMessage('Client is successfully deleted');
          setShowDeleteModal(false);
        })
        .catch(error => {
          console.error("There was an error deleting the client!", error);
        });
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="all-customers-container">
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
                <NavDropdown.Item as={Link} to='/ManageEmpolyees'>Manage Employees</NavDropdown.Item>
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
        

        <div className="box">
          <Form.Control
            type="text"
            className="input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Client Name"
          />
          <i className="fas fa-search"></i>
        </div>

        <h1 className="text-center mt-4 client-details-title">Client Details</h1>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Client Name</th>
              <th>Visa Type</th>
              <th>Due Date</th>
              <th>Expected Date</th>
              <th>Paid To</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
              <th>View Details</th>
              <th>Remove Client</th>
            </tr>
          </thead>
          <tbody>
          {filteredCustomers.map((customer, index) => (
              <tr key={customer.id} className={customer.Highlight ? 'highlighted-customer' : ''}>
                <td>{index + 1}</td>
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
                <td>
                  <Button variant="danger" onClick={() => {
                    setSelectedCustomer(customer);
                    setShowDeleteModal(true);
                  }}>
                    Delete client
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <>
              {selectedCustomer.Highlight && (
                <Alert variant="danger" className="text-center">
                  <strong>YOUR PASSPORT IS EXPIRING SOON</strong>
                </Alert>
              )}
              {/* <p><strong>Id:</strong> {selectedCustomer.id}</p> */}
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
              <p><strong>Passport No:</strong> {selectedCustomer.passport_no}</p>
              <p><strong>Passport Issue Date:</strong> {new Date(selectedCustomer.passport_issue_date).toLocaleDateString()}</p>
              <p><strong>Passport Expiry Date:</strong> {new Date(selectedCustomer.passport_expiry_date).toLocaleDateString()}</p>
              <p><strong>Months remaining:</strong> {selectedCustomer.months_remaining}</p>
              <p><strong>Created At:</strong> {new Date(selectedCustomer.created_at).toLocaleDateString()}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


       {/* Delete Confirmation Modal */}
       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this Client?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AllCustomers;
