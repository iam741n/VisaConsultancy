import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Button, Modal, Table, Form } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../SearchBar.css';  // Make sure to create and link the CSS file

function AllCustomers() {
  const location = useLocation();
  const userData = location.state?.userData;
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost/Visa/api/Customer/GetAllCustomers')
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

  const handleShowUpdate = (customer) => {
    setSelectedCustomer(customer);
    setShowUpdateModal(true);
  };

  const handleCloseUpdate = () => setShowUpdateModal(false);

  const filteredCustomers = customers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    if (!selectedCustomer) return;

    axios.put(`http://localhost/Visa/api/customer/UpdateCustomer/${selectedCustomer.id}`, selectedCustomer)
      .then(response => {
        // Update customer in the state
        setCustomers(customers.map(c => (c.id === selectedCustomer.id ? response.data : c)));
        setShowUpdateModal(false);
        setErrorMessage('');
      })
      .catch(error => {
        console.error("There was an error updating the customer!", error.response ? error.response.data : error.message);
        setErrorMessage('There was an error updating the customer. Please check the console for more details.');
      });
  };

  return (
    <div className="all-customers-container">
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
                <NavDropdown.Item as={Link} to='/ManageEmpolyees'>Manage Employees</NavDropdown.Item>
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
        <Table striped bordered hover variant="light" responsive>
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
              <th>Modify Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
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
                <td>
                  <Button variant="success" onClick={() => handleShowUpdate(customer)}>Modify</Button>
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
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <Form>
              <Form.Group controlId="formClientName">
                <Form.Label>Client Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customer_name"
                  value={selectedCustomer.customer_name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formVisaType">
                <Form.Label>Visa Type</Form.Label>
                <Form.Control
                  type="text"
                  name="visa_type"
                  value={selectedCustomer.visa_type}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="due_date"
                  value={new Date(selectedCustomer.due_date).toISOString().substr(0, 10)}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formExpectedDate">
                <Form.Label>Expected Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expected_date"
                  value={new Date(selectedCustomer.expected_date).toISOString().substr(0, 10)}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTermDays">
                <Form.Label>Term Days</Form.Label>
                <Form.Control
                  type="number"
                  name="term_days"
                  value={selectedCustomer.term_days}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDocuments">
                <Form.Label>Documents</Form.Label>
                <Form.Control
                  type="text"
                  name="documents"
                  value={selectedCustomer.documents}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNotes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  type="text"
                  name="notes"
                  value={selectedCustomer.notes}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formConsultancyFee">
                <Form.Label>Consultancy Fee</Form.Label>
                <Form.Control
                  type="number"
                  name="consultancy_fee"
                  value={selectedCustomer.consultancy_fee}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formRegistrationFee">
                <Form.Label>Registration Fee</Form.Label>
                <Form.Control
                  type="number"
                  name="registration_fee"
                  value={selectedCustomer.registration_fee}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formApplicationForm">
                <Form.Label>Application Form</Form.Label>
                <Form.Control
                  type="text"
                  name="application_form"
                  value={selectedCustomer.application_form}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formHotelBooking">
                <Form.Label>Hotel Booking</Form.Label>
                <Form.Control
                  type="text"
                  name="hotel_booking"
                  value={selectedCustomer.hotel_booking}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTravelInsurance">
                <Form.Label>Travel Insurance</Form.Label>
                <Form.Control
                  type="text"
                  name="travel_insurance"
                  value={selectedCustomer.travel_insurance}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAppointment">
                <Form.Label>Appointment</Form.Label>
                <Form.Control
                  type="text"
                  name="appointment"
                  value={selectedCustomer.appointment}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTickets">
                <Form.Label>Tickets</Form.Label>
                <Form.Control
                  type="text"
                  name="tickets"
                  value={selectedCustomer.tickets}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPaidBy">
                <Form.Label>Paid By</Form.Label>
                <Form.Control
                  type="text"
                  name="paid_by"
                  value={selectedCustomer.paid_by}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPaidTo">
                <Form.Label>Paid To</Form.Label>
                <Form.Control
                  type="text"
                  name="paid_to"
                  value={selectedCustomer.paid_to}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBalance">
                <Form.Label>Balance</Form.Label>
                <Form.Control
                  type="number"
                  name="balance"
                  value={selectedCustomer.balance}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  name="discount"
                  value={selectedCustomer.discount}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPaidAmount">
                <Form.Label>Paid Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="paid_amount"
                  value={selectedCustomer.paid_amount}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formRemainingAmount">
                <Form.Label>Remaining Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="remaining_amount"
                  value={selectedCustomer.remaining_amount}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTotal">
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type="number"
                  name="total"
                  value={selectedCustomer.total}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AllCustomers;
